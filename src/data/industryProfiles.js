export const industryProfiles = [
  {
    id: 'software-engineer',
    name: 'Senior Software Engineer',
    icon: '💻',
    category: 'Engineering & Cloud',
    data: {
      personalInfo: {
        fullName: 'Marcus Vance',
        jobTitle: 'Senior Full-Stack & Cloud Engineer',
        email: 'marcus.vance@techdev.io',
        phone: '(415) 628-9104',
        summary: 'Performance-driven Software Engineer with 7+ years of expertise building distributed cloud architectures, event-driven microservices, and reactive web applications. Track record of scaling systems to 15M+ monthly active users and reducing cloud operational costs by 32%.',
      },
      experience: [
        {
          id: 'exp-se-1',
          company: 'Aether Cloud Systems',
          role: 'Staff Platform Engineer',
          duration: '2022 — Present',
          description: 'Architected multi-region Kubernetes platform handling 45K requests/second with 99.99% uptime. Spearheaded migration from monolithic Rails backend to Go and Node.js microservices, cutting p99 latency from 420ms to 68ms. Mentored 9 junior and mid-level engineers.',
        },
        {
          id: 'exp-se-2',
          company: 'Veloce Data Labs',
          role: 'Senior Backend Engineer',
          duration: '2019 — 2022',
          description: 'Engineered real-time analytics pipeline using Apache Kafka, PostgreSQL, and Redis caching. Reduced query execution times by 54% through database indexing strategies and query rewriting. Integrated OAuth2, SAML, and role-based access control.',
        },
        {
          id: 'exp-se-3',
          company: 'Nexus Interactive',
          role: 'Full-Stack Developer',
          duration: '2017 — 2019',
          description: 'Delivered customer-facing web dashboard using React, TypeScript, and GraphQL. Automated CI/CD deployment pipelines using GitHub Actions, decreasing release cycle times from weekly to multiple daily deploys.',
        },
      ],
      education: [
        {
          id: 'edu-se-1',
          degree: 'B.S. in Computer Science',
          school: 'University of Washington',
          duration: '2013 — 2017',
        },
      ],
      skills: [
        { id: 'sk-1', name: 'Go / Golang' },
        { id: 'sk-2', name: 'TypeScript & React' },
        { id: 'sk-3', name: 'Kubernetes & Docker' },
        { id: 'sk-4', name: 'PostgreSQL & Redis' },
        { id: 'sk-5', name: 'AWS & Terraform' },
        { id: 'sk-6', name: 'GraphQL & gRPC' },
      ],
      languages: [
        { id: 'lang-1', name: 'English', percentage: 100 },
        { id: 'lang-2', name: 'German', percentage: 70 },
      ],
      projects: [
        {
          id: 'proj-se-1',
          name: 'Distributed Task Queue (Open Source)',
          description: 'High-throughput Go task scheduler with redis persistence and zero external dependencies, 3.4K GitHub stars.',
        },
        {
          id: 'proj-se-2',
          name: 'Cloud Cost Optimizer CLI',
          description: 'Automated orphan AWS EBS volume and snapshot cleaner saving clients an average of $4,500/month.',
        },
      ],
      certifications: [
        {
          id: 'cert-se-1',
          name: 'AWS Certified Solutions Architect — Professional',
          issuer: 'Amazon Web Services',
          date: '2023',
        },
      ],
      themeConfig: {
        primaryColor: '#10B981',
        fontFamily: 'Inter, sans-serif',
        spacing: 'medium',
      },
    },
  },
  {
    id: 'product-designer',
    name: 'Lead Product & UI/UX Designer',
    icon: '🎨',
    category: 'Design & Creative',
    data: {
      personalInfo: {
        fullName: 'Alexandra Chen',
        jobTitle: 'Lead Product Designer',
        email: 'alex.chen@designstudio.co',
        phone: '(415) 829-4017',
        summary: 'Award-winning product designer with 8+ years of experience crafting intuitive digital experiences for high-growth SaaS startups and Fortune 500 companies. Passionate about design systems, accessibility (WCAG AAA), and translating user research into business growth.',
      },
      experience: [
        {
          id: 'exp-pd-1',
          company: 'Streamline Labs',
          role: 'Lead Product Designer',
          duration: '2022 — Present',
          description: 'Spearheaded redesign of core SaaS workflow, increasing trial-to-paid conversion by 34%. Built and governed tokenized multi-brand design system in Figma adopted across 6 cross-functional engineering squads.',
        },
        {
          id: 'exp-pd-2',
          company: 'NovaBridge FinTech',
          role: 'Senior UX Designer',
          duration: '2019 — 2022',
          description: 'Led end-to-end design for mobile banking application serving 2.4M users. Conducted 140+ user interviews and usability tests, reducing onboarding drop-off by 28%.',
        },
        {
          id: 'exp-pd-3',
          company: 'PixelForge Studio',
          role: 'UI/UX Designer',
          duration: '2016 — 2019',
          description: 'Created responsive e-commerce web applications and interactive micro-animations. Elevated client checkout conversions by 22% via rigorous A/B testing and checkout simplification.',
        },
      ],
      education: [
        {
          id: 'edu-pd-1',
          degree: 'M.Des. Interaction Design',
          school: 'Carnegie Mellon University',
          duration: '2014 — 2016',
        },
        {
          id: 'edu-pd-2',
          degree: 'B.A. Visual Communication',
          school: 'UC Berkeley',
          duration: '2010 — 2014',
        },
      ],
      skills: [
        { id: 'sk-pd-1', name: 'Figma & FigJam' },
        { id: 'sk-pd-2', name: 'Design Systems' },
        { id: 'sk-pd-3', name: 'User Research & Testing' },
        { id: 'sk-pd-4', name: 'Prototyping (Framer)' },
        { id: 'sk-pd-5', name: 'Design Tokens & CSS' },
        { id: 'sk-pd-6', name: 'Accessibility (WCAG 2.1)' },
      ],
      languages: [
        { id: 'lang-pd-1', name: 'English', percentage: 100 },
        { id: 'lang-pd-2', name: 'Mandarin', percentage: 85 },
        { id: 'lang-pd-3', name: 'French', percentage: 55 },
      ],
      projects: [
        {
          id: 'proj-pd-1',
          name: 'Helix Design System v3',
          description: 'Universal design tokens and React UI library powering 14 desktop and mobile products.',
        },
        {
          id: 'proj-pd-2',
          name: 'HealthPulse Patient Portal',
          description: 'Patient-facing health dashboard with appointment booking and real-time biometric vitals visualization.',
        },
      ],
      certifications: [
        {
          id: 'cert-pd-1',
          name: 'Nielsen Norman Group UX Master Certified',
          issuer: 'NN/g',
          date: '2021',
        },
      ],
      themeConfig: {
        primaryColor: '#D97757',
        fontFamily: 'Inter, sans-serif',
        spacing: 'medium',
      },
    },
  },
  {
    id: 'data-scientist',
    name: 'Senior Data Scientist & AI Specialist',
    icon: '📊',
    category: 'AI & Analytics',
    data: {
      personalInfo: {
        fullName: 'Dr. Priya Ramanathan',
        jobTitle: 'Senior Data Scientist & Machine Learning Lead',
        email: 'priya.ramanathan@aimlresearch.org',
        phone: '(617) 492-3850',
        summary: 'Quantitative Data Scientist and ML researcher with Ph.D. and 6+ years driving enterprise AI solutions. Specialized in generative LLM fine-tuning, predictive modeling, and scalable feature engineering. Authored 8 peer-reviewed publications with 1,200+ citations.',
      },
      experience: [
        {
          id: 'exp-ds-1',
          company: 'OmniAI Solutions',
          role: 'Staff Machine Learning Scientist',
          duration: '2022 — Present',
          description: 'Developed proprietary retrieval-augmented generation (RAG) pipeline for clinical documents, boosting answer factual accuracy from 74% to 96.2%. Productionized PyTorch transformer models serving 500K daily queries.',
        },
        {
          id: 'exp-ds-2',
          company: 'Krypton Capital Analytics',
          role: 'Senior Quantitative Analyst',
          duration: '2019 — 2022',
          description: 'Constructed algorithmic portfolio risk models using gradient boosted decision trees (XGBoost) and Bayesian inference, increasing risk-adjusted returns by 18% over benchmark indices.',
        },
      ],
      education: [
        {
          id: 'edu-ds-1',
          degree: 'Ph.D. in Computational Statistics',
          school: 'Massachusetts Institute of Technology',
          duration: '2015 — 2019',
        },
        {
          id: 'edu-ds-2',
          degree: 'B.S. in Mathematics',
          school: 'Stanford University',
          duration: '2011 — 2015',
        },
      ],
      skills: [
        { id: 'sk-ds-1', name: 'Python & PyTorch' },
        { id: 'sk-ds-2', name: 'LLM Fine-Tuning & RAG' },
        { id: 'sk-ds-3', name: 'SQL & BigQuery' },
        { id: 'sk-ds-4', name: 'XGBoost & Scikit-Learn' },
        { id: 'sk-ds-5', name: 'MLOps (MLflow, Kubeflow)' },
        { id: 'sk-ds-6', name: 'Data Visualization (Plotly)' },
      ],
      languages: [
        { id: 'lang-ds-1', name: 'English', percentage: 100 },
        { id: 'lang-ds-2', name: 'Tamil', percentage: 95 },
      ],
      projects: [
        {
          id: 'proj-ds-1',
          name: 'BioBERT Biomedical Entity Extractor',
          description: 'Fine-tuned transformer achieving SOTA F1-score of 91.4% on chemical and gene disease named-entity recognition.',
        },
      ],
      certifications: [
        {
          id: 'cert-ds-1',
          name: 'TensorFlow Certified Developer',
          issuer: 'Google',
          date: '2021',
        },
      ],
      themeConfig: {
        primaryColor: '#1E3A8A',
        fontFamily: 'Roboto, sans-serif',
        spacing: 'medium',
      },
    },
  },
  {
    id: 'marketing-growth',
    name: 'Growth & Product Marketing Manager',
    icon: '🚀',
    category: 'Marketing & Business',
    data: {
      personalInfo: {
        fullName: 'Julian Sterling',
        jobTitle: 'VP of Growth & Product Marketing',
        email: 'julian.sterling@growthventure.com',
        phone: '(212) 745-9018',
        summary: 'Commercial Growth Leader with 9+ years steering acquisition, brand positioning, and product marketing across B2B SaaS. Scaled ARR from $4M to $36M through lifecycle automation, multi-channel performance marketing, and high-velocity conversion optimization.',
      },
      experience: [
        {
          id: 'exp-gm-1',
          company: 'Hyperion Cloud',
          role: 'VP of Growth Marketing',
          duration: '2021 — Present',
          description: 'Orchestrated $6.5M annual marketing budget across Paid Search, LinkedIn, and Content Marketing, generating $28M in qualified sales pipeline. Boosted organic inbound demo requests by 145% through programmatic SEO.',
        },
        {
          id: 'exp-gm-2',
          company: 'SaaSify Platforms',
          role: 'Director of Product Marketing',
          duration: '2018 — 2021',
          description: 'Led competitive positioning, analyst relations (Gartner Magic Quadrant), and launch campaigns for 4 enterprise products. Decreased customer acquisition cost (CAC) by 24% while doubling average deal size.',
        },
      ],
      education: [
        {
          id: 'edu-gm-1',
          degree: 'M.B.A. Marketing & Strategy',
          school: 'Columbia Business School',
          duration: '2016 — 2018',
        },
        {
          id: 'edu-gm-2',
          degree: 'B.A. Economics',
          school: 'New York University',
          duration: '2012 — 2016',
        },
      ],
      skills: [
        { id: 'sk-gm-1', name: 'Product Marketing & GTM' },
        { id: 'sk-gm-2', name: 'Performance Marketing' },
        { id: 'sk-gm-3', name: 'HubSpot & Salesforce' },
        { id: 'sk-gm-4', name: 'Conversion Rate Optimization' },
        { id: 'sk-gm-5', name: 'SEO & Content Strategy' },
        { id: 'sk-gm-6', name: 'Data Analytics (Mixpanel)' },
      ],
      languages: [
        { id: 'lang-gm-1', name: 'English', percentage: 100 },
        { id: 'lang-gm-2', name: 'Spanish', percentage: 80 },
      ],
      projects: [
        {
          id: 'proj-gm-1',
          name: 'GTM Playbook: Zero to $10M ARR',
          description: 'Industry-acclaimed framework featured in Product Marketing Alliance with 40K+ downloads.',
        },
      ],
      certifications: [
        {
          id: 'cert-gm-1',
          name: 'Reforge Growth Series Graduate',
          issuer: 'Reforge',
          date: '2022',
        },
      ],
      themeConfig: {
        primaryColor: '#B7791F',
        fontFamily: 'Inter, sans-serif',
        spacing: 'medium',
      },
    },
  },
  {
    id: 'student-graduate',
    name: 'Computer Science Graduate (Entry Level)',
    icon: '🎓',
    category: 'Entry Level & Student',
    data: {
      personalInfo: {
        fullName: 'Emily Thorne',
        jobTitle: 'Associate Software Engineer & Honors Graduate',
        email: 'emily.thorne@alumni.edu',
        phone: '(512) 390-1172',
        summary: 'Recent Magna Cum Laude Computer Science graduate with strong foundations in object-oriented programming, cloud computing, and algorithms. Completed 2 software internships at fast-growing tech companies. Eager to contribute to scalable web and backend applications.',
      },
      experience: [
        {
          id: 'exp-sg-1',
          company: 'Cloudflare',
          role: 'Software Engineering Intern',
          duration: 'Summer 2024',
          description: 'Built automated telemetry health-check service using Python and Prometheus, monitoring 120+ internal edge microservices. Fixed 14 open bugs in edge routing daemon and wrote comprehensive unit tests achieving 94% coverage.',
        },
        {
          id: 'exp-sg-2',
          company: 'Campus Computing Services',
          role: 'Student Systems Administrator',
          duration: '2022 — 2024',
          description: 'Provided Tier-2 technical support for Linux server labs used by 3,500 students and faculty. Automated server patch deployment scripts using Bash and Ansible.',
        },
      ],
      education: [
        {
          id: 'edu-sg-1',
          degree: 'B.S. in Computer Science (GPA: 3.92 / 4.0)',
          school: 'University of Texas at Austin',
          duration: '2021 — 2025',
        },
      ],
      skills: [
        { id: 'sk-sg-1', name: 'Python & Java' },
        { id: 'sk-sg-2', name: 'JavaScript & React' },
        { id: 'sk-sg-3', name: 'Git & Linux CLI' },
        { id: 'sk-sg-4', name: 'SQL & Database Design' },
        { id: 'sk-sg-5', name: 'Data Structures & Algorithms' },
        { id: 'sk-sg-6', name: 'Docker Fundamentals' },
      ],
      languages: [
        { id: 'lang-sg-1', name: 'English', percentage: 100 },
        { id: 'lang-sg-2', name: 'Japanese', percentage: 60 },
      ],
      projects: [
        {
          id: 'proj-sg-1',
          name: 'Campus Ride-Sharing Web App',
          description: 'Full-stack application with geolocation routing built with React, Node.js, and Google Maps API; active with 600+ student riders.',
        },
        {
          id: 'proj-sg-2',
          name: 'Mini C-Compiler',
          description: 'Lexer, parser, and code-generator for a subset of C written in Rust, generating x86 assembly.',
        },
      ],
      certifications: [
        {
          id: 'cert-sg-1',
          name: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
        },
      ],
      themeConfig: {
        primaryColor: '#0EA5E9',
        fontFamily: 'Inter, sans-serif',
        spacing: 'medium',
      },
    },
  },
];
