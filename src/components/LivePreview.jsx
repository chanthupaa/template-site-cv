import React from 'react';
import ResumeTemplate from './templates/ResumeTemplates';

export default function LivePreview({ data }) {
  
  // The preview itself should look like a printed A4 page, 
  // so we force light mode styling on it regardless of the app theme.
  const pageStyle = {
    width: '100%',
    maxWidth: '794px', // Standard A4 width ratio
    minHeight: '1123px', // Standard A4 height ratio
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '0',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden' // Ensure full bleed backgrounds don't overflow
  };

  const variant = data?.templateId || 'canva-minimal-slate';

  // Filter out any hidden sections based on data.sectionVisibility
  const visibility = data.sectionVisibility || {};
  const previewData = {
    ...data,
    experience: visibility.experience === false ? [] : data.experience,
    education: visibility.education === false ? [] : data.education,
    skills: visibility.skills === false ? [] : data.skills,
    projects: visibility.projects === false ? [] : data.projects,
    certifications: visibility.certifications === false ? [] : data.certifications,
    languages: visibility.languages === false ? [] : data.languages,
  };

  return (
    <div id="resume-preview" style={pageStyle}>
      <ResumeTemplate data={previewData} variant={variant} />
    </div>
  );
}
