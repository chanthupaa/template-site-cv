import React from 'react';

/* ── Helper Functions ── */
const getList = (value) => (Array.isArray(value) ? value : []);
const getInitials = (name) =>
  (name || 'Your Name')
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function UniversalDynamicTemplate({ data, config = {}, _templateId = '' }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);
  const certifications = getList(data?.certifications);

  // Configuration values with robust fallbacks
  const layout = config.layout || 'header-banner';
  const headerBg = config.headerBg || '#0F172A';
  const headerText = config.headerText || '#FFFFFF';
  const accentColor = config.accentColor || '#2563EB';
  const bodyBg = config.bodyBg || '#FFFFFF';
  const sidebarBg = config.sidebarBg || '#1E293B';
  const sidebarText = config.sidebarText || '#F8FAFC';
  const fontHeader = config.fontHeader || "'Inter', sans-serif";
  const fontBody = config.fontBody || "'Inter', sans-serif";
  const cardStyle = config.cardStyle || 'clean';
  const skillStyle = config.skillStyle || 'pills';
  const dividerStyle = config.dividerStyle || 'solid';

  // Section title decorator based on dividerStyle
  const renderSectionHeader = (title, sectionNum, isSidebar = false, customColor = null) => {
    const textColor = customColor || (isSidebar ? (sidebarText === '#0F172A' ? accentColor : '#94A3B8') : accentColor);

    if (dividerStyle === 'numbered') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, borderBottom: `1px solid ${isSidebar ? 'rgba(255,255,255,0.15)' : '#E2E8F0'}`, paddingBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Roboto Mono', monospace", color: accentColor }}>
            {String(sectionNum || 1).padStart(2, '0')} //
          </span>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#0F172A' }}>
            {title}
          </h3>
        </div>
      );
    }

    if (dividerStyle === 'bracket') {
      return (
        <div style={{ marginBottom: 12, borderBottom: `1px solid ${isSidebar ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`, paddingBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 12.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: fontHeader, color: textColor }}>
            [ {title} ]
          </h3>
        </div>
      );
    }

    if (dividerStyle === 'left-bar') {
      return (
        <div style={{ borderLeft: `3.5px solid ${accentColor}`, paddingLeft: 8, marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#0F172A' }}>
            {title}
          </h3>
        </div>
      );
    }

    if (dividerStyle === 'underline-double') {
      return (
        <div style={{ borderBottom: `3px double ${accentColor}`, paddingBottom: 4, marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#0F172A' }}>
            {title}
          </h3>
        </div>
      );
    }

    if (dividerStyle === 'pill-tag') {
      return (
        <div style={{ marginBottom: 12 }}>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 12, background: isSidebar ? 'rgba(255,255,255,0.12)' : `${accentColor}18`, color: textColor, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', border: `1px solid ${accentColor}40` }}>
            {title}
          </span>
        </div>
      );
    }

    if (dividerStyle === 'minimal-plain') {
      return (
        <div style={{ marginBottom: 10, borderBottom: `1px solid ${isSidebar ? 'rgba(255,255,255,0.12)' : '#CBD5E1'}`, paddingBottom: 3 }}>
          <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#334155' }}>
            {title}
          </h3>
        </div>
      );
    }

    if (dividerStyle === 'bottom-line') {
      return (
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#0F172A' }}>
            {title}
          </h3>
          <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        </div>
      );
    }

    // Default 'solid'
    return (
      <div style={{ marginBottom: 12, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: fontHeader, color: isSidebar ? sidebarText : '#0F172A' }}>
          {title}
        </h3>
      </div>
    );
  };

  // Skill item renderer
  const renderSkill = (skill, idx, isSidebar = false) => {
    const isDarkBg = isSidebar && (sidebarBg.startsWith('#1') || sidebarBg.startsWith('#0') || sidebarBg.startsWith('#2') || sidebarBg.startsWith('#3'));
    
    if (skillStyle === 'badge-solid') {
      return (
        <span
          key={skill.id || idx}
          style={{
            fontSize: 10.5,
            padding: '3px 8px',
            background: accentColor,
            color: '#FFFFFF',
            borderRadius: 4,
            fontWeight: 700,
            display: 'inline-block',
            letterSpacing: '0.3px',
          }}
        >
          {skill.name}
        </span>
      );
    }

    if (skillStyle === 'bars') {
      const levelPercent = skill.level === 'Expert' ? 95 : skill.level === 'Advanced' ? 85 : skill.level === 'Intermediate' ? 65 : 75;
      return (
        <div key={skill.id || idx} style={{ marginBottom: 7, fontSize: 11 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, color: isDarkBg ? '#E2E8F0' : '#334155' }}>
            <span style={{ fontWeight: 600 }}>{skill.name}</span>
            <span style={{ fontSize: 9.5, opacity: 0.8 }}>{skill.level || 'Proficient'}</span>
          </div>
          <div style={{ height: 4, background: isDarkBg ? 'rgba(255,255,255,0.15)' : '#E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${levelPercent}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
          </div>
        </div>
      );
    }

    // Default 'pills'
    return (
      <span
        key={skill.id || idx}
        style={{
          fontSize: 10.5,
          padding: '3px 9px',
          background: isDarkBg ? 'rgba(255,255,255,0.08)' : `${accentColor}12`,
          color: isDarkBg ? '#F1F5F9' : '#1E293B',
          border: `1px solid ${isDarkBg ? 'rgba(255,255,255,0.2)' : `${accentColor}30`}`,
          borderRadius: 14,
          fontWeight: 600,
          display: 'inline-block',
        }}
      >
        {skill.name}
      </span>
    );
  };

  // Card wrapper style
  const getCardStyle = () => {
    if (cardStyle === 'bordered') {
      return {
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 8,
        padding: '14px 16px',
        marginBottom: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      };
    }
    if (cardStyle === 'soft') {
      return {
        background: '#F8FAFC',
        borderRadius: 8,
        padding: '14px 16px',
        marginBottom: 12,
        border: '1px solid #F1F5F9',
      };
    }
    return {
      marginBottom: 14,
    };
  };

  // Reusable Contact Information Block
  const renderContactBlock = (isSidebar = false, _isCompact = false) => {
    const isDarkBg = isSidebar && (sidebarBg.startsWith('#1') || sidebarBg.startsWith('#0') || sidebarBg.startsWith('#2') || sidebarBg.startsWith('#3'));
    const textColor = isDarkBg ? '#E2E8F0' : '#475569';

    return (
      <div style={{ fontSize: 11.5, color: textColor, lineHeight: 1.6 }}>
        {info.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, overflowWrap: 'anywhere' }}>
            <span style={{ color: accentColor, fontWeight: 700 }}>✉</span>
            <span>{info.email}</span>
          </div>
        )}
        {info.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ color: accentColor, fontWeight: 700 }}>☎</span>
            <span>{info.phone}</span>
          </div>
        )}
        {info.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ color: accentColor, fontWeight: 700 }}>📍</span>
            <span>{info.location}</span>
          </div>
        )}
        {info.website && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, overflowWrap: 'anywhere' }}>
            <span style={{ color: accentColor, fontWeight: 700 }}>🔗</span>
            <span>{info.website}</span>
          </div>
        )}
      </div>
    );
  };

  /* --------------------------------------------------------------------------
     LAYOUT 1: TWO COLUMN LEFT (DARK or LIGHT)
     Used by: two-column-left-dark, two-column-left-light
     -------------------------------------------------------------------------- */
  if (layout === 'two-column-left-dark' || layout === 'two-column-left-light') {
    const isDarkSidebar = layout === 'two-column-left-dark';

    return (
      <div
        style={{
          width: '100%',
          minHeight: 1123,
          display: 'flex',
          background: bodyBg,
          color: '#1E293B',
          fontFamily: fontBody,
          boxSizing: 'border-box',
        }}
      >
        {/* Left Sidebar */}
        <aside
          style={{
            width: '33%',
            background: sidebarBg,
            color: sidebarText,
            padding: '36px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            borderRight: isDarkSidebar ? 'none' : '1px solid #E2E8F0',
          }}
        >
          {/* Avatar / Profile picture */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 88,
                height: 88,
                margin: '0 auto 12px',
                borderRadius: '50%',
                border: `3px solid ${accentColor}`,
                overflow: 'hidden',
                display: 'grid',
                placeItems: 'center',
                background: isDarkSidebar ? '#27272A' : '#E2E8F0',
                color: isDarkSidebar ? '#FAFAFA' : '#0F172A',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {info.profilePicture ? (
                <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </div>
            {renderSectionHeader('Contact', 1, true)}
            {renderContactBlock(true)}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              {renderSectionHeader('Skills & Stack', 2, true)}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => renderSkill(s, idx, true))}
              </div>
            </div>
          )}

          {/* Education in sidebar */}
          {educations.length > 0 && (
            <div>
              {renderSectionHeader('Education', 3, true)}
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10, fontSize: 11 }}>
                  <div style={{ fontWeight: 700, color: isDarkSidebar ? '#FFFFFF' : '#0F172A' }}>{edu.degree}</div>
                  <div style={{ color: isDarkSidebar ? '#CBD5E1' : '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: 10, color: isDarkSidebar ? '#94A3B8' : '#64748B' }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              {renderSectionHeader('Languages', 4, true)}
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span>{l.name}</span>
                    <span style={{ opacity: 0.8 }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 3.5, background: isDarkSidebar ? 'rgba(255,255,255,0.15)' : '#CBD5E1', borderRadius: 2 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              {renderSectionHeader('Certifications', 5, true)}
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600, color: isDarkSidebar ? '#FFFFFF' : '#0F172A' }}>{cert.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 10 }}>{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Main Column */}
        <main style={{ flex: 1, padding: '38px 36px', boxSizing: 'border-box' }}>
          {/* Header */}
          <header style={{ marginBottom: 24, borderBottom: `2px solid ${accentColor}25`, paddingBottom: 16 }}>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px', fontFamily: fontHeader }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 14, fontWeight: 700, color: accentColor, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              {info.jobTitle || 'Professional Title'}
            </p>
          </header>

          {/* Summary */}
          {info.summary && (
            <section style={{ marginBottom: 24 }}>
              {renderSectionHeader('Professional Summary', 1)}
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#334155' }}>
                {info.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              {renderSectionHeader('Work Experience', 2)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} style={getCardStyle()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                      <strong style={{ fontSize: 13, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 5 }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#475569' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              {renderSectionHeader('Key Projects & Deliverables', 3)}
              <div style={{ display: 'grid', gridTemplateColumns: projects.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} style={{ ...getCardStyle(), padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <strong style={{ fontSize: 12, color: '#0F172A' }}>{proj.name}</strong>
                      {proj.link && <span style={{ fontSize: 10, color: accentColor }}>View ↗</span>}
                    </div>
                    {proj.description && (
                      <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.45, color: '#475569' }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
     LAYOUT 2: TWO COLUMN RIGHT
     Used by: two-column-right
     -------------------------------------------------------------------------- */
  if (layout === 'two-column-right') {
    return (
      <div
        style={{
          width: '100%',
          minHeight: 1123,
          display: 'flex',
          background: bodyBg,
          color: '#1E293B',
          fontFamily: fontBody,
          boxSizing: 'border-box',
        }}
      >
        {/* Main Content (Left, 67%) */}
        <main style={{ flex: 1, padding: '38px 36px', boxSizing: 'border-box' }}>
          <header style={{ marginBottom: 24, borderBottom: `2px solid ${accentColor}25`, paddingBottom: 16 }}>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px', fontFamily: fontHeader }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 14, fontWeight: 700, color: accentColor, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              {info.jobTitle || 'Professional Title'}
            </p>
          </header>

          {info.summary && (
            <section style={{ marginBottom: 24 }}>
              {renderSectionHeader('Executive Profile', 1)}
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#334155' }}>
                {info.summary}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              {renderSectionHeader('Career Experience', 2)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} style={getCardStyle()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                      <strong style={{ fontSize: 13, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 5 }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#475569' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              {renderSectionHeader('Flagship Projects', 3)}
              <div style={{ display: 'grid', gridTemplateColumns: projects.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} style={{ ...getCardStyle(), padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <strong style={{ fontSize: 12, color: '#0F172A' }}>{proj.name}</strong>
                      {proj.link && <span style={{ fontSize: 10, color: accentColor }}>Link ↗</span>}
                    </div>
                    {proj.description && (
                      <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.45, color: '#475569' }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar (33%) */}
        <aside
          style={{
            width: '33%',
            background: sidebarBg,
            color: sidebarText,
            padding: '36px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            borderLeft: '1px solid #E2E8F0',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 88,
                height: 88,
                margin: '0 auto 12px',
                borderRadius: '50%',
                border: `3px solid ${accentColor}`,
                overflow: 'hidden',
                display: 'grid',
                placeItems: 'center',
                background: '#F1F5F9',
                color: '#0F172A',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {info.profilePicture ? (
                <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </div>
            {renderSectionHeader('Contact', 1, true)}
            {renderContactBlock(true)}
          </div>

          {skills.length > 0 && (
            <div>
              {renderSectionHeader('Expertise', 2, true)}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => renderSkill(s, idx, true))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              {renderSectionHeader('Credentials', 3, true)}
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10, fontSize: 11 }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{edu.degree}</div>
                  <div style={{ color: '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              {renderSectionHeader('Languages', 4, true)}
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span>{l.name}</span>
                    <span style={{ opacity: 0.8 }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 3.5, background: '#CBD5E1', borderRadius: 2 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              {renderSectionHeader('Certifications', 5, true)}
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>{cert.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 10 }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
     LAYOUT 3: HEADER BANNER & GRADIENT BANNER
     Used by: header-banner, header-gradient
     -------------------------------------------------------------------------- */
  if (layout === 'header-banner' || layout === 'header-gradient') {
    return (
      <div
        style={{
          width: '100%',
          minHeight: 1123,
          background: bodyBg,
          color: '#1E293B',
          fontFamily: fontBody,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Prominent Banner */}
        <header
          style={{
            background: headerBg,
            color: headerText,
            padding: '36px 44px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: '-0.5px', fontFamily: fontHeader }}>
                {info.fullName || 'Your Name'}
              </h1>
              <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, opacity: 0.95, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                {info.jobTitle || 'Professional Title'}
              </p>
            </div>

            {/* Quick Contact Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 11 }}>
              {info.email && (
                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '5px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                  ✉ {info.email}
                </span>
              )}
              {info.phone && (
                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '5px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                  ☎ {info.phone}
                </span>
              )}
              {info.location && (
                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '5px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                  📍 {info.location}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* 2-Column Body Content Below Banner */}
        <div style={{ display: 'flex', flex: 1, padding: '32px 40px', gap: 36, boxSizing: 'border-box' }}>
          {/* Main Work Column (65%) */}
          <div style={{ flex: '1 1 64%' }}>
            {info.summary && (
              <section style={{ marginBottom: 24 }}>
                {renderSectionHeader('Executive Overview', 1)}
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#334155' }}>
                  {info.summary}
                </p>
              </section>
            )}

            {experiences.length > 0 && (
              <section style={{ marginBottom: 24 }}>
                {renderSectionHeader('Professional Experience', 2)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {experiences.map((exp, idx) => (
                    <div key={exp.id || idx} style={getCardStyle()}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                        <strong style={{ fontSize: 13, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                        <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 5 }}>
                        {exp.company}
                      </div>
                      {exp.description && (
                        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#475569' }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section style={{ marginBottom: 20 }}>
                {renderSectionHeader('Featured Initiatives', 3)}
                <div style={{ display: 'grid', gridTemplateColumns: projects.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} style={{ ...getCardStyle(), padding: '10px 12px' }}>
                      <strong style={{ fontSize: 12, color: '#0F172A', display: 'block', marginBottom: 3 }}>{proj.name}</strong>
                      {proj.description && (
                        <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.45, color: '#475569' }}>
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Secondary Column (36%) */}
          <div style={{ flex: '0 0 34%', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {skills.length > 0 && (
              <div>
                {renderSectionHeader('Core Competencies', 4)}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map((s, idx) => renderSkill(s, idx, false))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                {renderSectionHeader('Education & Credentials', 5)}
                {educations.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ marginBottom: 10, fontSize: 11 }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{edu.degree}</div>
                    <div style={{ color: '#475569' }}>{edu.institution}</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                {renderSectionHeader('Honors & Certifications', 6)}
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx} style={{ marginBottom: 7, fontSize: 10.5 }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{cert.name}</div>
                    <div style={{ color: '#64748B', fontSize: 10 }}>{cert.issuer} {cert.date ? `(${cert.date})` : ''}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                {renderSectionHeader('Languages', 7)}
                {languages.map((l, idx) => (
                  <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{l.name}</span>
                      <span style={{ fontSize: 10, color: '#64748B' }}>{l.percentage || 0}%</span>
                    </div>
                    <div style={{ height: 3.5, background: '#E2E8F0', borderRadius: 2 }}>
                      <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
     LAYOUT 4: SPLIT HEADER
     Used by: split-header
     -------------------------------------------------------------------------- */
  if (layout === 'split-header') {
    return (
      <div
        style={{
          width: '100%',
          minHeight: 1123,
          background: bodyBg,
          color: '#1E293B',
          fontFamily: fontBody,
          boxSizing: 'border-box',
          padding: '40px 44px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Split Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: 24, marginBottom: 28, borderBottom: `2px solid ${accentColor}`, paddingBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px', fontFamily: fontHeader }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {info.jobTitle || 'Professional Title'}
            </p>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '12px 18px', minWidth: 220 }}>
            {renderContactBlock(false, true)}
          </div>
        </header>

        {/* Body 2 Columns */}
        <div style={{ display: 'flex', flex: 1, gap: 36 }}>
          <div style={{ flex: '1 1 65%' }}>
            {info.summary && (
              <section style={{ marginBottom: 24 }}>
                {renderSectionHeader('Executive Summary', 1)}
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#334155' }}>
                  {info.summary}
                </p>
              </section>
            )}

            {experiences.length > 0 && (
              <section style={{ marginBottom: 24 }}>
                {renderSectionHeader('Professional Experience', 2)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {experiences.map((exp, idx) => (
                    <div key={exp.id || idx} style={getCardStyle()}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                        <strong style={{ fontSize: 13, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                        <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 5 }}>
                        {exp.company}
                      </div>
                      {exp.description && (
                        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#475569' }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section style={{ marginBottom: 20 }}>
                {renderSectionHeader('Selected Engagements', 3)}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} style={{ ...getCardStyle(), padding: '10px 12px' }}>
                      <strong style={{ fontSize: 12, color: '#0F172A', display: 'block', marginBottom: 3 }}>{proj.name}</strong>
                      {proj.description && (
                        <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.45, color: '#475569' }}>
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {skills.length > 0 && (
              <div>
                {renderSectionHeader('Core Skills', 4)}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map((s, idx) => renderSkill(s, idx, false))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                {renderSectionHeader('Education', 5)}
                {educations.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ marginBottom: 10, fontSize: 11 }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{edu.degree}</div>
                    <div style={{ color: '#475569' }}>{edu.institution}</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                {renderSectionHeader('Certifications', 6)}
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx} style={{ marginBottom: 6, fontSize: 10.5 }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{cert.name}</div>
                    <div style={{ opacity: 0.8, fontSize: 10 }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                {renderSectionHeader('Languages', 7)}
                {languages.map((l, idx) => (
                  <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontWeight: 600 }}>{l.name}</span>
                      <span style={{ fontSize: 10, color: '#64748B' }}>{l.percentage || 0}%</span>
                    </div>
                    <div style={{ height: 3.5, background: '#E2E8F0', borderRadius: 2 }}>
                      <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
     LAYOUT 5: CARDS MODERN
     Used by: cards-modern
     -------------------------------------------------------------------------- */
  if (layout === 'cards-modern') {
    return (
      <div
        style={{
          width: '100%',
          minHeight: 1123,
          background: bodyBg,
          color: '#1E293B',
          fontFamily: fontBody,
          boxSizing: 'border-box',
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Modern Top Card Header */}
        <header
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderTop: `4px solid ${accentColor}`,
            borderRadius: 10,
            padding: '22px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#0F172A', fontFamily: fontHeader }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {info.jobTitle || 'Professional Title'}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 11, color: '#64748B' }}>
            {info.email && <span>✉ {info.email}</span>}
            {info.phone && <span>☎ {info.phone}</span>}
            {info.location && <span>📍 {info.location}</span>}
          </div>
        </header>

        {/* Grid of Modular Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '62% 38%', gap: 16 }}>
          {/* Left Column Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {info.summary && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Profile', 1)}
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6, color: '#334155' }}>
                  {info.summary}
                </p>
              </div>
            )}

            {experiences.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Experience', 2)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {experiences.map((exp, idx) => (
                    <div key={exp.id || idx} style={{ borderBottom: idx < experiences.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                        <strong style={{ fontSize: 12.5, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                        <span style={{ fontSize: 10.5, color: '#64748B' }}>{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: accentColor, marginBottom: 4 }}>{exp.company}</div>
                      {exp.description && <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: '#475569' }}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Projects', 3)}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} style={{ background: '#F8FAFC', borderRadius: 6, padding: '8px 10px', border: '1px solid #E2E8F0' }}>
                      <strong style={{ fontSize: 11.5, color: '#0F172A' }}>{proj.name}</strong>
                      {proj.description && <p style={{ margin: '3px 0 0', fontSize: 10, color: '#64748B', lineHeight: 1.35 }}>{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {skills.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Stack & Skills', 4)}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map((s, idx) => renderSkill(s, idx, false))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Education', 5)}
                {educations.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ marginBottom: 10, fontSize: 11 }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{edu.degree}</div>
                    <div style={{ color: '#475569' }}>{edu.institution}</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>{edu.startDate} — {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Certifications', 6)}
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx} style={{ marginBottom: 6, fontSize: 10.5 }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{cert.name}</div>
                    <div style={{ color: '#64748B', fontSize: 10 }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                {renderSectionHeader('Languages', 7)}
                {languages.map((l, idx) => (
                  <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontWeight: 600 }}>{l.name}</span>
                      <span style={{ fontSize: 10, color: '#64748B' }}>{l.percentage || 0}%</span>
                    </div>
                    <div style={{ height: 3.5, background: '#E2E8F0', borderRadius: 2 }}>
                      <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: accentColor, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------------
     LAYOUT 6: MINIMAL SINGLE COLUMN
     Used by: minimal-single (Ivy League / Wall Street / Legal / Pure ATS)
     -------------------------------------------------------------------------- */
  return (
    <div
      style={{
        width: '100%',
        minHeight: 1123,
        background: bodyBg,
        color: '#1E293B',
        fontFamily: fontBody,
        boxSizing: 'border-box',
        padding: '44px 52px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Centered or Classical Left Header */}
      <header style={{ textAlign: 'center', marginBottom: 24, borderBottom: `2px solid ${accentColor}`, paddingBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#0F172A', letterSpacing: '0.5px', fontFamily: fontHeader }}>
          {info.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '5px 0 10px', fontSize: 14, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
          {info.jobTitle || 'Professional Title'}
        </p>

        {/* Clean ATS delimiter contact line */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 16px', fontSize: 11.5, color: '#475569' }}>
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>• {info.phone}</span>}
          {info.location && <span>• {info.location}</span>}
          {info.website && <span>• {info.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {info.summary && (
        <section style={{ marginBottom: 22 }}>
          {renderSectionHeader('Professional Summary', 1)}
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#334155' }}>
            {info.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          {renderSectionHeader('Professional Experience', 2)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div>
                    <strong style={{ fontSize: 13, color: '#0F172A', fontWeight: 800 }}>{exp.position}</strong>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: accentColor, marginLeft: 8 }}>| {exp.company}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ margin: '4px 0 0', fontSize: 11.5, lineHeight: 1.55, color: '#475569' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          {renderSectionHeader('Education', 3)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ fontSize: 12.5, color: '#0F172A' }}>{edu.degree}</strong>
                  <span style={{ fontSize: 12, color: '#475569', marginLeft: 8 }}>— {edu.institution}</span>
                </div>
                <span style={{ fontSize: 11, color: '#64748B' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          {renderSectionHeader('Skills & Competencies', 4)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, idx) => renderSkill(s, idx, false))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          {renderSectionHeader('Selected Projects & Engagements', 5)}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} style={{ borderLeft: `2.5px solid ${accentColor}`, paddingLeft: 10 }}>
                <strong style={{ fontSize: 12, color: '#0F172A' }}>{proj.name}</strong>
                {proj.description && <p style={{ margin: '2px 0 0', fontSize: 10.5, color: '#475569', lineHeight: 1.4 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages inline */}
      {(certifications.length > 0 || languages.length > 0) && (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {certifications.length > 0 && (
            <div>
              {renderSectionHeader('Certifications', 6)}
              {certifications.map((c, idx) => (
                <div key={c.id || idx} style={{ fontSize: 11, marginBottom: 4 }}>
                  <strong>{c.name}</strong> <span style={{ color: '#64748B' }}>— {c.issuer}</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              {renderSectionHeader('Languages', 7)}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 11 }}>
                {languages.map((l, idx) => (
                  <span key={l.id || idx} style={{ background: '#F1F5F9', padding: '3px 8px', borderRadius: 4 }}>
                    {l.name} ({l.percentage || 0}%)
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
