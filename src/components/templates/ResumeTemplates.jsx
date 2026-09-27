import React from 'react';
import UniversalDynamicTemplate from './UniversalDynamicTemplate';
import { TEMPLATES_BY_ID } from '../../data/templatesCatalog';

/* ── Common Helper Functions ── */
const getList = (value) => (Array.isArray(value) ? value : []);
const getInitials = (name) =>
  (name || 'Your Name')
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* ==========================================================================
   1. MINIMALIST SLATE SIDEBAR (canva-minimal-slate)
   Classic Swiss-minimalist two-column layout: Dark charcoal left sidebar (32%)
   with clean typography, circular profile ring, and timeline markers.
   ========================================================================== */
function MinimalSlateTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', display: 'flex', background: '#FFFFFF', color: '#1E293B', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
      {/* Left Charcoal Sidebar */}
      <aside style={{ width: '33%', background: '#1E293B', color: '#F8FAFC', padding: '44px 26px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 104, height: 104, margin: '0 auto 16px', borderRadius: '50%', border: '3px solid #64748B', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#334155', color: '#F8FAFC', fontSize: 32, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#94A3B8' }}>Contact</h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: '#E2E8F0', overflowWrap: 'anywhere' }}>
            {info.email || 'email@example.com'}<br />
            {info.phone || '(000) 000-0000'}
          </p>
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#94A3B8', borderBottom: '1px solid #334155', paddingBottom: 6, marginBottom: 12 }}>Skills & Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, idx) => (
                <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 10px', background: 'rgba(255,255,255,0.08)', border: '1px solid #475569', borderRadius: 14, color: '#F1F5F9' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#94A3B8', borderBottom: '1px solid #334155', paddingBottom: 6, marginBottom: 12 }}>Languages</h3>
            {languages.map((l, idx) => (
              <div key={l.id || idx} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#94A3B8' }}>{l.percentage || 0}%</span>
                </div>
                <div style={{ height: 4, background: '#334155', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#38BDF8', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <main style={{ flex: 1, padding: '48px 40px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: 30, borderBottom: '2px solid #F1F5F9', paddingBottom: 20 }}>
          <h1 style={{ margin: 0, fontSize: 38, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
          <p style={{ margin: '8px 0 0', fontSize: 15, fontWeight: 500, color: '#475569', letterSpacing: '1px', textTransform: 'uppercase' }}>{info.jobTitle || 'Professional Title'}</p>
        </header>

        {info.summary && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#475569', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Profile</span>
              <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
            </h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#334155' }}>{info.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#475569', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Experience</span>
              <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
            </h2>
            <div style={{ borderLeft: '2px solid #E2E8F0', paddingLeft: 18, marginLeft: 4 }}>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 20, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -24, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#475569', border: '2px solid #FFFFFF' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 15, color: '#0F172A' }}>{exp.role}</strong>
                    <span style={{ fontSize: 12, color: '#64748B' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.55, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Education</span>
              <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
            </h2>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 14, color: '#0F172A' }}>{edu.degree}</strong>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{edu.duration}</span>
                </div>
                <div style={{ fontSize: 13, color: '#475569' }}>{edu.school}</div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Projects</span>
              <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ background: '#F8FAFC', padding: 12, borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <strong style={{ fontSize: 13, color: '#0F172A' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '5px 0 0', fontSize: 11.5, lineHeight: 1.45, color: '#475569' }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   2. EXECUTIVE ROYAL & CLEAN (canva-executive-navy)
   Full-width regal navy header banner (100%), gold accents, 65/35 asymmetric
   body with authoritative executive styling and competencies right rail.
   ========================================================================== */
function ExecutiveNavyTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFFFF', color: '#1E293B', fontFamily: "'Georgia', serif", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 100% Full-Width Regal Navy Header */}
      <header style={{ background: '#0F2744', color: '#FFFFFF', padding: '36px 48px 24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: '1px', color: '#FFFFFF' }}>{info.fullName || 'Your Name'}</h1>
            <p style={{ margin: '8px 0 0', fontSize: 14, letterSpacing: '3px', textTransform: 'uppercase', color: '#93C5FD', fontFamily: "'Inter', sans-serif" }}>{info.jobTitle || 'Executive Title'}</p>
          </div>
          <div style={{ width: 84, height: 84, borderRadius: '50%', border: '3px solid #D4AF37', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#1E3A8A', color: '#FFFFFF', fontSize: 28, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
        </div>
        {/* Gold divider bar */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #D4AF37, transparent)', marginTop: 18, marginBottom: 14 }} />
        {/* Executive contact bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 12, color: '#CBD5E1', fontFamily: "'Inter', sans-serif" }}>
          <span>{info.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{info.phone || '(000) 000-0000'}</span>
        </div>
      </header>

      {/* Asymmetric 2-Column Body */}
      <div style={{ display: 'flex', flex: 1, padding: '36px 44px', gap: 36, boxSizing: 'border-box' }}>
        {/* Left Column (65%) */}
        <div style={{ flex: '1 1 65%' }}>
          {info.summary && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '2px solid #0F2744', paddingBottom: 6, marginBottom: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Executive Profile
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: '#334155' }}>{info.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '2px solid #0F2744', paddingBottom: 6, marginBottom: 16, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Professional Experience
              </h2>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 16, color: '#0F2744' }}>{exp.role}</strong>
                    <span style={{ fontSize: 12, color: '#64748B', fontFamily: "'Inter', sans-serif" }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', margin: '3px 0 6px', fontFamily: "'Inter', sans-serif" }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#475569', fontFamily: "'Inter', sans-serif" }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '2px solid #0F2744', paddingBottom: 6, marginBottom: 14, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Key Initiatives
              </h2>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ marginBottom: 12, borderLeft: '3px solid #0F2744', paddingLeft: 12 }}>
                  <strong style={{ fontSize: 14, color: '#0F2744' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#475569', fontFamily: "'Inter', sans-serif" }}>{p.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Rail (35%) */}
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {educations.length > 0 && (
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: 20, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '1px solid #CBD5E1', paddingBottom: 6, fontFamily: "'Inter', sans-serif" }}>Education</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F2744' }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: '#64748B', fontFamily: "'Inter', sans-serif" }}>{edu.school}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: "'Inter', sans-serif" }}>{edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: 20, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '1px solid #CBD5E1', paddingBottom: 6, fontFamily: "'Inter', sans-serif" }}>Core Competencies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 8px', background: '#DBEAFE', color: '#1E3A8A', borderRadius: 3, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: 20, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#0F2744', borderBottom: '1px solid #CBD5E1', paddingBottom: 6, fontFamily: "'Inter', sans-serif" }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ color: '#334155' }}>{l.name}</span>
                  <span style={{ color: '#0F2744', fontWeight: 600 }}>{l.percentage ? `${l.percentage}%` : 'Proficient'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. MODERN POWDER BLUE (canva-modern-powder)
   Contemporary Nordic / Scandinavian pastel cards layout: Floating rounded
   hero card, 38/62 soft container cards, and calm modern typography.
   ========================================================================== */
function ModernPowderTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#F4F7F9', color: '#1E293B', fontFamily: "'Inter', sans-serif", padding: 32, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Floating Hero Card */}
      <div style={{ background: '#E0EEF4', borderRadius: 16, border: '1px solid #CFE2EB', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 88, height: 88, borderRadius: 18, border: '3px solid #FFFFFF', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#3B82A0', color: '#FFFFFF', fontSize: 30, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: '#1A4D64' }}>{info.fullName || 'Your Name'}</h1>
            <div style={{ display: 'inline-block', marginTop: 6, background: '#3B82A0', color: '#FFFFFF', fontSize: 12, padding: '3px 12px', borderRadius: 20, fontWeight: 600 }}>
              {info.jobTitle || 'Professional Role'}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#2A5D75', lineHeight: 1.8 }}>
          <div>{info.email || 'email@example.com'}</div>
          <div>{info.phone || '(000) 000-0000'}</div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        {/* Left Column (36%) */}
        <div style={{ width: '36%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {info.summary && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 13, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1px' }}>About Me</h3>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#475569' }}>{info.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1px' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 10px', background: '#EAF4F7', color: '#1A4D64', borderRadius: 20, fontWeight: 600 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1px' }}>Education</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1A4D64' }}>{edu.degree}</div>
                  <div style={{ fontSize: 11.5, color: '#64748B' }}>{edu.school}</div>
                  <div style={{ fontSize: 10.5, color: '#94A3B8' }}>{edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1px' }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: '#334155' }}>{l.name}</span>
                    <span style={{ color: '#3B82A0' }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 4, background: '#E2E8F0', borderRadius: 2 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#3B82A0', borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (64%) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experiences.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', flex: 1 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1.5px', borderBottom: '2px solid #EAF4F7', paddingBottom: 6 }}>
                Experience
              </h3>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 18, borderLeft: '3px solid #3B82A0', paddingLeft: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14.5, color: '#1A4D64' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#64748B' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#3B82A0', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.55, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, textTransform: 'uppercase', color: '#3B82A0', letterSpacing: '1.5px', borderBottom: '2px solid #EAF4F7', paddingBottom: 6 }}>
                Featured Projects
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {projects.map((p, idx) => (
                  <div key={p.id || idx} style={{ background: '#F8FBFC', padding: 12, borderRadius: 8, border: '1px solid #EAF4F7' }}>
                    <strong style={{ fontSize: 12.5, color: '#1A4D64' }}>{p.name}</strong>
                    {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#64748B', lineHeight: 1.4 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. EARTHY SAGE & SAND (canva-earthy-sage)
   Warm botanical organic tones: Warm Sage (#30483E) left sidebar, warm sand/ivory
   paper background, Georgia serif headers, and botanical glyph dividers.
   ========================================================================== */
function EarthySageTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', display: 'flex', background: '#FAF8F5', color: '#2C3E35', fontFamily: "'Georgia', serif", boxSizing: 'border-box' }}>
      {/* Left Sage Sidebar (34%) */}
      <aside style={{ width: '34%', background: '#30483E', color: '#F5EFEB', padding: '44px 26px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 100, height: 100, margin: '0 auto 16px', borderRadius: 24, border: '3px solid #E6DED0', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#3E5C50', color: '#F5EFEB', fontSize: 32, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4E2DA', fontFamily: "'Inter', sans-serif" }}>Get in Touch</h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: '#E8F0EC', fontFamily: "'Inter', sans-serif" }}>
            {info.email || 'email@example.com'}<br />
            {info.phone || '(000) 000-0000'}
          </p>
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4E2DA', borderBottom: '1px solid #4B6E60', paddingBottom: 6, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, idx) => (
                <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 10px', background: '#3E5C50', color: '#F5EFEB', borderRadius: 16, fontFamily: "'Inter', sans-serif" }}>
                  ✦ {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4E2DA', borderBottom: '1px solid #4B6E60', paddingBottom: 6, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>Languages</h3>
            {languages.map((l, idx) => (
              <div key={l.id || idx} style={{ marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#D4E2DA' }}>{l.percentage || 0}%</span>
                </div>
                <div style={{ height: 3, background: '#24372F', borderRadius: 2 }}>
                  <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#E6DED0', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Main Paper (66%) */}
      <main style={{ flex: 1, padding: '48px 40px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: 32, borderBottom: '2px solid #E6DED0', paddingBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 700, color: '#23382F' }}>{info.fullName || 'Your Name'}</h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: '#B37A56', fontFamily: "'Inter', sans-serif" }}>{info.jobTitle || 'Creative Title'}</p>
        </header>

        {info.summary && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 14, color: '#30483E', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✦ Biography</span>
              <div style={{ height: 1, flex: 1, background: '#E6DED0' }} />
            </h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#4A5B52' }}>{info.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 14, color: '#30483E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✦ Career Path</span>
              <div style={{ height: 1, flex: 1, background: '#E6DED0' }} />
            </h2>
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} style={{ marginBottom: 20, borderLeft: '2px solid #E6DED0', paddingLeft: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 15, color: '#23382F' }}>{exp.role}</strong>
                  <span style={{ fontSize: 12, color: '#7E8F85', fontFamily: "'Inter', sans-serif" }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: 13, color: '#B37A56', fontWeight: 600, marginTop: 2, fontFamily: "'Inter', sans-serif" }}>{exp.company}</div>
                {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.6, color: '#4A5B52' }}>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {educations.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, color: '#30483E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✦ Education</span>
              <div style={{ height: 1, flex: 1, background: '#E6DED0' }} />
            </h2>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                <strong style={{ fontSize: 13.5, color: '#23382F' }}>{edu.degree}</strong>
                <div style={{ fontSize: 12, color: '#7E8F85' }}>{edu.school} • {edu.duration}</div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 14, color: '#30483E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✦ Selected Works</span>
              <div style={{ height: 1, flex: 1, background: '#E6DED0' }} />
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ background: '#F2EDE4', padding: 12, borderRadius: 6 }}>
                  <strong style={{ fontSize: 13, color: '#23382F' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 11.5, color: '#4A5B52', lineHeight: 1.45 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   5. ACADEMIC PLUM & TECH (canva-academic-plum)
   PURE FULL-WIDTH SINGLE COLUMN CLASSICAL ACADEMIC CV (NO SIDEBAR!).
   Centered formal masthead with double plum rules (#581C3F) and Roman numerals.
   ========================================================================== */
function AcademicPlumTemplate({ data }) {
  const info = data?.personalInfo || {};
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFFFF', color: '#1F2937', fontFamily: "'Georgia', serif", padding: '52px 56px', boxSizing: 'border-box' }}>
      {/* Formal Academic Masthead */}
      <header style={{ textAlign: 'center', borderTop: '4px solid #581C3F', borderBottom: '1px solid #581C3F', paddingTop: 20, paddingBottom: 16, marginBottom: 30 }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '1px', color: '#581C3F' }}>{info.fullName || 'Your Name'}</h1>
        <p style={{ margin: '8px 0 6px', fontSize: 14, fontStyle: 'italic', color: '#4B5563' }}>{info.jobTitle || 'Curriculum Vitae'}</p>
        <div style={{ fontSize: 12, color: '#6B7280', letterSpacing: '0.5px' }}>
          {info.email || 'email@example.com'} &nbsp;◆&nbsp; {info.phone || '(000) 000-0000'}
        </div>
      </header>

      {info.summary && (
        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 10 }}>
            I. Summary & Scholarly Background
          </h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#374151' }}>{info.summary}</p>
        </section>
      )}

      {educations.length > 0 && (
        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 12 }}>
            II. Academic Credentials & Degrees
          </h2>
          {educations.map((edu, idx) => (
            <div key={edu.id || idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <strong style={{ fontSize: 14, color: '#111827' }}>{edu.degree}</strong>
                <div style={{ fontSize: 13, color: '#581C3F', fontStyle: 'italic' }}>{edu.school}</div>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{edu.duration}</div>
            </div>
          ))}
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 14 }}>
            III. Appointments & Professional Experience
          </h2>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 14.5, color: '#111827' }}>{exp.role}</strong>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{exp.duration}</span>
              </div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: '#581C3F', marginBottom: 4 }}>{exp.company}</div>
              {exp.description && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#4B5563' }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 10 }}>
            IV. Areas of Expertise & Technical Competencies
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, idx) => (
              <span key={s.id || idx} style={{ fontSize: 12, padding: '3px 10px', background: '#F8F1F5', border: '1px solid #E5D5DF', color: '#581C3F', borderRadius: 2 }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 12 }}>
            V. Research Projects & Publications
          </h2>
          {projects.map((p, idx) => (
            <div key={p.id || idx} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 13.5, color: '#111827' }}>{p.name}</strong> — <span style={{ fontSize: 12.5, color: '#4B5563' }}>{p.description}</span>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#581C3F', borderBottom: '1px solid #E5D5DF', paddingBottom: 4, marginBottom: 8 }}>
            VI. Language Proficiencies
          </h2>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#4B5563' }}>
            {languages.map((l, idx) => (
              <span key={l.id || idx}>{l.name} ({l.percentage || 100}%)</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ==========================================================================
   6. GEOMETRIC OCHRE & NAVY (canva-geometric-ochre)
   Bauhaus Modernist layout: 16px thick Ochre left ribbon (#C68A2C), sharp square
   avatar frame (0px radius), deep navy block header, and numbered index sections.
   ========================================================================== */
function GeometricOchreTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', display: 'flex', background: '#FFFFFF', color: '#0F172A', fontFamily: "'Inter', sans-serif", borderLeft: '16px solid #C68A2C', boxSizing: 'border-box' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navy Geometric Header Block */}
        <header style={{ background: '#0E1A29', color: '#FFFFFF', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#C68A2C', color: '#0E1A29', fontSize: 11, fontWeight: 800, padding: '2px 8px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
              {info.jobTitle || 'Specialist'}
            </div>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, letterSpacing: '-0.5px', color: '#FFFFFF' }}>{info.fullName || 'Your Name'}</h1>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: '#94A3B8' }}>
              <span>{info.email || 'email@example.com'}</span>
              <span>/</span>
              <span>{info.phone || '(000) 000-0000'}</span>
            </div>
          </div>
          {/* Sharp Square Avatar (0px radius) */}
          <div style={{ width: 90, height: 90, border: '3px solid #C68A2C', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#1E293B', color: '#FFFFFF', fontSize: 30, fontWeight: 800, flexShrink: 0 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
        </header>

        {/* Body 2-Column Split */}
        <div style={{ display: 'flex', flex: 1, padding: '36px 40px', gap: 36 }}>
          {/* Main Area (65%) */}
          <div style={{ flex: '1 1 65%' }}>
            {info.summary && (
              <section style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ background: '#0E1A29', color: '#FFFFFF', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>01</span>
                  <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Profile</h2>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#334155' }}>{info.summary}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ background: '#0E1A29', color: '#FFFFFF', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>02</span>
                  <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Work Experience</h2>
                </div>
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} style={{ marginBottom: 20, borderBottom: '1px solid #E2E8F0', paddingBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: 15, color: '#0E1A29' }}>{exp.role}</strong>
                      <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{exp.duration}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#C68A2C', fontWeight: 700, margin: '3px 0 6px' }}>{exp.company}</div>
                    {exp.description && <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#475569' }}>{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#0E1A29', color: '#FFFFFF', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>03</span>
                  <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Key Projects</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {projects.map((p, idx) => (
                    <div key={p.id || idx} style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: 12 }}>
                      <strong style={{ fontSize: 13, color: '#0E1A29' }}>{p.name}</strong>
                      {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#64748B' }}>{p.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Rail (35%) */}
          <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {skills.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#C68A2C', color: '#0E1A29', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>04</span>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Skills Matrix</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {skills.map((s, idx) => (
                    <div key={s.id || idx} style={{ fontSize: 11, padding: '6px 8px', border: '1px solid #0E1A29', textAlign: 'center', fontWeight: 700, color: '#0E1A29' }}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#C68A2C', color: '#0E1A29', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>05</span>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Education</h3>
                </div>
                {educations.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ marginBottom: 12, borderLeft: '3px solid #C68A2C', paddingLeft: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A29' }}>{edu.degree}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{edu.school}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8' }}>{edu.duration}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#C68A2C', color: '#0E1A29', fontSize: 11, fontWeight: 800, padding: '2px 6px' }}>06</span>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0E1A29' }}>Languages</h3>
                </div>
                {languages.map((l, idx) => (
                  <div key={l.id || idx} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600 }}>
                      <span>{l.name}</span>
                      <span>{l.percentage || 0}%</span>
                    </div>
                    <div style={{ height: 4, background: '#E2E8F0', marginTop: 3 }}>
                      <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#0E1A29' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   7. CONTEMPORARY NAVY ARCH (canva-arch-navy)
   Modern Architectural curves: Arch silhouette sidebar with custom curved base
   (borderRadius: '0 0 110px 0') and architectural window arch avatar frame.
   ========================================================================== */
function ArchNavyTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', display: 'flex', background: '#FFFFFF', color: '#102A43', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
      {/* Arch-curved Navy Sidebar (33%) */}
      <aside style={{ width: '33%', background: '#102A43', color: '#D9E2EC', padding: '44px 26px', borderRadius: '0 0 110px 0', display: 'flex', flexDirection: 'column', gap: 26, boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center' }}>
          {/* Architectural Arch Window Portal */}
          <div style={{ width: 96, height: 116, margin: '0 auto 16px', borderRadius: '48px 48px 8px 8px', border: '3px solid #627D98', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#243B53', color: '#FFFFFF', fontSize: 32, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#9FB3C8' }}>Details</h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: '#D9E2EC', overflowWrap: 'anywhere' }}>
            {info.email || 'email@example.com'}<br />
            {info.phone || '(000) 000-0000'}
          </p>
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#9FB3C8', borderBottom: '1px solid #334E68', paddingBottom: 6, marginBottom: 12 }}>Capabilities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, idx) => (
                <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 10px', background: '#243B53', color: '#F0F4F8', borderRadius: '12px 12px 4px 4px' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#9FB3C8', borderBottom: '1px solid #334E68', paddingBottom: 6, marginBottom: 12 }}>Languages</h3>
            {languages.map((l, idx) => (
              <div key={l.id || idx} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#9FB3C8' }}>{l.percentage || 0}%</span>
                </div>
                <div style={{ height: 4, background: '#243B53', borderRadius: 2 }}>
                  <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#627D98', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area (67%) */}
      <main style={{ flex: 1, padding: '48px 40px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: 32, borderBottom: '2px solid #D9E2EC', paddingBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 38, fontWeight: 800, color: '#102A43', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#627D98', fontWeight: 600 }}>{info.jobTitle || 'Architectural Designer'}</p>
        </header>

        {info.summary && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#102A43', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#F0F4F8', padding: '3px 8px', borderRadius: '6px 6px 0 0' }}>Profile</span>
              <div style={{ height: 1, flex: 1, background: '#D9E2EC' }} />
            </h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#334E68' }}>{info.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#102A43', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#F0F4F8', padding: '3px 8px', borderRadius: '6px 6px 0 0' }}>Experience</span>
              <div style={{ height: 1, flex: 1, background: '#D9E2EC' }} />
            </h2>
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} style={{ marginBottom: 18, borderLeft: '3px solid #627D98', paddingLeft: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 15, color: '#102A43' }}>{exp.role}</strong>
                  <span style={{ fontSize: 12, color: '#627D98' }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: 13, color: '#334E68', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.55, color: '#486581' }}>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {educations.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#102A43', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#F0F4F8', padding: '3px 8px', borderRadius: '6px 6px 0 0' }}>Education</span>
              <div style={{ height: 1, flex: 1, background: '#D9E2EC' }} />
            </h2>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                <strong style={{ fontSize: 13.5, color: '#102A43' }}>{edu.degree}</strong>
                <div style={{ fontSize: 12, color: '#627D98' }}>{edu.school} • {edu.duration}</div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#102A43', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#F0F4F8', padding: '3px 8px', borderRadius: '6px 6px 0 0' }}>Projects</span>
              <div style={{ height: 1, flex: 1, background: '#D9E2EC' }} />
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ background: '#F0F4F8', padding: 12, borderRadius: '12px 12px 4px 4px' }}>
                  <strong style={{ fontSize: 12.5, color: '#102A43' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#486581', lineHeight: 1.45 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   8. HAUTE EDITORIAL CHIC (canva-editorial-chic)
   High-Fashion Magazine / Vogue editorial spread: Warm linen cream background
   (#FAF8F5), double horizontal hairline rules, large centered serif masthead,
   and 2-column balanced spread with a delicate 1px hairline center divider.
   ========================================================================== */
function EditorialChicTemplate({ data }) {
  const info = data?.personalInfo || {};
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FAF8F5', color: '#171717', fontFamily: "'Georgia', serif", padding: '48px 52px', boxSizing: 'border-box' }}>
      {/* High-Fashion Centered Masthead */}
      <header style={{ textAlign: 'center', borderTop: '1px solid #171717', borderBottom: '1px solid #171717', padding: '24px 0', marginBottom: 36 }}>
        <p style={{ margin: '0 0 8px', fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: '#737373', fontFamily: "'Inter', sans-serif" }}>
          CURRICULUM VITAE • VOLUME 2026
        </p>
        <h1 style={{ margin: 0, fontSize: 38, fontWeight: 400, letterSpacing: '6px', textTransform: 'uppercase', color: '#171717' }}>
          {info.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '10px 0 0', fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase', fontStyle: 'italic', color: '#525252' }}>
          {info.jobTitle || 'Creative Director'}
        </p>
        <div style={{ fontSize: 11.5, color: '#737373', letterSpacing: '1px', marginTop: 12, fontFamily: "'Inter', sans-serif" }}>
          {info.email || 'email@example.com'} &nbsp;—&nbsp; {info.phone || '(000) 000-0000'}
        </div>
      </header>

      {/* 2-Column Editorial Spread */}
      <div style={{ display: 'flex', gap: 36 }}>
        {/* Left Column (42%) */}
        <div style={{ width: '42%', borderRight: '1px solid #E5E5E5', paddingRight: 32 }}>
          {info.summary && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 12 }}>
                Statement
              </h2>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.8, color: '#404040', fontStyle: 'italic' }}>
                "{info.summary}"
              </p>
            </section>
          )}

          {educations.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 12 }}>
                Education
              </h2>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: '#737373', fontStyle: 'italic' }}>{edu.school}, {edu.duration}</div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 12 }}>
                Index of Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, fontStyle: 'italic', color: '#404040', padding: '3px 8px', border: '1px solid #D4D4D4' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 10 }}>
                Languages
              </h2>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ fontSize: 12, color: '#525252', marginBottom: 4 }}>
                  {l.name} — <span style={{ fontStyle: 'italic' }}>{l.percentage || 100}% proficiency</span>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column (58%) */}
        <div style={{ flex: 1 }}>
          {experiences.length > 0 && (
            <section style={{ marginBottom: 30 }}>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 16 }}>
                Career Retrospective
              </h2>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 15, color: '#171717' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#737373', fontStyle: 'italic' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, fontStyle: 'italic', color: '#525252', margin: '2px 0 6px' }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: '#404040' }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', color: '#171717', borderBottom: '1px solid #171717', paddingBottom: 4, marginBottom: 14 }}>
                Selected Exhibitions & Works
              </h2>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ marginBottom: 12 }}>
                  <strong style={{ fontSize: 13.5, color: '#171717' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#525252', lineHeight: 1.5 }}>{p.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   9. CREATIVE STUDIO CORAL (canva-creative-coral)
   Playful, energetic creative portfolio: Asymmetric coral gradient header card,
   bouncy rounded pills, candy progress bars, and rounded 2-column project cards.
   ========================================================================== */
function CreativeCoralTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFDFD', color: '#1E293B', fontFamily: "'Inter', sans-serif", padding: 32, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Radiant Gradient Coral Header */}
      <header style={{ background: 'linear-gradient(135deg, #FF5745, #FF765C)', borderRadius: 24, padding: '28px 36px', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', border: '4px solid #FFFFFF', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#FF8A78', color: '#FFFFFF', fontSize: 32, fontWeight: 800 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', color: '#FFFFFF', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 6 }}>
              ✦ AVAILABLE FOR COLLABORATION
            </div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, color: '#FFFFFF' }}>{info.fullName || 'Your Name'}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#FFE8E4', fontWeight: 600 }}>{info.jobTitle || 'Creative Technologist'}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#FFE8E4', lineHeight: 1.8 }}>
          <div>{info.email || 'email@example.com'}</div>
          <div>{info.phone || '(000) 000-0000'}</div>
        </div>
      </header>

      {/* Two Column Grid */}
      <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        {/* Left Column (38%) */}
        <div style={{ width: '38%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {info.summary && (
            <div style={{ background: '#FFF5F3', borderRadius: 18, padding: 20, border: '1.5px solid #FFD9D4' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 13, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800 }}>About</h3>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#475569' }}>{info.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ background: '#FFF5F3', borderRadius: 18, padding: 20, border: '1.5px solid #FFD9D4' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800 }}>Superpowers</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '5px 12px', background: '#FF5745', color: '#FFFFFF', borderRadius: 20, fontWeight: 700 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ background: '#FFF5F3', borderRadius: 18, padding: 20, border: '1.5px solid #FFD9D4' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800 }}>Education</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{edu.degree}</div>
                  <div style={{ fontSize: 11.5, color: '#64748B' }}>{edu.school} • {edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ background: '#FFF5F3', borderRadius: 18, padding: 20, border: '1.5px solid #FFD9D4' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800 }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, marginBottom: 3 }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#FF5745' }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 6, background: '#FFD9D4', borderRadius: 3 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#FF5745', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (62%) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experiences.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 18, padding: 24, border: '1.5px solid #FFD9D4', flex: 1 }}>
              <h3 style={{ margin: '0 0 18px', fontSize: 14, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800, borderBottom: '2px solid #FFF5F3', paddingBottom: 6 }}>
                Work History
              </h3>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 18, paddingLeft: 14, borderLeft: '3px solid #FF5745' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 15, color: '#1E293B' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#FF5745', fontWeight: 700 }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.55, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 18, padding: 20, border: '1.5px solid #FFD9D4' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, textTransform: 'uppercase', color: '#FF5745', fontWeight: 800 }}>
                Playground / Projects
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {projects.map((p, idx) => (
                  <div key={p.id || idx} style={{ background: '#FFF5F3', padding: 12, borderRadius: 12, border: '1px solid #FFD9D4' }}>
                    <strong style={{ fontSize: 12.5, color: '#FF5745' }}>{p.name}</strong>
                    {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#475569', lineHeight: 1.4 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   10. CLEAN CORPORATE ATS (canva-corporate-clean)
   The Fortune-500 standard ATS format: Clean top header with right-aligned tabular
   contact details, solid 2.5px Corporate Navy bar (#1E3A8A), and clean sections.
   ========================================================================== */
function CorporateCleanTemplate({ data }) {
  const info = data?.personalInfo || {};
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFFFF', color: '#1E293B', fontFamily: "'Inter', sans-serif", padding: '48px 52px', boxSizing: 'border-box' }}>
      {/* Corporate Header */}
      <header style={{ borderBottom: '2.5px solid #1E3A8A', paddingBottom: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
          <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, color: '#475569' }}>{info.jobTitle || 'Corporate Professional'}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
          <div>{info.email || 'email@example.com'}</div>
          <div>{info.phone || '(000) 000-0000'}</div>
        </div>
      </header>

      {info.summary && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 8 }}>
            Executive Summary
          </h2>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#334155' }}>{info.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 12 }}>
            Professional Experience
          </h2>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 14, color: '#0F172A' }}>{exp.role}</strong>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{exp.duration}</span>
              </div>
              <div style={{ fontSize: 12.5, color: '#1E3A8A', fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
              {exp.description && <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#475569' }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {educations.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 10 }}>
            Education
          </h2>
          {educations.map((edu, idx) => (
            <div key={edu.id || idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <strong style={{ fontSize: 13.5, color: '#0F172A' }}>{edu.degree}</strong>
                <div style={{ fontSize: 12, color: '#475569' }}>{edu.school}</div>
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{edu.duration}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 8 }}>
            Core Competencies & Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, idx) => (
              <span key={s.id || idx} style={{ fontSize: 11.5, padding: '3px 8px', background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#1E293B', borderRadius: 2 }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 10 }}>
            Notable Projects
          </h2>
          {projects.map((p, idx) => (
            <div key={p.id || idx} style={{ marginBottom: 8 }}>
              <strong style={{ fontSize: 13, color: '#0F172A' }}>{p.name}</strong> — <span style={{ fontSize: 12, color: '#475569' }}>{p.description}</span>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: 4, marginBottom: 8 }}>
            Languages
          </h2>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#475569' }}>
            {languages.map((l, idx) => (
              <span key={l.id || idx}>{l.name} ({l.percentage || 100}%)</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ==========================================================================
   11. MONOCHROME GOLD (canva-monochrome-gold)
   Ultra-Luxury Midnight Black & Champagne Gold: Full-width black top banner
   (#121212), gold hairline borders (#D4AF37), and right-hand dark luxury sidebar.
   ========================================================================== */
function MonochromeGoldTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FCFBF8', color: '#1F2937', fontFamily: "'Georgia', serif", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Midnight Black Top Banner */}
      <header style={{ background: '#121212', color: '#FFFFFF', padding: '34px 44px 22px', borderBottom: '2px solid #C5A059' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 36, letterSpacing: '2px', color: '#D4AF37', fontWeight: 400 }}>{info.fullName || 'Your Name'}</h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, letterSpacing: '4px', textTransform: 'uppercase', color: '#E8DCB8', fontFamily: "'Inter', sans-serif" }}>{info.jobTitle || 'Managing Director'}</p>
          </div>
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #D4AF37', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#222222', color: '#D4AF37', fontSize: 28 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#A3A3A3', marginTop: 14, fontFamily: "'Inter', sans-serif" }}>
          <span>{info.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{info.phone || '(000) 000-0000'}</span>
        </div>
      </header>

      {/* Main Split: Left Content (66%) + Right Luxury Dark Sidebar (34%) */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Main (66%) */}
        <div style={{ flex: '1 1 66%', padding: '36px 36px', boxSizing: 'border-box' }}>
          {info.summary && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A7332', borderBottom: '1px solid #E5D5BA', paddingBottom: 4, marginBottom: 10 }}>
                Executive Overview
              </h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#374151' }}>{info.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A7332', borderBottom: '1px solid #E5D5BA', paddingBottom: 4, marginBottom: 14 }}>
                Career History
              </h2>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 15, color: '#111827' }}>{exp.role}</strong>
                    <span style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#9A7332', fontStyle: 'italic', margin: '2px 0 6px' }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A7332', borderBottom: '1px solid #E5D5BA', paddingBottom: 4, marginBottom: 12 }}>
                Portfolio & Engagements
              </h2>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: 13.5, color: '#111827' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>{p.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Dark Luxury Sidebar (34%) */}
        <aside style={{ width: '34%', background: '#191919', color: '#E5E5E5', padding: '36px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {skills.length > 0 && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4AF37', borderBottom: '1px solid #333333', paddingBottom: 6 }}>Expertise</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 8px', border: '1px solid #9A7332', color: '#F3E5AB', borderRadius: 2, fontFamily: "'Inter', sans-serif" }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4AF37', borderBottom: '1px solid #333333', paddingBottom: 6 }}>Credentials</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: '#A3A3A3', fontStyle: 'italic' }}>{edu.school}</div>
                  <div style={{ fontSize: 11, color: '#737373', fontFamily: "'Inter', sans-serif" }}>{edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#D4AF37', borderBottom: '1px solid #333333', paddingBottom: 6 }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#D4AF37' }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 3, background: '#333333' }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#D4AF37' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ==========================================================================
   12. STUDIO INDIGO (canva-studio-indigo)
   Modern Developer / Tech Lead / Product Studio Dashboard: Terminal style
   header bar, deep indigo code rail (32%), modular job cards & tech stack pills.
   ========================================================================== */
function StudioIndigoTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFFFF', color: '#1E1B4B', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Tech Top Accent Bar */}
      <div style={{ height: 8, background: '#4F46E5', width: '100%' }} />

      {/* Terminal Title Bar */}
      <div style={{ background: '#312E81', color: '#E0E7FF', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          <span style={{ marginLeft: 8, color: '#A5B4FC' }}>terminal://profile.tsx</span>
        </div>
        <div style={{ color: '#86EFAC' }}>● STATUS: OPEN_TO_WORK</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Tech Rail (32%) */}
        <aside style={{ width: '32%', background: '#1E1B4B', color: '#E0E7FF', padding: '36px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 92, height: 92, margin: '0 auto 16px', borderRadius: 18, border: '2px solid #818CF8', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#312E81', color: '#FFFFFF', fontSize: 30, fontWeight: 800 }}>
              {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#A5B4FC', fontFamily: 'monospace' }}>// contact</h3>
            <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.8, color: '#C7D2FE', overflowWrap: 'anywhere' }}>
              {info.email || 'email@example.com'}<br />
              {info.phone || '(000) 000-0000'}
            </p>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#A5B4FC', borderBottom: '1px solid #3730A3', paddingBottom: 6, marginBottom: 12, fontFamily: 'monospace' }}>// tech_stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '3px 8px', background: '#312E81', border: '1px solid #4F46E5', color: '#EEF2FF', borderRadius: 4, fontFamily: 'monospace' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#A5B4FC', borderBottom: '1px solid #3730A3', paddingBottom: 6, marginBottom: 12, fontFamily: 'monospace' }}>// languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8, fontSize: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#818CF8' }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 4, background: '#312E81', borderRadius: 2 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#818CF8', borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Main Work Stream (68%) */}
        <main style={{ flex: 1, padding: '40px 36px', boxSizing: 'border-box' }}>
          <header style={{ marginBottom: 28 }}>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
            <div style={{ display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 700, marginTop: 6, fontFamily: 'monospace' }}>
              &gt; {info.jobTitle || 'Full Stack Engineer'}
            </div>
          </header>

          {info.summary && (
            <section style={{ marginBottom: 24 }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E0E7FF', padding: 14, borderRadius: 8 }}>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#334155' }}>{info.summary}</p>
              </div>
            </section>
          )}

          {experiences.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4F46E5', marginBottom: 12, fontWeight: 800 }}>
                Experience Stream
              </h2>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ border: '1px solid #E0E7FF', borderRadius: 8, padding: 14, marginBottom: 12, background: '#FFFFFF', boxShadow: '0 1px 4px rgba(79,70,229,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14.5, color: '#1E1B4B' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#4F46E5', fontWeight: 600, fontFamily: 'monospace' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#6366F1', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.5, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {educations.length > 0 && (
            <section style={{ marginBottom: 22 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4F46E5', marginBottom: 10, fontWeight: 800 }}>
                Education
              </h2>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 8, fontSize: 12.5 }}>
                  <strong style={{ color: '#1E1B4B' }}>{edu.degree}</strong> &nbsp;—&nbsp; <span style={{ color: '#64748B' }}>{edu.school} ({edu.duration})</span>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4F46E5', marginBottom: 10, fontWeight: 800 }}>
                Shipped Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {projects.map((p, idx) => (
                  <div key={p.id || idx} style={{ background: '#EEF2FF', padding: 12, borderRadius: 8, border: '1px solid #C7D2FE' }}>
                    <strong style={{ fontSize: 12.5, color: '#312E81' }}>{p.name}</strong>
                    {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#475569', lineHeight: 1.4 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

/* ==========================================================================
   13. CYBER EMERALD TECH & ENGINEERING (canva-cyber-emerald)
   Fintech / Cloud / Cybersecurity aesthetic: Matrix emerald sidebar (#042F2C),
   glowing mint node indicators (#10B981), and terminal status header.
   ========================================================================== */
function CyberEmeraldTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', display: 'flex', background: '#FFFFFF', color: '#0F172A', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
      {/* Left Deep Emerald Sidebar (34%) */}
      <aside style={{ width: '34%', background: '#042F2C', color: '#ECFDF5', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 96, height: 96, margin: '0 auto 16px', borderRadius: 20, border: '3px solid #10B981', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#064E3B', color: '#10B981', fontSize: 32, fontWeight: 800 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <div style={{ display: 'inline-block', background: '#064E3B', color: '#34D399', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 12, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>
            ● SECURE PROTOCOL
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#6EE7B7' }}>Transmission</h3>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.8, color: '#A7F3D0', overflowWrap: 'anywhere' }}>
            {info.email || 'email@example.com'}<br />
            {info.phone || '(000) 000-0000'}
          </p>
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#6EE7B7', borderBottom: '1px solid #065F46', paddingBottom: 6, marginBottom: 12 }}>Tech Capabilities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, idx) => (
                <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 9px', background: '#064E3B', border: '1px solid #10B981', color: '#ECFDF5', borderRadius: 4 }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#6EE7B7', borderBottom: '1px solid #065F46', paddingBottom: 6, marginBottom: 12 }}>Language Matrix</h3>
            {languages.map((l, idx) => (
              <div key={l.id || idx} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#34D399' }}>{l.percentage || 0}%</span>
                </div>
                <div style={{ height: 4, background: '#064E3B', borderRadius: 2 }}>
                  <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#10B981', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Main Content (66%) */}
      <main style={{ flex: 1, padding: '44px 38px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: 30, borderBottom: '2px solid #D1FAE5', paddingBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#042F2C', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
          <div style={{ display: 'inline-block', background: '#ECFDF5', color: '#065F46', padding: '3px 10px', borderRadius: 6, fontSize: 13, fontWeight: 700, marginTop: 6 }}>
            {info.jobTitle || 'Lead Systems Architect'}
          </div>
        </header>

        {info.summary && (
          <section style={{ marginBottom: 26 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#042F2C', marginBottom: 8, fontWeight: 800 }}>
              System Overview
            </h2>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: '#334155' }}>{info.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section style={{ marginBottom: 26 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#042F2C', marginBottom: 14, fontWeight: 800 }}>
              Deployment History
            </h2>
            <div style={{ borderLeft: '2px solid #A7F3D0', paddingLeft: 16, marginLeft: 4 }}>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 18, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -22, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#10B981', border: '2px solid #FFFFFF' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14.5, color: '#042F2C' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#059669', fontWeight: 600 }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#047857', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '5px 0 0', fontSize: 12, lineHeight: 1.5, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#042F2C', marginBottom: 10, fontWeight: 800 }}>
              Credentials
            </h2>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 8, fontSize: 12.5 }}>
                <strong style={{ color: '#042F2C' }}>{edu.degree}</strong> &nbsp;—&nbsp; <span style={{ color: '#64748B' }}>{edu.school} ({edu.duration})</span>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#042F2C', marginBottom: 10, fontWeight: 800 }}>
              Shipped Systems
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: 12, borderRadius: 6 }}>
                  <strong style={{ fontSize: 12.5, color: '#065F46' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#475569', lineHeight: 1.4 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   14. SWISS INTERNATIONAL TYPOGRAPHIC (canva-swiss-international)
   Strict modernist Swiss Style: Bold Swiss Red (#DC2626) header block, stark black
   grid rules, and asymmetrical 30/70 metadata-content tabular layout.
   ========================================================================== */
function SwissInternationalTemplate({ data }) {
  const info = data?.personalInfo || {};
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFFFF', color: '#0A0A0A', fontFamily: "'Inter', Arial, sans-serif", padding: '44px 48px', boxSizing: 'border-box' }}>
      {/* Swiss Red Signature Masthead */}
      <header style={{ marginBottom: 32 }}>
        <div style={{ background: '#DC2626', color: '#FFFFFF', padding: '24px 28px', marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 900, letterSpacing: '-1.5px', textTransform: 'uppercase', lineHeight: 1 }}>
            {info.fullName || 'Your Name'}
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#FEF2F2' }}>
            {info.jobTitle || 'Design Technologist'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#52525B', borderBottom: '2px solid #000000', paddingBottom: 8 }}>
          <span>{info.email || 'email@example.com'}</span>
          <span>{info.phone || '(000) 000-0000'}</span>
          <span>SWISS GRID // 2026</span>
        </div>
      </header>

      {info.summary && (
        <section style={{ display: 'flex', marginBottom: 28, borderBottom: '1px solid #E4E4E7', paddingBottom: 18 }}>
          <div style={{ width: '30%', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626' }}>
            [ 01 ] SUMMARY
          </div>
          <div style={{ width: '70%', fontSize: 13, lineHeight: 1.65, color: '#27272A', fontWeight: 500 }}>
            {info.summary}
          </div>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ display: 'flex', marginBottom: 28, borderBottom: '1px solid #E4E4E7', paddingBottom: 18 }}>
          <div style={{ width: '30%', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626' }}>
            [ 02 ] CAREER
          </div>
          <div style={{ width: '70%' }}>
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 15, fontWeight: 800, color: '#0A0A0A' }}>{exp.role}</strong>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#DC2626' }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#52525B', marginTop: 2 }}>{exp.company}</div>
                {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.55, color: '#3F3F46' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {educations.length > 0 && (
        <section style={{ display: 'flex', marginBottom: 28, borderBottom: '1px solid #E4E4E7', paddingBottom: 18 }}>
          <div style={{ width: '30%', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626' }}>
            [ 03 ] EDUCATION
          </div>
          <div style={{ width: '70%' }}>
            {educations.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                <strong style={{ fontSize: 13.5, fontWeight: 800 }}>{edu.degree}</strong>
                <div style={{ fontSize: 12, color: '#52525B' }}>{edu.school} • {edu.duration}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ display: 'flex', marginBottom: 28, borderBottom: '1px solid #E4E4E7', paddingBottom: 18 }}>
          <div style={{ width: '30%', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626' }}>
            [ 04 ] EXPERTISE
          </div>
          <div style={{ width: '70%', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, idx) => (
              <span key={s.id || idx} style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 10px', background: '#0A0A0A', color: '#FFFFFF' }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ display: 'flex' }}>
          <div style={{ width: '30%', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626' }}>
            [ 05 ] PROJECTS
          </div>
          <div style={{ width: '70%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {projects.map((p, idx) => (
              <div key={p.id || idx} style={{ border: '1.5px solid #000000', padding: 10 }}>
                <strong style={{ fontSize: 12.5, fontWeight: 800 }}>{p.name}</strong>
                {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#52525B', lineHeight: 1.4 }}>{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ==========================================================================
   15. NORDIC MINIMALIST FROST (canva-nordic-frost)
   Airy Scandinavian negative space, ice-tinted accents (#E0F2FE), subtle dot
   leaders between roles and dates, and clean balanced 40/60 structure.
   ========================================================================== */
function NordicFrostTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#F8FAFC', color: '#334155', fontFamily: "'Inter', sans-serif", padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Floating Nordic Ice Header */}
      <header style={{ background: '#FFFFFF', borderRadius: 16, padding: '24px 32px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E0F2FE', border: '2px solid #BAE6FD', display: 'grid', placeItems: 'center', color: '#0284C7', fontSize: 28, fontWeight: 700 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : initials}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>{info.fullName || 'Your Name'}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#0284C7', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{info.jobTitle || 'Product Strategist'}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#64748B', lineHeight: 1.8 }}>
          <div>{info.email || 'email@example.com'}</div>
          <div>{info.phone || '(000) 000-0000'}</div>
        </div>
      </header>

      {/* Two Column Nordic Grid */}
      <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        {/* Left Column (36%) */}
        <div style={{ width: '36%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {info.summary && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700 }}>Perspective</h3>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#475569' }}>{info.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700 }}>Core Toolkit</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '4px 10px', background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', borderRadius: 20, fontWeight: 500 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700 }}>Education</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>{edu.degree}</div>
                  <div style={{ fontSize: 11.5, color: '#64748B' }}>{edu.school} • {edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700 }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#0284C7' }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2 }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#0284C7', borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (64%) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experiences.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', flex: 1 }}>
              <h3 style={{ margin: '0 0 18px', fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700, borderBottom: '1px solid #F1F5F9', paddingBottom: 8 }}>
                Experience Path
              </h3>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 14.5, color: '#0F172A' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#94A3B8' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#0284C7', fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.6, color: '#475569' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7', fontWeight: 700 }}>
                Selected Projects
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {projects.map((p, idx) => (
                  <div key={p.id || idx} style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <strong style={{ fontSize: 12.5, color: '#0F172A' }}>{p.name}</strong>
                    {p.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#64748B', lineHeight: 1.45 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   16. VINTAGE TYPEWRITER & JOURNALISM (canva-vintage-typewriter)
   Literary / Journalism typewriter aesthetic: Warm aged parchment (#FAF7F0),
   authentic Courier monospace, typewriter sluglines, and dashed border boxes.
   ========================================================================== */
function VintageTypewriterTemplate({ data }) {
  const info = data?.personalInfo || {};
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FAF7F0', color: '#2B2621', fontFamily: "'Courier New', Courier, monospace", padding: '48px 52px', boxSizing: 'border-box' }}>
      {/* Typewriter Box Header */}
      <header style={{ border: '2px dashed #8C7E72', padding: '20px 24px', marginBottom: 28, textAlign: 'center', background: '#F5EFE3' }}>
        <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#8B3A2B', marginBottom: 6 }}>
          [ OFFICIAL CURRICULUM DOSSIER ]
        </div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2B2621' }}>
          {info.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '6px 0 8px', fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase', color: '#6E6258' }}>
          {info.jobTitle || 'Staff Correspondent / Author'}
        </p>
        <div style={{ fontSize: 11.5, color: '#6E6258', borderTop: '1px solid #D5CABB', paddingTop: 8 }}>
          LOC: {info.email || 'email@example.com'} &nbsp;|&nbsp; TEL: {info.phone || '(000) 000-0000'}
        </div>
      </header>

      {info.summary && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#8B3A2B', borderBottom: '1px dashed #8C7E72', paddingBottom: 4, marginBottom: 8 }}>
            // 01. INTRODUCTORY STATEMENT //
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#3A332C' }}>{info.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#8B3A2B', borderBottom: '1px dashed #8C7E72', paddingBottom: 4, marginBottom: 12 }}>
            // 02. RECORD OF EMPLOYMENT //
          </div>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 13.5, color: '#2B2621' }}>&gt; {exp.role}</strong>
                <span style={{ fontSize: 11.5, color: '#8B3A2B' }}>[{exp.duration}]</span>
              </div>
              <div style={{ fontSize: 12, color: '#6E6258', margin: '2px 0 4px' }}>POSTED AT: {exp.company}</div>
              {exp.description && <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: '#4A4139' }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {educations.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#8B3A2B', borderBottom: '1px dashed #8C7E72', paddingBottom: 4, marginBottom: 10 }}>
            // 03. ACADEMIC CREDENTIALS //
          </div>
          {educations.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: 8, fontSize: 12.5 }}>
              <strong>* {edu.degree}</strong>, {edu.school} ({edu.duration})
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#8B3A2B', borderBottom: '1px dashed #8C7E72', paddingBottom: 4, marginBottom: 8 }}>
            // 04. OPERATIONAL EXPERTISE //
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, idx) => (
              <span key={s.id || idx} style={{ fontSize: 11.5, border: '1px solid #8C7E72', padding: '2px 8px', background: '#F5EFE3' }}>
                [{s.name}]
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#8B3A2B', borderBottom: '1px dashed #8C7E72', paddingBottom: 4, marginBottom: 10 }}>
            // 05. PUBLISHED DISPATCHES //
          </div>
          {projects.map((p, idx) => (
            <div key={p.id || idx} style={{ marginBottom: 8, fontSize: 12 }}>
              <strong>&bull; {p.name}</strong> — {p.description}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

/* ==========================================================================
   17. TOKYO NEO-BRUTALIST (canva-tokyo-neon)
   Radical Neo-Brutalism: Bold 2.5px solid black borders, hard 4px offset box
   shadows, vibrant canary yellow (#FACC15) & electric violet (#7C3AED) stickers.
   ========================================================================== */
function TokyoNeonTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFBEB', color: '#000000', fontFamily: "'Inter', sans-serif", padding: 32, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Neo-Brutalist Sticker Header */}
      <header style={{ background: '#FEF08A', border: '3px solid #000000', boxShadow: '5px 5px 0px #000000', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 84, height: 84, border: '3px solid #000000', boxShadow: '3px 3px 0px #000000', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#7C3AED', color: '#FFFFFF', fontSize: 32, fontWeight: 900 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <div>
            <div style={{ display: 'inline-block', background: '#7C3AED', color: '#FFFFFF', fontSize: 11, fontWeight: 900, padding: '3px 8px', border: '2px solid #000000', boxShadow: '2px 2px 0px #000000', textTransform: 'uppercase', marginBottom: 6 }}>
              ★ NEXT-GEN CREATIVE
            </div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: '-1px', textTransform: 'uppercase' }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#4B5563' }}>
              {info.jobTitle || 'Motion & Web3 Designer'}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11.5, fontWeight: 700, lineHeight: 1.8 }}>
          <div>{info.email || 'email@example.com'}</div>
          <div>{info.phone || '(000) 000-0000'}</div>
        </div>
      </header>

      {/* Two Column Neo-Brutalist Grid */}
      <div style={{ display: 'flex', gap: 18, flex: 1 }}>
        {/* Left Column (36%) */}
        <div style={{ width: '36%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {info.summary && (
            <div style={{ background: '#FFFFFF', border: '2.5px solid #000000', boxShadow: '4px 4px 0px #000000', padding: 18 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', background: '#FACC15', padding: '2px 6px', display: 'inline-block', border: '1.5px solid #000' }}>
                Manifesto
              </h3>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, fontWeight: 500 }}>{info.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ background: '#FFFFFF', border: '2.5px solid #000000', boxShadow: '4px 4px 0px #000000', padding: 18 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', background: '#7C3AED', color: '#fff', padding: '2px 6px', display: 'inline-block', border: '1.5px solid #000' }}>
                Skills Arsenal
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', background: '#FEF08A', border: '1.5px solid #000000', boxShadow: '2px 2px 0px #000000' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ background: '#FFFFFF', border: '2.5px solid #000000', boxShadow: '4px 4px 0px #000000', padding: 18 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', background: '#FACC15', padding: '2px 6px', display: 'inline-block', border: '1.5px solid #000' }}>
                Education
              </h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800 }}>{edu.degree}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>{edu.school} • {edu.duration}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (64%) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {experiences.length > 0 && (
            <div style={{ background: '#FFFFFF', border: '2.5px solid #000000', boxShadow: '4px 4px 0px #000000', padding: 22, flex: 1 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 900, textTransform: 'uppercase', background: '#7C3AED', color: '#fff', padding: '3px 8px', display: 'inline-block', border: '1.5px solid #000' }}>
                Career Missions
              </h3>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 16, borderLeft: '3px solid #7C3AED', paddingLeft: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14, fontWeight: 900 }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, fontWeight: 800, background: '#FEF08A', padding: '1px 6px', border: '1px solid #000' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#7C3AED', marginTop: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: '5px 0 0', fontSize: 12, lineHeight: 1.5, fontWeight: 500 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ background: '#FFFFFF', border: '2.5px solid #000000', boxShadow: '4px 4px 0px #000000', padding: 18 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', background: '#FACC15', padding: '2px 6px', display: 'inline-block', border: '1.5px solid #000' }}>
                Featured Drops
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {projects.map((p, idx) => (
                  <div key={p.id || idx} style={{ background: '#FEF08A', border: '1.5px solid #000000', padding: 10, boxShadow: '2px 2px 0px #000' }}>
                    <strong style={{ fontSize: 12, fontWeight: 900 }}>{p.name}</strong>
                    {p.description && <p style={{ margin: '3px 0 0', fontSize: 10.5, lineHeight: 1.35, fontWeight: 500 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   18. BORDEAUX WINE & ROSE GOLD (canva-bordeaux-luxury)
   Regal luxury hospitality & private equity: Deep Velvet Bordeaux (#4A0E17)
   ribbon header, brushed rose gold accents (#D49B88), and aristocratic serif type.
   ========================================================================== */
function BordeauxLuxuryTemplate({ data }) {
  const info = data?.personalInfo || {};
  const initials = getInitials(info.fullName);
  const experiences = getList(data?.experience);
  const educations = getList(data?.education);
  const skills = getList(data?.skills);
  const languages = getList(data?.languages);
  const projects = getList(data?.projects);

  return (
    <div style={{ minHeight: 1123, width: '100%', background: '#FFFBF7', color: '#261C1A', fontFamily: "'Georgia', serif", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Velvet Bordeaux Crown Header */}
      <header style={{ background: '#4A0E17', color: '#FFFFFF', padding: '34px 44px 22px', borderBottom: '3px solid #D49B88' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: '#D49B88', fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
              GRAND LUXURY DOSSIER
            </div>
            <h1 style={{ margin: 0, fontSize: 36, letterSpacing: '1px', color: '#FFFFFF', fontWeight: 400 }}>
              {info.fullName || 'Your Name'}
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase', color: '#E8C5BA', fontFamily: "'Inter', sans-serif" }}>
              {info.jobTitle || 'Managing Principal'}
            </p>
          </div>
          <div style={{ width: 84, height: 84, borderRadius: '50%', border: '2px solid #D49B88', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#350A10', color: '#D49B88', fontSize: 30 }}>
            {info.profilePicture ? <img src={info.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 11.5, color: '#D49B88', marginTop: 14, fontFamily: "'Inter', sans-serif" }}>
          <span>{info.email || 'email@example.com'}</span>
          <span>✦</span>
          <span>{info.phone || '(000) 000-0000'}</span>
        </div>
      </header>

      {/* Main Split Body: Left Main (66%) + Right Luxury Rail (34%) */}
      <div style={{ display: 'flex', flex: 1, padding: '34px 40px', gap: 34, boxSizing: 'border-box' }}>
        {/* Left Column (66%) */}
        <div style={{ flex: '1 1 66%' }}>
          {info.summary && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #E8D3CD', paddingBottom: 4, marginBottom: 10, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Executive Perspective
              </h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#4A3B38' }}>{info.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #E8D3CD', paddingBottom: 4, marginBottom: 14, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Career Appointments
              </h2>
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 15, color: '#4A0E17' }}>{exp.role}</strong>
                    <span style={{ fontSize: 11.5, color: '#8C685E', fontStyle: 'italic' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#A3533E', fontStyle: 'italic', margin: '2px 0 6px' }}>{exp.company}</div>
                  {exp.description && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#574643', fontFamily: "'Inter', sans-serif" }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #E8D3CD', paddingBottom: 4, marginBottom: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Key Engagements
              </h2>
              {projects.map((p, idx) => (
                <div key={p.id || idx} style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: 13.5, color: '#4A0E17' }}>{p.name}</strong>
                  {p.description && <p style={{ margin: '3px 0 0', fontSize: 12, color: '#574643', fontFamily: "'Inter', sans-serif" }}>{p.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Luxury Rail (34%) */}
        <aside style={{ width: '34%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {skills.length > 0 && (
            <div style={{ background: '#FDF4F2', border: '1px solid #ECD8D2', padding: 18, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #ECD8D2', paddingBottom: 4, fontFamily: "'Inter', sans-serif" }}>Diplomas & Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s, idx) => (
                  <span key={s.id || idx} style={{ fontSize: 11, padding: '3px 8px', background: '#FFFFFF', border: '1px solid #D49B88', color: '#4A0E17', borderRadius: 2, fontFamily: "'Inter', sans-serif" }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ background: '#FDF4F2', border: '1px solid #ECD8D2', padding: 18, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #ECD8D2', paddingBottom: 4, fontFamily: "'Inter', sans-serif" }}>Education</h3>
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4A0E17' }}>{edu.degree}</div>
                  <div style={{ fontSize: 11.5, color: '#8C685E', fontStyle: 'italic' }}>{edu.school}</div>
                  <div style={{ fontSize: 11, color: '#B09088', fontFamily: "'Inter', sans-serif" }}>{edu.duration}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ background: '#FDF4F2', border: '1px solid #ECD8D2', padding: 18, borderRadius: 4 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#4A0E17', borderBottom: '1px solid #ECD8D2', paddingBottom: 4, fontFamily: "'Inter', sans-serif" }}>Languages</h3>
              {languages.map((l, idx) => (
                <div key={l.id || idx} style={{ marginBottom: 6, fontSize: 11.5, fontFamily: "'Inter', sans-serif" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#A3533E', fontWeight: 600 }}>{l.percentage || 0}%</span>
                  </div>
                  <div style={{ height: 3, background: '#ECD8D2' }}>
                    <div style={{ width: `${l.percentage || 0}%`, height: '100%', background: '#A3533E' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ==========================================================================
   TEMPLATE DISPATCHER COMPONENT
   Maps each template ID to its truly distinct layout component!
   ========================================================================== */
export default function ResumeTemplate({ data, variant = 'canva-minimal-slate' }) {
  // If variant is one of the 84 dynamic catalog templates, render UniversalDynamicTemplate
  const catalogTemplate = TEMPLATES_BY_ID[variant];
  if (catalogTemplate?.config) {
    return <UniversalDynamicTemplate data={data} config={catalogTemplate.config} templateId={variant} />;
  }

  switch (variant) {
    case 'canva-executive-navy':
      return <ExecutiveNavyTemplate data={data} />;
    case 'canva-modern-powder':
      return <ModernPowderTemplate data={data} />;
    case 'canva-earthy-sage':
      return <EarthySageTemplate data={data} />;
    case 'canva-academic-plum':
      return <AcademicPlumTemplate data={data} />;
    case 'canva-geometric-ochre':
      return <GeometricOchreTemplate data={data} />;
    case 'canva-arch-navy':
      return <ArchNavyTemplate data={data} />;
    case 'canva-editorial-chic':
      return <EditorialChicTemplate data={data} />;
    case 'canva-creative-coral':
      return <CreativeCoralTemplate data={data} />;
    case 'canva-corporate-clean':
      return <CorporateCleanTemplate data={data} />;
    case 'canva-monochrome-gold':
      return <MonochromeGoldTemplate data={data} />;
    case 'canva-studio-indigo':
      return <StudioIndigoTemplate data={data} />;
    case 'canva-cyber-emerald':
      return <CyberEmeraldTemplate data={data} />;
    case 'canva-swiss-international':
      return <SwissInternationalTemplate data={data} />;
    case 'canva-nordic-frost':
      return <NordicFrostTemplate data={data} />;
    case 'canva-vintage-typewriter':
      return <VintageTypewriterTemplate data={data} />;
    case 'canva-tokyo-neon':
      return <TokyoNeonTemplate data={data} />;
    case 'canva-bordeaux-luxury':
      return <BordeauxLuxuryTemplate data={data} />;
    case 'canva-minimal-slate':
    default:
      return <MinimalSlateTemplate data={data} />;
  }
}



