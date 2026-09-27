import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { TEMPLATES_LIST, TEMPLATE_CATEGORIES, TAG_COLORS } from '../data/templatesData';
import ScaledResumeThumbnail from './ScaledResumeThumbnail';

export default function TemplateDrawer({ isOpen, onClose, currentTemplateId, onSelectTemplate, sampleData }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = TEMPLATES_LIST.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.tag.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 1100,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 0.2s ease',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        height: '100%',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid var(--border-color)',
        animation: 'slideInRight 0.25s ease-out',
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Choose Template</h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {TEMPLATES_LIST.length} distinct layouts — click any template to swap instantly
            </p>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ padding: '8px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search templates (e.g. Minimal, Cyber, Swiss, Luxury)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
            {TEMPLATE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: active ? 'var(--accent-color)' : 'var(--border-color)',
                    backgroundColor: active ? 'var(--accent-color)' : 'var(--bg-surface)',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px 16px',
        }}>
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((tpl) => {
              const isSelected = currentTemplateId === tpl.id;
              const tagColor = TAG_COLORS[tpl.tag] || '#666';

              return (
                <div
                  key={tpl.id}
                  onClick={() => onSelectTemplate(tpl.id)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '794 / 1123',
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: isSelected ? '3px solid var(--accent-color)' : '1px solid var(--border-color)',
                      boxShadow: isSelected ? '0 0 0 3px var(--accent-light), 0 8px 24px rgba(0,0,0,0.15)' : '0 4px 14px rgba(0,0,0,0.06)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {/* Live miniature scaled thumbnail */}
                    <ScaledResumeThumbnail templateId={tpl.id} data={sampleData} />

                    {/* Tag badge */}
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: tagColor,
                      color: '#FFF',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '10px',
                      zIndex: 10,
                      letterSpacing: '0.4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}>
                      {tpl.tag}
                    </span>

                    {/* Active Checkmark Badge */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'var(--accent-color)',
                        color: '#FFF',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 12,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 style={{
                      margin: '0 0 2px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: isSelected ? 'var(--accent-color)' : 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {tpl.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '11.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {tpl.desc}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '48px 16px', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '15px', marginBottom: '8px' }}>No templates matched your query.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="apple-btn secondary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing {filteredTemplates.length} of {TEMPLATES_LIST.length} templates
          </span>
          <button onClick={onClose} className="apple-btn" style={{ padding: '8px 24px', fontSize: '13px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
