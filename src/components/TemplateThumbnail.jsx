import React from 'react';

/**
 * Renders a unique miniature wireframe that visually represents
 * each template's actual layout (sidebar position, profile shape,
 * header style, decorative elements, etc.)
 */
export default function TemplateThumbnail({ templateId, tagColor, bgGradient }) {
  const accent = tagColor || '#475569';
  const soft = bgGradient || 'linear-gradient(135deg, #E2E8F0, #F8FAFC)';

  const thumbnails = {

    /* ── 1. Minimalist Slate Sidebar ── */
    'canva-minimal-slate': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Dark charcoal sidebar */}
        <div style={{ width: '34%', background: '#334155', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #94A3B8', background: '#475569', marginBottom: 12 }} />
          <div style={{ width: '80%', height: 3, background: '#64748B', marginBottom: 6, borderRadius: 2 }} />
          <div style={{ width: '60%', height: 2, background: '#64748B', marginBottom: 14, borderRadius: 2 }} />
          {/* Expertise pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {[28, 32, 24, 30].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, borderRadius: 10, border: '1px solid #64748B' }} />
            ))}
          </div>
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 8, width: '75%', background: '#334155', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ height: 4, width: '50%', background: '#94A3B8', marginBottom: 16, borderRadius: 2 }} />
          <div style={{ height: 1, background: '#E2E8F0', marginBottom: 10 }} />
          {[85, 70, 90, 60, 80, 50].map((w, i) => (
            <div key={i} style={{ height: i % 3 === 0 ? 5 : 3, width: `${w}%`, background: i % 3 === 0 ? '#475569' : '#CBD5E1', marginBottom: 6, borderRadius: 2, opacity: i % 3 === 0 ? 1 : 0.6 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 2. Executive Royal & Clean ── */
    'canva-executive-navy': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Deep navy sidebar */}
        <div style={{ width: '34%', background: '#172554', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '3px solid #3B82F6', background: '#1E3A8A', marginBottom: 12 }} />
          <div style={{ width: '85%', height: 3, background: '#3B82F6', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '65%', height: 2, background: '#60A5FA', marginBottom: 16, borderRadius: 2, opacity: 0.6 }} />
          {/* Contact block */}
          <div style={{ width: '100%', borderTop: '1px solid #2563EB', paddingTop: 8 }}>
            {[70, 80, 55].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 2, background: '#60A5FA', marginBottom: 5, borderRadius: 2, opacity: 0.5 }} />
            ))}
          </div>
        </div>
        {/* Main — authoritative headers */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 10, width: '70%', background: '#1E3A8A', marginBottom: 3, borderRadius: 1 }} />
          <div style={{ height: 4, width: '45%', background: '#93C5FD', marginBottom: 14, borderRadius: 1, letterSpacing: 4 }} />
          {/* Section with heavy divider */}
          <div style={{ height: 2, background: '#1E3A8A', marginBottom: 8 }} />
          {[90, 65, 80, 50, 75, 45].map((w, i) => (
            <div key={i} style={{ height: i === 0 || i === 3 ? 5 : 3, width: `${w}%`, background: i === 0 || i === 3 ? '#1E3A8A' : '#CBD5E1', marginBottom: 5, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 3. Modern Powder Blue ── */
    'canva-modern-powder': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', flexDirection: 'row-reverse' }}>
        {/* Light powder sidebar on RIGHT */}
        <div style={{ width: '34%', background: '#DCEFF5', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3B82A0', marginBottom: 12, opacity: 0.3 }} />
          {[60, 80, 50, 70].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#3B82A0', marginBottom: 5, borderRadius: 2, opacity: 0.4 }} />
          ))}
          <div style={{ width: '90%', height: 1, background: '#3B82A0', margin: '8px 0', opacity: 0.2 }} />
          {[55, 70, 45].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#3B82A0', marginBottom: 5, borderRadius: 2, opacity: 0.4 }} />
          ))}
        </div>
        {/* Main — editorial left with powder accent block */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ background: '#DCEFF5', padding: '10px 8px', borderRadius: 4, marginBottom: 14 }}>
            <div style={{ height: 8, width: '80%', background: '#3B82A0', marginBottom: 4, borderRadius: 2 }} />
            <div style={{ height: 3, width: '55%', background: '#3B82A0', borderRadius: 2, opacity: 0.5 }} />
          </div>
          {[85, 60, 75, 50, 90, 65].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: i % 2 === 0 ? '#3B82A0' : '#CBD5E1', marginBottom: 5, borderRadius: 2, opacity: i % 2 === 0 ? 0.7 : 0.5 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 4. Earthy Sage & Sand ── */
    'canva-earthy-sage': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Sage green sidebar */}
        <div style={{ width: '34%', background: '#3D5A53', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #E6DED0', background: '#4A6B62', marginBottom: 10 }} />
          <div style={{ width: '75%', height: 3, background: '#A3B8B0', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '55%', height: 2, background: '#A3B8B0', marginBottom: 14, borderRadius: 2, opacity: 0.6 }} />
          {/* Warm sand divider */}
          <div style={{ width: '80%', height: 1, background: '#E6DED0', marginBottom: 8 }} />
          {[65, 80, 50].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#A3B8B0', marginBottom: 5, borderRadius: 2, opacity: 0.5 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 8, width: '70%', background: '#3D5A53', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ height: 3, width: '40%', background: '#C4B5A0', marginBottom: 14, borderRadius: 2 }} />
          {/* Experience blocks with sand left-border */}
          {[0, 1].map(block => (
            <div key={block} style={{ borderLeft: '3px solid #E6DED0', paddingLeft: 8, marginBottom: 10 }}>
              {[80, 60, 90].map((w, i) => (
                <div key={i} style={{ height: i === 0 ? 4 : 2, width: `${w}%`, background: i === 0 ? '#3D5A53' : '#CBD5E1', marginBottom: 4, borderRadius: 2 }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),

    /* ── 5. Academic Plum & Tech ── */
    'canva-academic-plum': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Soft plum sidebar */}
        <div style={{ width: '34%', background: '#E5DCE5', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #6B294F', background: '#D4C2D4', marginBottom: 10 }} />
          <div style={{ width: '80%', height: 3, background: '#6B294F', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '60%', height: 2, background: '#9B6B8A', marginBottom: 14, borderRadius: 2, opacity: 0.6 }} />
          {/* Academic structure lines */}
          <div style={{ width: '100%', borderTop: '1px solid #6B294F', paddingTop: 8, opacity: 0.4 }}>
            {[70, 85, 55, 75].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 2, background: '#6B294F', marginBottom: 4, borderRadius: 2, opacity: 0.6 }} />
            ))}
          </div>
        </div>
        {/* Main — serif-style with structured blocks */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 9, width: '65%', background: '#6B294F', marginBottom: 4, borderRadius: 1 }} />
          <div style={{ height: 3, width: '50%', background: '#9B6B8A', marginBottom: 14, borderRadius: 1, opacity: 0.5 }} />
          {/* Academic sections with plum headers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <div style={{ height: 4, width: '30%', background: '#6B294F', borderRadius: 1 }} />
            <div style={{ height: 1, flex: 1, background: '#6B294F', opacity: 0.3 }} />
          </div>
          {[80, 55, 70, 45, 85].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: '#CBD5E1', marginBottom: 5, borderRadius: 2, opacity: 0.6 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 6. Geometric Ochre & Navy ── */
    'canva-geometric-ochre': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', borderLeft: '6px solid #B7791F' }}>
        {/* Dark navy sidebar */}
        <div style={{ width: '34%', background: '#152A45', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '4px', background: '#B7791F', marginBottom: 10 }} />
          <div style={{ width: '80%', height: 3, background: '#F7E2B5', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '55%', height: 2, background: '#F7E2B5', marginBottom: 14, borderRadius: 2, opacity: 0.4 }} />
          {/* Geometric ochre accent blocks */}
          <div style={{ width: '90%', height: 2, background: '#B7791F', marginBottom: 8 }} />
          {[60, 75, 50].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#F7E2B5', marginBottom: 5, borderRadius: 0, opacity: 0.5 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 9, width: '75%', background: '#152A45', marginBottom: 4, borderRadius: 0 }} />
          <div style={{ height: 4, width: '50%', background: '#B7791F', marginBottom: 14, borderRadius: 0 }} />
          <div style={{ height: 2, background: '#B7791F', marginBottom: 8, opacity: 0.6 }} />
          {[85, 60, 75, 45, 90].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: i % 2 === 0 ? '#152A45' : '#CBD5E1', marginBottom: 5, borderRadius: 0, opacity: i % 2 === 0 ? 0.8 : 0.5 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 7. Contemporary Navy Arch ── */
    'canva-arch-navy': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Navy sidebar with arch bottom */}
        <div style={{ width: '34%', background: '#102A43', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '0 0 60px 0' }}>
          {/* Arch-shaped profile */}
          <div style={{ width: 32, height: 38, borderRadius: '16px 16px 6px 6px', border: '2px solid #D9E2EC', background: '#1B3D5C', marginBottom: 10 }} />
          <div style={{ width: '80%', height: 3, background: '#D9E2EC', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '55%', height: 2, background: '#627D98', marginBottom: 14, borderRadius: 2, opacity: 0.6 }} />
          {[65, 80].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#627D98', marginBottom: 5, borderRadius: 2, opacity: 0.5 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 9, width: '70%', background: '#102A43', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ height: 3, width: '45%', background: '#627D98', marginBottom: 14, borderRadius: 2 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <div style={{ height: 4, width: '35%', background: '#102A43', borderRadius: 1 }} />
            <div style={{ height: 1, flex: 1, background: '#102A43', opacity: 0.3 }} />
          </div>
          {[80, 55, 70, 50, 85].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: '#CBD5E1', marginBottom: 5, borderRadius: 2, opacity: 0.55 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 8. Haute Editorial Chic ── */
    'canva-editorial-chic': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', flexDirection: 'row-reverse' }}>
        {/* Warm linen sidebar on RIGHT */}
        <div style={{ width: '34%', background: '#F3F0EA', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#D1CBBE', marginBottom: 10 }} />
          {[60, 75, 50, 65].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#171717', marginBottom: 5, borderRadius: 0, opacity: 0.3 }} />
          ))}
        </div>
        {/* Main — centered editorial header */}
        <div style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderTop: '1px solid #171717', borderBottom: '1px solid #171717', padding: '10px 0', marginBottom: 14, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: 10, width: '80%', background: '#171717', marginBottom: 4, borderRadius: 0, opacity: 0.9 }} />
            <div style={{ height: 3, width: '50%', background: '#171717', borderRadius: 0, opacity: 0.3 }} />
          </div>
          {/* Fine rules between sections */}
          {[0, 1].map(s => (
            <div key={s} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                <div style={{ height: 3, width: '25%', background: '#171717', borderRadius: 0, opacity: 0.7 }} />
                <div style={{ height: '0.5px', flex: 1, background: '#171717', opacity: 0.2 }} />
              </div>
              {[75, 55, 85].map((w, i) => (
                <div key={i} style={{ height: 2, width: `${w}%`, background: '#A3A097', marginBottom: 4, borderRadius: 0 }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),

    /* ── 9. Creative Studio Coral ── */
    'canva-creative-coral': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden' }}>
        {/* Coral sidebar */}
        <div style={{ width: '34%', background: '#F0806F', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #FDE1DC', background: '#E65F4D', marginBottom: 10 }} />
          <div style={{ width: '75%', height: 3, background: '#FDE1DC', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: '55%', height: 2, background: '#FDE1DC', marginBottom: 12, borderRadius: 2, opacity: 0.6 }} />
          {/* Rounded pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {[26, 30, 22, 28].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, borderRadius: 10, background: 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </div>
        {/* Main with rounded project cards */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ height: 9, width: '70%', background: '#E65F4D', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ height: 3, width: '50%', background: '#F0806F', marginBottom: 14, borderRadius: 2, opacity: 0.5 }} />
          {[85, 60, 75].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: '#CBD5E1', marginBottom: 5, borderRadius: 2, opacity: 0.6 }} />
          ))}
          {/* Rounded project cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 8 }}>
            {[0, 1].map(c => (
              <div key={c} style={{ background: '#FDE1DC', borderRadius: 8, padding: 6 }}>
                <div style={{ height: 3, width: '70%', background: '#E65F4D', marginBottom: 3, borderRadius: 2, opacity: 0.7 }} />
                <div style={{ height: 2, width: '90%', background: '#F0806F', borderRadius: 2, opacity: 0.3 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    /* ── 10. Clean Corporate ATS ── */
    'canva-corporate-clean': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', flexDirection: 'row-reverse' }}>
        {/* Blue sidebar on RIGHT */}
        <div style={{ width: '34%', background: '#285A8C', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #E8F0F7', background: '#1E4A7A', marginBottom: 10 }} />
          {[70, 85, 55, 65].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#E8F0F7', marginBottom: 5, borderRadius: 2, opacity: 0.5 }} />
          ))}
        </div>
        {/* Main — corporate header with soft blue bg */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ background: '#E8F0F7', padding: '10px 8px', borderRadius: 2, marginBottom: 14 }}>
            <div style={{ height: 9, width: '75%', background: '#285A8C', marginBottom: 4, borderRadius: 1 }} />
            <div style={{ height: 3, width: '50%', background: '#285A8C', borderRadius: 1, opacity: 0.4 }} />
          </div>
          {[90, 65, 80, 50, 75, 60].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: i % 3 === 0 ? '#285A8C' : '#CBD5E1', marginBottom: 5, borderRadius: 2, opacity: i % 3 === 0 ? 0.7 : 0.5 }} />
          ))}
        </div>
      </div>
    ),

    /* ── 11. Monochrome Gold ── */
    'canva-monochrome-gold': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', flexDirection: 'row-reverse' }}>
        {/* Black profile panel on RIGHT */}
        <div style={{ width: '34%', background: '#191919', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #9A7332', background: '#2A2A2A', marginBottom: 10 }} />
          <div style={{ width: '80%', height: 3, background: '#9A7332', marginBottom: 5, borderRadius: 0 }} />
          <div style={{ width: '55%', height: 2, background: '#C9A961', marginBottom: 14, borderRadius: 0, opacity: 0.4 }} />
          <div style={{ width: '90%', height: 1, background: '#9A7332', marginBottom: 8, opacity: 0.3 }} />
          {[60, 75, 50].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 2, background: '#C9A961', marginBottom: 5, borderRadius: 0, opacity: 0.4 }} />
          ))}
        </div>
        {/* Main — luxury editorial */}
        <div style={{ flex: 1, padding: '18px 14px' }}>
          <div style={{ borderTop: '1px solid #9A7332', borderBottom: '1px solid #9A7332', padding: '10px 0', marginBottom: 14, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: 10, width: '75%', background: '#191919', marginBottom: 4, borderRadius: 0 }} />
            <div style={{ height: 3, width: '45%', background: '#9A7332', borderRadius: 0, opacity: 0.6 }} />
          </div>
          {[0, 1].map(s => (
            <div key={s} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                <div style={{ height: 3, width: '28%', background: '#9A7332', borderRadius: 0 }} />
                <div style={{ height: '0.5px', flex: 1, background: '#9A7332', opacity: 0.25 }} />
              </div>
              {[70, 55, 85].map((w, i) => (
                <div key={i} style={{ height: 2, width: `${w}%`, background: '#B0B0A8', marginBottom: 4, borderRadius: 0 }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),

    /* ── 12. Studio Indigo ── */
    'canva-studio-indigo': (
      <div style={{ display: 'flex', height: '100%', background: '#fff', borderRadius: '6px', overflow: 'hidden', flexDirection: 'column' }}>
        {/* Indigo top bar */}
        <div style={{ height: 8, background: '#4F46E5', width: '100%', flexShrink: 0 }} />
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Indigo sidebar */}
          <div style={{ width: '34%', background: '#312E81', padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #818CF8', background: '#3730A3', marginBottom: 10 }} />
            <div style={{ width: '80%', height: 3, background: '#818CF8', marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: '55%', height: 2, background: '#A5B4FC', marginBottom: 12, borderRadius: 2, opacity: 0.5 }} />
            {[26, 30, 22].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, borderRadius: 4, background: 'rgba(129,140,248,0.25)', marginBottom: 3, alignSelf: 'flex-start', marginLeft: 4 }} />
            ))}
          </div>
          {/* Main with modular cards */}
          <div style={{ flex: 1, padding: '14px 12px' }}>
            <div style={{ height: 8, width: '70%', background: '#4F46E5', marginBottom: 3, borderRadius: 2 }} />
            <div style={{ height: 3, width: '45%', background: '#818CF8', marginBottom: 12, borderRadius: 2, opacity: 0.5 }} />
            {[80, 55, 70].map((w, i) => (
              <div key={i} style={{ height: 3, width: `${w}%`, background: '#CBD5E1', marginBottom: 4, borderRadius: 2, opacity: 0.6 }} />
            ))}
            {/* Modular project cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 6 }}>
              {[0, 1].map(c => (
                <div key={c} style={{ background: '#E8E7FF', borderRadius: 4, padding: 5 }}>
                  <div style={{ height: 3, width: '65%', background: '#4F46E5', marginBottom: 3, borderRadius: 2, opacity: 0.7 }} />
                  <div style={{ height: 2, width: '85%', background: '#818CF8', borderRadius: 2, opacity: 0.3 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {thumbnails[templateId] || thumbnails['canva-minimal-slate']}
    </div>
  );
}
