import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ScaledResumeThumbnail from '../components/ScaledResumeThumbnail';
import UserMenu from '../components/auth/UserMenu';

/* ── Sample data for live previews ── */
const sampleData = {
  personalInfo: {
    fullName: 'Alexandra Chen',
    jobTitle: 'Senior Product Designer',
    email: 'alex.chen@email.com',
    phone: '(415) 829-4017',
    summary:
      'Award-winning product designer with 8+ years of experience crafting intuitive digital experiences for high-growth startups and Fortune 500 companies.',
  },
  experience: [
    { id: 'exp-1', role: 'Lead Product Designer', company: 'Streamline Labs', duration: '2022 — Present', description: 'Spearheaded the redesign of the core SaaS platform, increasing user retention by 34%.' },
    { id: 'exp-2', role: 'Senior UX Designer', company: 'NovaBridge Inc.', duration: '2019 — 2022', description: 'Led end-to-end design for a fintech mobile app serving 2M+ users.' },
  ],
  education: [
    { id: 'edu-1', degree: 'M.Des. Interaction Design', school: 'Carnegie Mellon University', duration: '2014 — 2016' },
  ],
  skills: [
    { id: 's1', name: 'Figma' },
    { id: 's2', name: 'Design Systems' },
    { id: 's3', name: 'Prototyping' },
    { id: 's4', name: 'User Research' },
    { id: 's5', name: 'React' },
  ],
  languages: [
    { id: 'l1', name: 'English', percentage: 100 },
    { id: 'l2', name: 'Mandarin', percentage: 85 },
  ],
  projects: [
    { id: 'p1', name: 'Design System v3', description: 'A modular token-based system powering 12 products.' },
  ],
};

const featuredTemplates = [
  { id: 'canva-minimal-slate', name: 'Minimalist Slate', desc: 'Charcoal sidebar, profile ring, expertise pills, and crisp experience blocks.', bg: 'linear-gradient(135deg, #B3A8ED, #D8D2FB)' },
  { id: 'canva-cyber-emerald', name: 'Cyber Emerald Tech', desc: 'Terminal status header, dark emerald matrix rail, and glowing node timeline.', bg: 'linear-gradient(135deg, #022C22, #10B981)' },
  { id: 'canva-executive-navy', name: 'Executive Royal', desc: 'Deep navy structure with authoritative typography for senior leadership roles.', bg: 'linear-gradient(135deg, #6EE7B7, #A7F3D0)' },
  { id: 'canva-swiss-international', name: 'Swiss Typographic Grid', desc: 'High-contrast Swiss red banner with strict asymmetric modernist layout.', bg: 'linear-gradient(135deg, #EF4444, #7F1D1D)' },
  { id: 'canva-creative-coral', name: 'Creative Coral', desc: 'Energetic coral accents, rounded project cards, and modern creative styling.', bg: 'linear-gradient(135deg, #FCA5A5, #FFCDD2)' },
  { id: 'canva-tokyo-neon', name: 'Tokyo Neo-Brutalist', desc: 'Thick black borders, hard offset drop shadows, and vibrant sticker badges.', bg: 'linear-gradient(135deg, #FDE047, #F43F5E)' },
];

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Bar */}
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 24px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Merriweather, serif' }}>
          <Feather color="var(--accent-color)" size={24} /> ATS Architect
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <UserMenu />
          <Link to="/templates" className="apple-btn" style={{ padding: '10px 24px', fontSize: '14px' }}>Start building</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 48px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontFamily: 'Inter, sans-serif', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2' }}>
          Our latest CV templates are now available
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.5' }}>
          We redesigned the CV building experience from the ground up, offering a smoother, faster editor, cleaner designs, and more free customization.
        </p>
        <Link to="/templates" className="apple-btn" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '18px', padding: '16px 32px' }}>
          Explore Templates
        </Link>
      </section>

      {/* Featured Templates Carousel Section */}
      <section style={{ padding: '40px 0 100px 0', width: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', padding: '0 48px', paddingBottom: '32px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featuredTemplates.map((tpl) => (
            <div className="cv-template-wrapper" style={{ minWidth: '320px' }} key={tpl.id}>
              <Link to={`/builder?template=${tpl.id}`} className="cv-template-card">
                <div className="cv-template-badge">Free</div>
                <div className="cv-template-preview">
                  <ScaledResumeThumbnail templateId={tpl.id} data={sampleData} />
                </div>
                <div className="cv-template-overlay">
                  <div className="cv-choose-btn">Choose this CV template</div>
                </div>
              </Link>
              <div style={{ padding: '0 4px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', fontFamily: 'Inter, sans-serif' }}>{tpl.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{tpl.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ backgroundColor: 'var(--bg-surface)', padding: '100px 0', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '40px', marginBottom: '24px' }}>Ready to land that interview?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px', fontWeight: '300' }}>
            Join thousands of professionals who have upgraded their career with ATS Architect.
          </p>
          <Link to="/templates" className="apple-btn" style={{ display: 'inline-block', textDecoration: 'none', padding: '16px 32px', fontSize: '18px' }}>
            Create Your CV Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-surface)', padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', borderTop: '1px solid var(--border-color)' }}>
        <p>&copy; 2026 ATS Architect. Crafted with care.</p>
      </footer>
    </div>
  );
}
