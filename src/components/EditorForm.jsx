import React, { useState } from 'react';
import { SlidersHorizontal, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import PersonalInfoSection from './EditorSections/PersonalInfoSection';
import ExperienceSection from './EditorSections/ExperienceSection';
import EducationSection from './EditorSections/EducationSection';
import SkillsSection from './EditorSections/SkillsSection';
import ProjectsSection from './EditorSections/ProjectsSection';
import CertificationsSection from './EditorSections/CertificationsSection';
import LanguagesSection from './EditorSections/LanguagesSection';
import ThemeSection from './EditorSections/ThemeSection';

const SECTION_DEFAULTS = [
  { id: 'personal', label: 'Personal Information', alwaysVisible: true },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills & Proficiencies' },
  { id: 'projects', label: 'Key Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
];

export default function EditorForm({ data, setData, onOpenAiPolish, onOpenAtsModal }) {
  const [showSectionManager, setShowSectionManager] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '16px',
    fontSize: '15px',
  };

  const sectionOrder = data.sectionOrder || SECTION_DEFAULTS.map((s) => s.id);
  const sectionVisibility = data.sectionVisibility || {};

  const toggleVisibility = (sectionId) => {
    setData((prev) => ({
      ...prev,
      sectionVisibility: {
        ...(prev.sectionVisibility || {}),
        [sectionId]: prev.sectionVisibility?.[sectionId] === false ? true : false,
      },
    }));
  };

  const moveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    setData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  const renderSectionComponent = (sectionId) => {
    // If hidden by user, don't show editor inputs unless they re-enable it
    const isVisible = sectionVisibility[sectionId] !== false;

    switch (sectionId) {
      case 'personal':
        return (
          <div key="personal">
            <PersonalInfoSection
              data={data}
              setData={setData}
              inputStyle={inputStyle}
              onOpenAiPolish={onOpenAiPolish}
            />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        );
      case 'experience':
        return isVisible ? (
          <div key="experience">
            <ExperienceSection
              data={data}
              setData={setData}
              inputStyle={inputStyle}
              onOpenAiPolish={onOpenAiPolish}
            />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      case 'education':
        return isVisible ? (
          <div key="education">
            <EducationSection data={data} setData={setData} inputStyle={inputStyle} />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      case 'skills':
        return isVisible ? (
          <div key="skills">
            <SkillsSection data={data} setData={setData} inputStyle={inputStyle} />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      case 'projects':
        return isVisible ? (
          <div key="projects">
            <ProjectsSection
              data={data}
              setData={setData}
              inputStyle={inputStyle}
              onOpenAiPolish={onOpenAiPolish}
            />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      case 'certifications':
        return isVisible ? (
          <div key="certifications">
            <CertificationsSection data={data} setData={setData} inputStyle={inputStyle} />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      case 'languages':
        return isVisible ? (
          <div key="languages">
            <LanguagesSection data={data} setData={setData} inputStyle={inputStyle} />
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '32px 0' }} />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div style={{ paddingRight: '16px' }}>
      {/* Theme Section */}
      <ThemeSection data={data} setData={setData} inputStyle={inputStyle} />
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '24px 0' }} />

      {/* Customize Sections Bar */}
      <div style={{
        marginBottom: '28px',
        padding: '14px 16px',
        backgroundColor: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={17} color="var(--accent-color)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Section Order &amp; Visibility
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowSectionManager(!showSectionManager)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-color)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {showSectionManager ? 'Hide Controls' : 'Customize Order'}
          </button>
        </div>

        {/* Collapsible Section Manager */}
        {showSectionManager && (
          <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Reorder sections using arrows or toggle eye icon to show/hide sections from your CV:
            </p>
            {sectionOrder.map((sectionId, idx) => {
              const info = SECTION_DEFAULTS.find((s) => s.id === sectionId) || { label: sectionId };
              const isVisible = sectionVisibility[sectionId] !== false;

              return (
                <div
                  key={sectionId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    opacity: isVisible ? 1 : 0.5,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {info.label} {!isVisible && '(Hidden)'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!info.alwaysVisible && (
                      <button
                        type="button"
                        onClick={() => toggleVisibility(sectionId)}
                        title={isVisible ? 'Hide Section' : 'Show Section'}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                      >
                        {isVisible ? <Eye size={16} /> : <EyeOff size={16} color="#EF4444" />}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      style={{ background: 'none', border: 'none', color: idx === 0 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: idx === 0 ? 'default' : 'pointer', padding: '2px' }}
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sectionOrder.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      style={{ background: 'none', border: 'none', color: idx === sectionOrder.length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: idx === sectionOrder.length - 1 ? 'default' : 'pointer', padding: '2px' }}
                    >
                      <ArrowDown size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Render Dynamic Sections */}
      {sectionOrder.map((sectionId) => renderSectionComponent(sectionId))}
    </div>
  );
}
