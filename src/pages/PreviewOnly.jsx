import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LivePreview from '../components/LivePreview';

export default function PreviewOnly() {
  const [searchParams] = useSearchParams();
  const initialTemplateId = searchParams.get('template') || 'canva-minimal-slate';
  
  const [resumeData, setResumeData] = useState({
    templateId: initialTemplateId,
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      summary: 'Passionate software engineer with 5+ years of experience building scalable web applications.',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        role: 'Senior Developer',
        duration: '2020 - Present',
        description: 'Led the frontend team in rebuilding the core application using React and Vite.',
      },
    ],
    languages: [
      { id: '1', name: 'English', percentage: 95 },
      { id: '2', name: 'German', percentage: 80 },
      { id: '3', name: 'Mandarin', percentage: 60 },
      { id: '4', name: 'French', percentage: 40 },
    ],
  });

  useEffect(() => {
    const t = searchParams.get('template');
    if (t) {
      setResumeData(prev => ({ ...prev, templateId: t }));
    }
  }, [searchParams]);

  // Render just the live preview component on a white background, fitted nicely for a screenshot
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh', alignItems: 'center' }}>
      <LivePreview data={resumeData} />
    </div>
  );
}
