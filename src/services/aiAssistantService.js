/**
 * AI Resume Assistant & ATS Scanner Service
 * Supports both direct Gemini API calls (if API key provided)
 * and a robust built-in NLP resume heuristic engine that works 100% offline out-of-the-box.
 */

// Strong action verb dictionary grouped by category
const ACTION_VERBS = {
  leadership: ['Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Mobilized', 'Governed', 'Steered'],
  engineering: ['Architected', 'Engineered', 'Productionized', 'Refactored', 'Optimized', 'Automated', 'Scaled'],
  growth: ['Accelerated', 'Boosted', 'Elevated', 'Maximized', 'Catalyzed', 'Surpassed', 'Multiplied'],
  efficiency: ['Streamlined', 'Consolidated', 'Standardized', 'Revamped', 'Expedited', 'Modernized', 'Eliminated'],
};

const WEAK_PHRASES = [
  { pattern: /\b(was responsible for|responsible for)\b/gi, replacement: 'Spearheaded' },
  { pattern: /\b(worked on|helped with|helped out with)\b/gi, replacement: 'Engineered and delivered' },
  { pattern: /\b(assisted in|assisted with)\b/gi, replacement: 'Collaborated on the execution of' },
  { pattern: /\b(managed to|tried to)\b/gi, replacement: 'Successfully delivered' },
  { pattern: /\b(did tasks related to|did various tasks)\b/gi, replacement: 'Orchestrated workflows for' },
  { pattern: /\b(made sure that|ensured that)\b/gi, replacement: 'Maintained strict standards for' },
  { pattern: /\b(learned and used)\b/gi, replacement: 'Leveraged' },
  { pattern: /\b(good at|skilled in)\b/gi, replacement: 'Proficient in deploying' },
];

/**
 * Local NLP Polish Generator (fallback & offline instant generator)
 */
function localPolish(text, type = 'experience') {
  if (!text || text.trim().length === 0) {
    return {
      impact: 'Spearheaded end-to-end deliverables, accelerating delivery timeline by 25% and elevating stakeholder satisfaction.',
      executive: 'Directed cross-functional execution and strategic alignment, driving consistent 99.8% operational efficiency.',
      concise: 'Delivered core initiatives ahead of schedule with zero defect regressions.',
    };
  }

  let polished = text.trim();

  // Replace weak passive phrases
  WEAK_PHRASES.forEach(({ pattern, replacement }) => {
    polished = polished.replace(pattern, replacement);
  });

  // Ensure first word is capitalized
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);

  // If text does not contain any numbers, suggest metric enhancements
  const hasNumbers = /\d+%?|\$\d+/.test(polished);

  const impactVersion = hasNumbers
    ? polished
    : `${polished}, increasing throughput and reducing turnaround time by 30%.`;

  const executiveVersion = `Orchestrated strategic execution: ${polished.replace(/^[A-Z][a-z]+ed\s+/i, '')}`;

  const conciseVersion = polished
    .replace(/\b(in order to|as a way to)\b/gi, 'to')
    .replace(/\b(a large number of|a lot of)\b/gi, 'multiple')
    .replace(/\b(on a daily basis)\b/gi, 'daily');

  return {
    impact: impactVersion,
    executive: executiveVersion,
    concise: conciseVersion,
  };
}

/**
 * Improve text using Gemini API (if key available) or local heuristic engine
 */
export async function improveTextWithAI(text, type = 'experience', roleContext = '') {
  const apiKey =
    localStorage.getItem('gemini_api_key') ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
    '';

  // If an API key is available, attempt Gemini call
  if (apiKey && apiKey.trim().length > 10) {
    try {
      // Secure prompt against injection by enforcing length limits, stripping newlines, and strictly wrapping in JSON
      const safeText = String(text).replace(/[\r\n]+/g, ' ').substring(0, 3000);
      const prompt = `You are a world-class ATS resume optimization specialist.
Improve the following ${type} text${roleContext ? ` for a ${roleContext}` : ''}.
Return a strictly valid JSON object with three keys:
- "impact": A metric-driven, results-oriented version with action verbs and quantifiable results.
- "executive": A high-level leadership and strategic wording.
- "concise": A tight, punchy ATS-friendly version without fluff.

Original text:
${JSON.stringify(safeText)}

Respond ONLY with valid JSON, nothing else.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey.trim()
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const parsed = JSON.parse(candidateText);
          if (parsed.impact && parsed.executive && parsed.concise) {
            return { success: true, source: 'gemini', variants: parsed };
          }
        }
      }
    } catch (_e) {
      // Graceful fallback to heuristic engine
    }
  }

  // Graceful local heuristic fallback
  return {
    success: true,
    source: 'local',
    variants: localPolish(text, type),
  };
}

/**
 * Generate role-tailored bullet points
 */
export const ROLE_BULLETS_LIBRARY = {
  'Software Engineer': [
    'Architected high-throughput REST and GraphQL APIs using Node.js and TypeScript, serving 5M+ daily requests with 99.98% reliability.',
    'Engineered cloud infrastructure deployments on AWS using Terraform and Docker, reducing deployment cycle times by 45%.',
    'Spearheaded automated testing strategies with Jest and Playwright, elevating code coverage from 62% to 91%.',
    'Optimized database queries and Redis caching layer, decreasing p95 latency from 320ms to 45ms across high-traffic endpoints.',
  ],
  'Product Designer': [
    'Spearheaded end-to-end user experience redesign for core SaaS application, accelerating user activation by 38%.',
    'Established multi-brand tokenized Figma design system adopted across 6 cross-functional engineering squads.',
    'Conducted 80+ generative user interviews and usability tests, translating qualitative findings into high-conversion user flows.',
    'Partnered closely with product management and frontend engineering to ensure pixel-perfect accessibility compliance (WCAG 2.1 AA).',
  ],
  'Data Scientist': [
    'Engineered predictive machine learning pipelines using Python, PyTorch, and Scikit-Learn, boosting model accuracy by 22% over baseline.',
    'Constructed automated ETL workflows using Apache Airflow and BigQuery processing 10TB+ of streaming telemetry daily.',
    'Implemented retrieval-augmented generation (RAG) agent reducing document search retrieval latency by 65%.',
    'Communicated complex statistical findings and predictive risk scores to C-level executives through interactive Tableau dashboards.',
  ],
  'Product Manager': [
    'Defined product strategy, roadmap, and OKRs for flagship mobile application, driving 42% YoY ARR growth.',
    'Led agile sprint planning and backlog grooming across 3 distributed engineering and design teams.',
    'Conducted extensive competitive landscape analysis and user cohort discovery to launch 3 successful zero-to-one features.',
    'Decreased customer churn by 18% through customer journey mapping and targeted onboarding interventions.',
  ],
  'Marketing Specialist': [
    'Managed multi-channel paid acquisition budget of $450K/quarter across Google Ads and LinkedIn, delivering 3.4x ROAS.',
    'Spearheaded technical SEO overhaul and content marketing engine, increasing organic search visits by 115% in 6 months.',
    'Designed automated lifecycle email nurturing sequences with HubSpot, lifting free-to-paid conversion rates by 24%.',
    'Produced detailed funnel attribution analytics in Google Analytics 4, identifying key drop-off stages in user checkout.',
  ],
};

/**
 * Real-time ATS Resume Scanner & Scorer
 */
export function calculateATSScore(resumeData) {
  const checks = [];
  let score = 0;

  const info = resumeData?.personalInfo || {};
  const experiences = Array.isArray(resumeData?.experience) ? resumeData.experience : [];
  const educations = Array.isArray(resumeData?.education) ? resumeData.education : [];
  const skills = Array.isArray(resumeData?.skills) ? resumeData.skills : [];
  const projects = Array.isArray(resumeData?.projects) ? resumeData.projects : [];

  // 1. Full Name (+10 pts)
  if (info.fullName && info.fullName.trim().length > 2) {
    score += 10;
    checks.push({ id: 'name', label: 'Candidate Full Name provided', status: 'pass', pts: 10 });
  } else {
    checks.push({ id: 'name', label: 'Candidate Full Name missing', status: 'fail', pts: 0, tip: 'Add your full legal name.' });
  }

  // 2. Email & Phone (+10 pts)
  const hasEmail = info.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(info.email).trim());
  const hasPhone = info.phone && String(info.phone).trim().length >= 7;
  if (hasEmail && hasPhone) {
    score += 10;
    checks.push({ id: 'contact', label: 'Valid Email & Phone Number detected', status: 'pass', pts: 10 });
  } else {
    checks.push({ id: 'contact', label: 'Contact details incomplete', status: 'warning', pts: hasEmail || hasPhone ? 5 : 0, tip: 'Ensure both an email address and telephone number are filled.' });
    if (hasEmail || hasPhone) score += 5;
  }

  // 3. Professional Summary (+15 pts)
  const summaryLength = info.summary ? info.summary.trim().length : 0;
  if (summaryLength >= 120) {
    score += 15;
    checks.push({ id: 'summary', label: 'Impactful Professional Summary (120+ chars)', status: 'pass', pts: 15 });
  } else if (summaryLength > 0) {
    score += 8;
    checks.push({ id: 'summary', label: 'Summary is too brief', status: 'warning', pts: 8, tip: 'Expand summary with your target role, years of experience, and primary achievements.' });
  } else {
    checks.push({ id: 'summary', label: 'Professional Summary missing', status: 'fail', pts: 0, tip: 'Add a 2-3 sentence executive summary.' });
  }

  // 4. Work Experience & Descriptions (+25 pts)
  if (experiences.length >= 2) {
    const hasDetailedDesc = experiences.some((exp) => exp.description && exp.description.trim().length >= 60);
    if (hasDetailedDesc) {
      score += 25;
      checks.push({ id: 'exp', label: 'Multiple detailed work experience entries', status: 'pass', pts: 25 });
    } else {
      score += 15;
      checks.push({ id: 'exp', label: 'Experience descriptions are brief', status: 'warning', pts: 15, tip: 'Add detail to your role descriptions explaining what you achieved.' });
    }
  } else if (experiences.length === 1) {
    score += 12;
    checks.push({ id: 'exp', label: 'Single work experience entry', status: 'warning', pts: 12, tip: 'Add at least 2 roles or internships to demonstrate track record.' });
  } else {
    checks.push({ id: 'exp', label: 'No work experience listed', status: 'fail', pts: 0, tip: 'Add relevant jobs, contract roles, or internships.' });
  }

  // 5. Action Verbs Usage (+15 pts)
  const allText = JSON.stringify(resumeData);
  const matchedVerbs = Object.values(ACTION_VERBS)
    .flat()
    .filter((verb) => new RegExp(`\\b${verb}\\b`, 'i').test(allText));

  if (matchedVerbs.length >= 4) {
    score += 15;
    checks.push({ id: 'verbs', label: `High-impact action verbs used (${matchedVerbs.length} detected)`, status: 'pass', pts: 15 });
  } else if (matchedVerbs.length > 0) {
    score += 8;
    checks.push({ id: 'verbs', label: `Few action verbs found (${matchedVerbs.length} detected)`, status: 'warning', pts: 8, tip: 'Use verbs like Spearheaded, Engineered, Accelerated, Streamlined.' });
  } else {
    checks.push({ id: 'verbs', label: 'No strong action verbs detected', status: 'fail', pts: 0, tip: 'Start bullet points with strong action verbs.' });
  }

  // 6. Measurable Metrics & Numbers (+15 pts)
  const metricsMatches = allText.match(/\b\d+([.,]\d+)?\s*(%|M|K|x|k|percent|million|users|clients|revenue)?\b/gi) || [];
  if (metricsMatches.length >= 4) {
    score += 15;
    checks.push({ id: 'metrics', label: `Quantifiable metrics present (${metricsMatches.length} metrics found)`, status: 'pass', pts: 15 });
  } else if (metricsMatches.length > 0) {
    score += 8;
    checks.push({ id: 'metrics', label: `Limited quantifiable metrics (${metricsMatches.length} found)`, status: 'warning', pts: 8, tip: 'Add specific percentages, dollar values, or user counts (e.g. +25%, $1.2M).' });
  } else {
    checks.push({ id: 'metrics', label: 'No quantifiable numbers or metrics', status: 'fail', pts: 0, tip: 'Include numbers (e.g. "improved speed by 35%").' });
  }

  // 7. Core Skills (+10 pts)
  if (skills.length >= 5) {
    score += 10;
    checks.push({ id: 'skills', label: `Comprehensive skills matrix (${skills.length} skills)`, status: 'pass', pts: 10 });
  } else if (skills.length > 0) {
    score += 5;
    checks.push({ id: 'skills', label: `Few skills listed (${skills.length} skills)`, status: 'warning', pts: 5, tip: 'Add at least 5-8 technical and domain skills.' });
  } else {
    checks.push({ id: 'skills', label: 'No skills added', status: 'fail', pts: 0, tip: 'List your core skills and proficiencies.' });
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    checks,
    matchedVerbs,
    metricsCount: metricsMatches.length,
  };
}

/**
 * Scan Resume against a Target Job Description
 */
export function scanJobMatch(resumeData, jobDescription) {
  if (!jobDescription || jobDescription.trim().length < 20) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
      message: 'Please paste a complete job description (at least 20 characters).',
    };
  }

  const resumeText = JSON.stringify(resumeData).toLowerCase();

  // Extract candidate keyword tokens from job description
  const cleanJob = jobDescription.toLowerCase().replace(/[^a-z0-9#+.\s]/g, ' ');
  const tokens = cleanJob.split(/\s+/).filter((t) => t.length >= 3);

  // Common stop words to ignore
  const STOP_WORDS = new Set([
    'the', 'and', 'with', 'for', 'that', 'this', 'you', 'will', 'are', 'have', 'from', 'your', 'our',
    'work', 'team', 'experience', 'ability', 'years', 'skills', 'must', 'role', 'responsibilities',
    'looking', 'candidate', 'company', 'required', 'preferred', 'qualifications', 'opportunity',
  ]);

  const frequency = {};
  tokens.forEach((token) => {
    if (!STOP_WORDS.has(token) && !/^\d+$/.test(token)) {
      frequency[token] = (frequency[token] || 0) + 1;
    }
  });

  // Pick top 20 keywords from job description
  const topKeywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);

  const matched = [];
  const missing = [];

  topKeywords.forEach((kw) => {
    if (resumeText.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchPercentage = topKeywords.length > 0
    ? Math.round((matched.length / topKeywords.length) * 100)
    : 0;

  return {
    matchPercentage,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalKeywordsScanned: topKeywords.length,
  };
}
