import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import {
  ArrowLeft,
  Moon,
  Sun,
  LayoutTemplate,
  Target,
  Sparkles,
  Download,
  Printer,
  Copy,
  FileJson,
  Upload,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from '../components/auth/UserMenu';
import EditorForm from '../components/EditorForm';
import LivePreview from '../components/LivePreview';
import TemplateDrawer from '../components/TemplateDrawer';
import AtsScoreModal from '../components/AtsScoreModal';
import AiPolishModal from '../components/AiPolishModal';
import { industryProfiles } from '../data/industryProfiles';
import { calculateATSScore } from '../services/aiAssistantService';
import { formatResumeToPlainText } from '../utils/atsTextFormatter';
import { getAllResumes } from '../utils/resumeStorage';

export default function BuilderPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, saveResume } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTemplateId = searchParams.get('template') || 'canva-minimal-slate';
  const resumeParamId = searchParams.get('id');

  const defaultData = {
    id: resumeParamId || 'resume-new',
    title: 'Untitled Resume',
    templateId: initialTemplateId,
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      summary: 'Passionate software engineer with 5+ years of experience building scalable web applications with modern frontend frameworks and distributed cloud architecture.',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        role: 'Senior Developer',
        duration: '2020 — Present',
        description: 'Led the frontend team in rebuilding the core application using React and Vite, improving page speed by 35% and user retention by 20%.',
      },
    ],
    languages: [
      { id: '1', name: 'English', percentage: 95 },
      { id: '2', name: 'German', percentage: 80 },
    ],
    education: [
      {
        id: '1',
        degree: 'B.S. Computer Science',
        school: 'University of Technology',
        duration: '2016 — 2020',
        description: 'Graduated with Honors. Specialized in Software Engineering and Artificial Intelligence.',
      },
    ],
    skills: [
      { id: '1', name: 'JavaScript' },
      { id: '2', name: 'React' },
      { id: '3', name: 'Node.js' },
      { id: '4', name: 'TypeScript' },
      { id: '5', name: 'Docker' },
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        link: 'https://github.com/johndoe/ecommerce',
        description: 'Built a full-stack e-commerce platform using MERN stack with Stripe integration for secure payments.',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2022',
      },
    ],
    themeConfig: {
      primaryColor: '#4A72B2',
      fontFamily: 'Inter, sans-serif',
      spacing: 'medium',
    },
    sectionOrder: ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
    sectionVisibility: {
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
    },
  };

  const [resumeData, setResumeData] = useState(() => {
    if (resumeParamId) {
      const savedResumes = getAllResumes();
      const found = savedResumes.find((r) => r.id === resumeParamId);
      if (found && found.data) return found.data;
    }

    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          id: resumeParamId || `resume-${Date.now()}`,
          ...parsed,
          themeConfig: {
            ...defaultData.themeConfig,
            ...(parsed.themeConfig || {}),
          },
        };
      } catch (_e) {
        // Silently use defaults if saved data is unreadable
      }
    }
    return { ...defaultData, id: resumeParamId || `resume-${Date.now()}` };
  });

  // Modal / Drawer states
  const [isTemplateDrawerOpen, setIsTemplateDrawerOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [aiModalState, setAiModalState] = useState({
    isOpen: false,
    text: '',
    contextTitle: '',
    onApply: () => {},
  });
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to database
  useEffect(() => {
    saveResume(resumeData);
  }, [resumeData, saveResume]);

  const [prevTemplateParam, setPrevTemplateParam] = useState(searchParams.get('template'));
  const currentTemplateParam = searchParams.get('template');
  
  if (currentTemplateParam !== prevTemplateParam) {
    setPrevTemplateParam(currentTemplateParam);
    if (currentTemplateParam && currentTemplateParam !== resumeData.templateId) {
      setResumeData((prev) => ({ ...prev, templateId: currentTemplateParam }));
    }
  }

  const componentRef = useRef(null);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ATS Score calculation
  const atsResult = calculateATSScore(resumeData);
  const atsScore = atsResult.score;

  const getScoreColor = (s) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#F59E0B';
    return '#EF4444';
  };

  // Actions
  const handlePrint = () => {
    setShowExportMenu(false);
    const element = componentRef.current;
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || 'Untitled'}-Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
    showToast('Downloading PDF...');
  };

  const handleBrowserPrint = () => {
    setShowExportMenu(false);
    window.print();
  };

  const handleCopyPlainText = async () => {
    setShowExportMenu(false);
    const plainText = formatResumeToPlainText(resumeData);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainText);
        showToast('Copied ATS Plain Text to clipboard!');
      } else {
        showToast('Clipboard not accessible on this device.');
      }
    } catch (_err) {
      showToast('Clipboard copy failed. Please select text manually.');
    }
  };

  const handleExportJSON = () => {
    setShowExportMenu(false);
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', `${resumeData.personalInfo?.fullName || 'resume'}-data.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      showToast('Exported JSON data.');
    } catch (_err) {
      showToast('Export failed. Please check browser permissions.');
    }
  };

  const handleImportJSON = (event) => {
    setShowExportMenu(false);
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json') && file.type && file.type !== 'application/json') {
      alert('Security Notice: Only valid .json files can be imported.');
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target.result);
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          throw new Error('Malformed JSON structure');
        }

        // Validate and sanitize data schema
        const sanitized = {
          templateId: typeof raw.templateId === 'string' ? raw.templateId : 'canva-minimal-slate',
          personalInfo: {
            fullName: String(raw.personalInfo?.fullName || ''),
            jobTitle: String(raw.personalInfo?.jobTitle || ''),
            email: String(raw.personalInfo?.email || ''),
            phone: String(raw.personalInfo?.phone || ''),
            summary: String(raw.personalInfo?.summary || ''),
            profilePicture: typeof raw.personalInfo?.profilePicture === 'string' && raw.personalInfo.profilePicture.startsWith('data:image/')
              ? raw.personalInfo.profilePicture
              : null,
          },
          experience: Array.isArray(raw.experience) ? raw.experience.slice(0, 50).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            company: String(item.company || ''),
            role: String(item.role || ''),
            duration: String(item.duration || ''),
            description: String(item.description || ''),
          })) : [],
          education: Array.isArray(raw.education) ? raw.education.slice(0, 30).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            school: String(item.school || ''),
            degree: String(item.degree || ''),
            duration: String(item.duration || ''),
          })) : [],
          skills: Array.isArray(raw.skills) ? raw.skills.slice(0, 100).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            name: String(item.name || ''),
          })) : [],
          projects: Array.isArray(raw.projects) ? raw.projects.slice(0, 50).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            name: String(item.name || ''),
            description: String(item.description || ''),
          })) : [],
          certifications: Array.isArray(raw.certifications) ? raw.certifications.slice(0, 50).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            name: String(item.name || ''),
            issuer: String(item.issuer || ''),
            date: String(item.date || ''),
          })) : [],
          languages: Array.isArray(raw.languages) ? raw.languages.slice(0, 30).map(item => ({
            id: String(item.id || Date.now() + Math.random()),
            name: String(item.name || ''),
            percentage: Number(item.percentage) || 100,
          })) : [],
          themeConfig: {
            primaryColor: String(raw.themeConfig?.primaryColor || '#4A72B2'),
            fontFamily: String(raw.themeConfig?.fontFamily || 'Inter, sans-serif'),
            spacing: String(raw.themeConfig?.spacing || 'medium'),
          },
          sectionOrder: Array.isArray(raw.sectionOrder) ? raw.sectionOrder : [
            'personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'
          ],
          sectionVisibility: typeof raw.sectionVisibility === 'object' && raw.sectionVisibility !== null
            ? raw.sectionVisibility
            : {},
        };

        setResumeData(sanitized);
        showToast('Imported resume successfully!');
      } catch (_err) {
        alert('Invalid or corrupted JSON file format. Import aborted.');
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  const handleLoadDemoProfile = (profile) => {
    setShowProfileMenu(false);
    setResumeData((prev) => ({
      ...prev,
      ...profile.data,
      templateId: prev.templateId,
      id: prev.id,
      title: `${profile.name} Resume`,
    }));
    showToast(`Loaded "${profile.name}" demo profile.`);
  };

  const handleOpenAiPolish = ({ text, contextTitle, onApply }) => {
    setAiModalState({
      isOpen: true,
      text,
      contextTitle,
      onApply,
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1E293B',
          color: '#F8FAFC',
          padding: '10px 20px',
          borderRadius: '24px',
          fontSize: '13.5px',
          fontWeight: 600,
          zIndex: 2000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 0.2s ease-out',
        }}>
          <Check size={16} color="#10B981" />
          {toastMessage}
        </div>
      )}

      {/* Top Application Bar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 50,
      }}>
        {/* Left Side: Back & Editable Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link to="/home" className="icon-btn" style={{ textDecoration: 'none' }} title="Back to Dashboard">
            <ArrowLeft size={19} />
          </Link>
          <input
            type="text"
            value={resumeData.title || ''}
            onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Untitled Resume"
            style={{
              fontWeight: '600',
              fontSize: '15px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderRadius: '4px',
              padding: '4px 8px',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              width: '240px',
              outline: 'none',
              cursor: 'pointer',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-color)')}
            onBlur={(e) => (e.target.style.borderColor = 'transparent')}
          />
          {isAuthenticated ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '11.5px', color: '#10B981', fontWeight: 600, padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              ● Synced ({user?.name?.split(' ')[0]})
            </span>
          ) : (
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: 10, backgroundColor: 'var(--bg-color)' }}>
              Guest Draft
            </span>
          )}
        </div>

        {/* Center / Right Toolbar Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* 1-Click Demo Profiles Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="apple-btn secondary"
              style={{ padding: '7px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Load Profile</span>
              <ChevronDown size={14} />
            </button>

            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '6px',
                width: '280px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                zIndex: 100,
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}>
                <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Industry Sample Data
                </div>
                {industryProfiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleLoadDemoProfile(p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span style={{ fontSize: '16px' }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Real-time ATS Quality Score Badge */}
          <button
            onClick={() => setIsAtsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: getScoreColor(atsScore) + '18',
              border: `1px solid ${getScoreColor(atsScore)}`,
              color: getScoreColor(atsScore),
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Click to view ATS Scorecard and Job Match Scanner"
          >
            <Target size={15} />
            ATS: {atsScore}/100
          </button>

          {/* In-Editor Template Switcher Drawer Button */}
          <button
            onClick={() => setIsTemplateDrawerOpen(true)}
            className="apple-btn secondary"
            style={{ padding: '7px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LayoutTemplate size={15} />
            <span>Templates</span>
          </button>

          {/* Export Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="apple-btn"
              style={{ padding: '7px 16px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={15} />
              <span>Export</span>
              <ChevronDown size={14} />
            </button>

            {showExportMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '230px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                zIndex: 100,
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}>
                <button
                  onClick={handlePrint}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Download size={15} color="var(--accent-color)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Download PDF</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Standard A4 print file</div>
                  </div>
                </button>

                <button
                  onClick={handleBrowserPrint}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Printer size={15} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Print / Save via Browser</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>System print dialogue</div>
                  </div>
                </button>

                <button
                  onClick={handleCopyPlainText}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Copy size={15} color="#10B981" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Copy Plain ATS Text</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>For Workday / Greenhouse forms</div>
                  </div>
                </button>

                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

                <button
                  onClick={handleExportJSON}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileJson size={15} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Export JSON</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Backup raw resume schema</div>
                  </div>
                </button>

                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleImportJSON}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Upload size={15} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Import JSON</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Restore from previous backup</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* User Account Menu */}
          <UserMenu />
        </div>
      </header>

      {/* Split Workspace */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Editor Form Side (Left) */}
        <section style={{ width: '45%', overflowY: 'auto', padding: '32px', borderRight: '1px solid var(--border-color)' }}>
          <EditorForm
            data={resumeData}
            setData={setResumeData}
            onOpenAiPolish={handleOpenAiPolish}
            onOpenAtsModal={() => setIsAtsModalOpen(true)}
          />
        </section>

        {/* Live Preview Side (Right) */}
        <section style={{ width: '55%', overflowY: 'auto', padding: '32px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
          <div ref={componentRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <LivePreview data={resumeData} />
          </div>
        </section>
      </main>

      {/* In-Editor Template Switcher Drawer */}
      <TemplateDrawer
        isOpen={isTemplateDrawerOpen}
        onClose={() => setIsTemplateDrawerOpen(false)}
        currentTemplateId={resumeData.templateId}
        onSelectTemplate={(newId) => {
          setResumeData((prev) => ({ ...prev, templateId: newId }));
          setSearchParams({ template: newId });
          showToast('Template updated!');
        }}
        sampleData={resumeData}
      />

      {/* ATS Readiness & Job Match Modal */}
      <AtsScoreModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        resumeData={resumeData}
        onOpenAiPolish={handleOpenAiPolish}
      />

      {/* AI Polish Modal */}
      <AiPolishModal
        isOpen={aiModalState.isOpen}
        onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
        originalText={aiModalState.text}
        contextTitle={aiModalState.contextTitle}
        onApply={(polished) => {
          aiModalState.onApply(polished);
          showToast('Applied AI enhancement!');
        }}
      />
    </div>
  );
}
