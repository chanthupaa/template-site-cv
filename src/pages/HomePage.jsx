import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Moon,
  Sun,
  Copy,
  Trash2,
  Edit2,
  LayoutTemplate,
  Clock,
  Cloud,
  CheckCircle2,
  LogIn,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ScaledResumeThumbnail from '../components/ScaledResumeThumbnail';
import { TEMPLATES_LIST, TAG_COLORS } from '../data/templatesData';
import UserMenu from '../components/auth/UserMenu';

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, getUserResumes, saveResume, deleteResume, duplicateResume, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const loadResumes = useCallback(() => {
    const list = getUserResumes();
    setResumes(list);
  }, [getUserResumes]);

  useEffect(() => {
    loadResumes();
  }, [loadResumes, user]);

  const handleCreateNew = () => {
    const newId = `resume-${Date.now()}`;
    const newResume = {
      id: newId,
      title: 'New Resume',
      templateId: 'canva-minimal-slate',
      personalInfo: {
        fullName: 'Candidate Name',
        jobTitle: 'Target Job Title',
        email: 'email@domain.com',
        phone: '(555) 000-0000',
        summary: 'Brief summary outlining your professional background, core accomplishments, and skills.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Company Name',
          role: 'Job Title',
          duration: '2022 — Present',
          description: 'Spearheaded key initiatives, increasing team productivity by 25%.',
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Degree / Major',
          school: 'University or College',
          duration: '2018 — 2022',
        },
      ],
      skills: [
        { id: 'sk-1', name: 'Communication' },
        { id: 'sk-2', name: 'Problem Solving' },
        { id: 'sk-3', name: 'Leadership' },
      ],
      languages: [
        { id: 'lang-1', name: 'English', percentage: 100 },
      ],
      projects: [],
      certifications: [],
      themeConfig: {
        primaryColor: '#4A72B2',
        fontFamily: 'Inter, sans-serif',
        spacing: 'medium',
      },
      sectionOrder: ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
      sectionVisibility: {},
    };

    saveResume(newResume);
    navigate(`/builder?id=${newId}`);
  };

  const handleDuplicate = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    duplicateResume(id);
    loadResumes();
  };

  const handleDelete = (id, title, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteResume(id);
      loadResumes();
    }
  };

  const handleStartRename = (id, title, e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveRename = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (editTitle.trim()) {
      const target = resumes.find((r) => r.id === id);
      if (target) {
        saveResume({ ...target.data, title: editTitle.trim() });
        loadResumes();
      }
    }
    setEditingId(null);
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'Recently';
    const date = new Date(isoString);
    const now = new Date();
    const diffMin = Math.floor((now - date) / (1000 * 60));
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="container" style={{ padding: '48px 24px', minHeight: '100vh', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" className="icon-btn" style={{ textDecoration: 'none' }} title="Back to Home">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'Merriweather, serif', margin: 0 }}>
              Your Workspace
            </h1>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              Manage multiple tailored CVs for different jobs &amp; industries
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/templates" className="apple-btn secondary" style={{ padding: '10px 18px', textDecoration: 'none', fontSize: '13.5px' }}>
            <LayoutTemplate size={16} />
            Browse {TEMPLATES_LIST.length} Templates
          </Link>
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <UserMenu />
          <button
            onClick={handleCreateNew}
            className="apple-btn"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <Plus size={18} strokeWidth={2} />
            New Resume
          </button>
        </div>
      </header>

      {/* Cloud Sync Status Banner */}
      <div
        style={{
          marginBottom: '32px',
          padding: '14px 20px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: isAuthenticated ? 'rgba(34, 197, 94, 0.12)' : 'rgba(37, 99, 235, 0.12)',
              color: isAuthenticated ? '#22C55E' : '#38BDF8',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {isAuthenticated ? <CheckCircle2 size={20} /> : <Cloud size={20} />}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isAuthenticated ? `Cloud Database Active (${user?.name})` : 'Local Guest Mode'}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              {isAuthenticated
                ? `All resumes are securely stored in your personal database under ${user?.email}.`
                : 'Resumes are saved locally in this browser. Sign in or create an account to sync to your database.'}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <button
            onClick={() => openAuthModal('signup')}
            className="apple-btn"
            style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <LogIn size={14} />
            <span>Create Account / Sign In</span>
          </button>
        )}
      </div>

      {/* Resumes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '32px' }}>
        {/* Create New Card */}
        <div
          onClick={handleCreateNew}
          className="editorial-card"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '420px',
            cursor: 'pointer',
            borderStyle: 'dashed',
            borderWidth: '2px',
            borderColor: 'var(--border-color)',
            background: 'var(--bg-surface)',
            boxShadow: 'none',
            borderRadius: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-color)';
            e.currentTarget.style.backgroundColor = 'var(--accent-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
          }}
        >
          <div style={{
            background: 'var(--accent-color)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}>
            <Plus size={26} color="white" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>Start Fresh</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', textAlign: 'center', maxWidth: '200px', margin: 0 }}>
            Create a blank resume tailored for your next role
          </p>
        </div>

        {/* Existing Saved Resumes */}
        {resumes.map((item) => {
          const tplInfo = TEMPLATES_LIST.find((t) => t.id === item.data?.templateId) || TEMPLATES_LIST[0];
          const tagColor = TAG_COLORS[tplInfo.tag] || '#666';

          return (
            <div
              key={item.id}
              className="editorial-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '420px',
                padding: '16px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Scaled Live Thumbnail */}
              <div
                onClick={() => navigate(`/builder?id=${item.id}&template=${item.data?.templateId || 'canva-minimal-slate'}`)}
                style={{
                  flex: 1,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <ScaledResumeThumbnail
                  templateId={item.data?.templateId || 'canva-minimal-slate'}
                  data={item.data || {}}
                />

                {/* Category Badge */}
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: tagColor,
                  color: '#FFFFFF',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  zIndex: 10,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                }}>
                  {tplInfo.tag}
                </span>
              </div>

              {/* Card Meta & Actions */}
              <div style={{ paddingTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  {editingId === item.id ? (
                    <div style={{ display: 'flex', gap: '4px', flex: 1, marginRight: '8px' }}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        style={{
                          width: '100%',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--accent-color)',
                          fontSize: '14px',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      <button
                        onClick={(e) => handleSaveRename(item.id, e)}
                        className="apple-btn"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '190px' }}>
                      <h3
                        onClick={() => navigate(`/builder?id=${item.id}`)}
                        style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          margin: 0,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <button
                        onClick={(e) => handleStartRename(item.id, item.title, e)}
                        title="Rename resume"
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      onClick={(e) => handleDuplicate(item.id, e)}
                      title="Duplicate resume"
                      className="icon-btn"
                      style={{ padding: '5px' }}
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, item.title, e)}
                      title="Delete resume"
                      className="icon-btn"
                      style={{ padding: '5px', color: '#EF4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span>{tplInfo.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} /> {formatRelativeTime(item.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
