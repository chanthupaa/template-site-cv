import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Search, X, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ScaledResumeThumbnail from '../components/ScaledResumeThumbnail';
import { TEMPLATES_LIST, TEMPLATE_CATEGORIES, TAG_COLORS } from '../data/templatesData';
import UserMenu from '../components/auth/UserMenu';

/* ── Realistic sample data so every section is populated ── */
const sampleData = {
  personalInfo: {
    fullName: 'Alexandra Chen',
    jobTitle: 'Senior Product Designer',
    email: 'alex.chen@email.com',
    phone: '(415) 829-4017',
    summary:
      'Award-winning product designer with 8+ years of experience crafting intuitive digital experiences for high-growth startups and Fortune 500 companies. Passionate about user-centred design, design systems, and cross-functional collaboration.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Lead Product Designer',
      company: 'Streamline Labs',
      duration: '2022 — Present',
      description:
        'Spearheaded the redesign of the core SaaS platform, increasing user retention by 34%. Built and maintained a comprehensive design system adopted across 5 product teams.',
    },
    {
      id: 'exp-2',
      role: 'Senior UX Designer',
      company: 'NovaBridge Inc.',
      duration: '2019 — 2022',
      description:
        'Led end-to-end design for a fintech mobile app serving 2M+ users. Conducted 120+ user interviews and translated insights into high-fidelity prototypes.',
    },
    {
      id: 'exp-3',
      role: 'UI/UX Designer',
      company: 'PixelForge Studio',
      duration: '2016 — 2019',
      description:
        'Designed responsive web experiences for e-commerce clients. Improved checkout conversion rates by 22% through iterative A/B testing.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.Des. Interaction Design',
      school: 'Carnegie Mellon University',
      duration: '2014 — 2016',
    },
    {
      id: 'edu-2',
      degree: 'B.A. Visual Communication',
      school: 'University of California, Berkeley',
      duration: '2010 — 2014',
    },
  ],
  skills: [
    { id: 's1', name: 'Figma' },
    { id: 's2', name: 'Design Systems' },
    { id: 's3', name: 'Prototyping' },
    { id: 's4', name: 'User Research' },
    { id: 's5', name: 'React' },
    { id: 's6', name: 'Accessibility' },
  ],
  languages: [
    { id: 'l1', name: 'English', percentage: 100 },
    { id: 'l2', name: 'Mandarin', percentage: 85 },
    { id: 'l3', name: 'French', percentage: 55 },
  ],
  projects: [
    {
      id: 'p1',
      name: 'Design System v3',
      description: 'A modular token-based system powering 12 products with 300+ components.',
    },
    {
      id: 'p2',
      name: 'HealthPulse App',
      description: 'Patient-facing health dashboard with real-time vitals and appointment scheduling.',
    },
  ],
};

export default function TemplatesPage() {
  const { isDark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATES_LIST.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.tag.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      tpl.name.toLowerCase().includes(query) ||
      tpl.desc.toLowerCase().includes(query) ||
      tpl.tag.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category) => {
    if (category === 'All') return TEMPLATES_LIST.length;
    return TEMPLATES_LIST.filter((t) => t.tag.toLowerCase() === category.toLowerCase()).length;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Merriweather, serif' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '24px' }}>ATS Architect</span>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/home" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '15px' }}>
            Workspace
          </Link>
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <UserMenu />
        </div>
      </header>

      {/* Main Container */}
      <main style={{ padding: '64px 48px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '40px', fontFamily: 'Merriweather, serif', marginBottom: '12px', color: 'var(--text-primary)' }}>
              Choose your template
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', margin: 0, maxWidth: '640px', lineHeight: '1.6' }}>
              {TEMPLATES_LIST.length} completely distinct layouts — each with a unique structure, visual identity, and target audience.
            </p>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#22C55E', borderRadius: '50%', display: 'inline-block' }}></span>
            All {TEMPLATES_LIST.length} templates are free &amp; ATS-optimized
          </div>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '20px 24px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-soft)',
          marginBottom: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search templates by style, industry, or visual tag (e.g. Cyber, Minimal, Swiss, Luxury, Brutalist)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 42px 12px 46px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: '14.5px',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={13} /> Filter:
            </span>
            {TEMPLATE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count = getCategoryCount(cat);
              if (count === 0 && cat !== 'All') return null;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: active ? 'var(--accent-color)' : 'var(--border-color)',
                    backgroundColor: active ? 'var(--accent-color)' : 'var(--bg-color)',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    fontSize: '11px',
                    opacity: active ? 0.9 : 0.6,
                    backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'var(--border-color)',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    color: active ? '#FFF' : 'var(--text-secondary)',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Cards Grid */}
        {filteredTemplates.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '48px 28px' }}>
            {filteredTemplates.map((tpl) => {
              const tagColor = TAG_COLORS[tpl.tag] || '#666';
              return (
                <div key={tpl.id} className="cv-template-wrapper">
                  <Link to={`/builder?template=${tpl.id}`} className="cv-template-card">
                    <div className="cv-template-badge">Free</div>

                    {/* Category tag - top right */}
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      padding: '4px 10px', backgroundColor: tagColor,
                      color: '#FFFFFF', borderRadius: '20px', fontSize: '11px',
                      fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                      {tpl.tag}
                    </div>

                    {/* Corner-to-corner scaled template preview */}
                    <div className="cv-template-preview">
                      <ScaledResumeThumbnail templateId={tpl.id} data={sampleData} />
                    </div>

                    <div className="cv-template-overlay">
                      <div className="cv-choose-btn">Choose this CV template</div>
                    </div>
                  </Link>

                  <div style={{ padding: '0 4px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', margin: '0 0 4px 0', fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                      {tpl.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                      {tpl.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
          }}>
            <Search size={40} color="var(--text-secondary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No matching templates found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px' }}>
              We could not find any templates matching "{searchQuery}" under category "{selectedCategory}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="apple-btn"
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
