/**
 * Generates clean, standard ATS-friendly plain text format
 * from resume data for easy copy-pasting into job application fields.
 */
export function formatResumeToPlainText(data) {
  if (!data) return '';

  const info = data.personalInfo || {};
  const experiences = Array.isArray(data.experience) ? data.experience : [];
  const educations = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const certifications = Array.isArray(data.certifications) ? data.certifications : [];
  const languages = Array.isArray(data.languages) ? data.languages : [];

  let text = '';

  // 1. Header & Contact Information
  text += `${(info.fullName || 'FULL NAME').toUpperCase()}\n`;
  if (info.jobTitle) text += `${info.jobTitle}\n`;
  const contactLine = [info.email, info.phone].filter(Boolean).join(' | ');
  if (contactLine) text += `${contactLine}\n`;
  text += '\n' + '='.repeat(40) + '\n\n';

  // 2. Summary
  if (info.summary) {
    text += 'PROFESSIONAL SUMMARY\n';
    text += '-'.repeat(25) + '\n';
    text += `${info.summary.trim()}\n\n`;
  }

  // 3. Work Experience
  if (experiences.length > 0) {
    text += 'WORK EXPERIENCE\n';
    text += '-'.repeat(25) + '\n';
    experiences.forEach((exp) => {
      text += `${exp.role || 'Role'} | ${exp.company || 'Company'}\n`;
      if (exp.duration) text += `${exp.duration}\n`;
      if (exp.description) {
        // Format bullet lines nicely safely handling non-string inputs
        const lines = String(exp.description).split('\n').filter((l) => l.trim().length > 0);
        lines.forEach((l) => {
          const trimmed = l.trim();
          text += trimmed.startsWith('•') || trimmed.startsWith('-') ? `${trimmed}\n` : `• ${trimmed}\n`;
        });
      }
      text += '\n';
    });
  }

  // 4. Skills & Expertise
  if (skills.length > 0) {
    text += 'CORE SKILLS & TECHNOLOGIES\n';
    text += '-'.repeat(25) + '\n';
    text += skills.map((s) => s.name).join(' • ') + '\n\n';
  }

  // 5. Education
  if (educations.length > 0) {
    text += 'EDUCATION\n';
    text += '-'.repeat(25) + '\n';
    educations.forEach((edu) => {
      text += `${edu.degree || 'Degree'}\n`;
      text += `${edu.school || 'School'}${edu.duration ? ` (${edu.duration})` : ''}\n\n`;
    });
  }

  // 6. Projects
  if (projects.length > 0) {
    text += 'KEY PROJECTS\n';
    text += '-'.repeat(25) + '\n';
    projects.forEach((proj) => {
      text += `${proj.name || 'Project Name'}\n`;
      if (proj.description) text += `• ${proj.description.trim()}\n`;
      text += '\n';
    });
  }

  // 7. Certifications
  if (certifications.length > 0) {
    text += 'CERTIFICATIONS & LICENSES\n';
    text += '-'.repeat(25) + '\n';
    certifications.forEach((cert) => {
      text += `• ${cert.name || 'Certification'}${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.date ? ` (${cert.date})` : ''}\n`;
    });
    text += '\n';
  }

  // 8. Languages
  if (languages.length > 0) {
    text += 'LANGUAGES\n';
    text += '-'.repeat(25) + '\n';
    text += languages.map((l) => `${l.name}${l.percentage ? ` (${l.percentage}%)` : ''}`).join(', ') + '\n\n';
  }

  return text.trim();
}
