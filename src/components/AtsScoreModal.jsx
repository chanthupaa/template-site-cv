import React, { useState, useRef, useEffect } from 'react';
import { Target, CheckCircle2, AlertCircle, XCircle, X, Search } from 'lucide-react';
import { calculateATSScore, scanJobMatch } from '../services/aiAssistantService';

export default function AtsScoreModal({ isOpen, onClose, resumeData }) {
  const [activeTab, setActiveTab] = useState('scorecard'); // 'scorecard' | 'scanner'
  const [jobDescription, setJobDescription] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const { score, checks, matchedVerbs, metricsCount } = calculateATSScore(resumeData);

  const getScoreColor = (s) => {
    if (s >= 80) return '#10B981'; // green
    if (s >= 60) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const getScoreLabel = (s) => {
    if (s >= 85) return 'Interview Ready';
    if (s >= 70) return 'Strong ATS Compatibility';
    if (s >= 50) return 'Good — Minor Polish Needed';
    return 'Action Needed — High Rejection Risk';
  };

  const handleScan = () => {
    if (!jobDescription.trim()) return;
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
    }
    setIsScanning(true);
    scanTimerRef.current = setTimeout(() => {
      const result = scanJobMatch(resumeData, jobDescription);
      setScanResult(result);
      setIsScanning(false);
    }, 400);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        borderRadius: '14px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: getScoreColor(score) + '20',
              color: getScoreColor(score),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Target size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>ATS Resume Scorecard &amp; Job Match</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                Real-time parsing simulation for Workday, Greenhouse, Taleo &amp; Lever
              </p>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 24px',
          backgroundColor: 'var(--bg-color)',
          gap: '24px',
        }}>
          <button
            onClick={() => setActiveTab('scorecard')}
            style={{
              padding: '14px 4px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'scorecard' ? '2px solid var(--accent-color)' : '2px solid transparent',
              color: activeTab === 'scorecard' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: getScoreColor(score) + '25',
              color: getScoreColor(score),
              fontSize: '12px',
              fontWeight: 700,
            }}>
              {score}/100
            </span>
            ATS Readiness Checklist
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            style={{
              padding: '14px 4px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'scanner' ? '2px solid var(--accent-color)' : '2px solid transparent',
              color: activeTab === 'scanner' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Search size={15} />
            Job Description Keyword Match
          </button>
        </div>

        {/* Tab 1: Readiness Scorecard */}
        {activeTab === 'scorecard' && (
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
            {/* Score Hero Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: `6px solid ${getScoreColor(score)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-surface)',
                }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1, color: getScoreColor(score) }}>{score}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>OUT OF 100</span>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {getScoreLabel(score)}
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.4' }}>
                    {score >= 80
                      ? 'Your resume incorporates strong action verbs, quantifiable metrics, and complete section structures.'
                      : 'Address the checklist items below to ensure automated ATS screening software does not filter out your CV.'}
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Action Verbs: <strong style={{ color: 'var(--text-primary)' }}>{matchedVerbs.length}</strong>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Metrics/Numbers: <strong style={{ color: 'var(--text-primary)' }}>{metricsCount}</strong>
                </div>
              </div>
            </div>

            {/* Checklist of criteria */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                System Evaluation Criteria
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {checks.map((c) => {
                  const isPass = c.status === 'pass';
                  const isWarn = c.status === 'warning';
                  const Icon = isPass ? CheckCircle2 : isWarn ? AlertCircle : XCircle;
                  const color = isPass ? '#10B981' : isWarn ? '#F59E0B' : '#EF4444';

                  return (
                    <div
                      key={c.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <Icon size={18} color={color} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {c.label}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color }}>
                            +{c.pts} pts
                          </span>
                        </div>
                        {c.tip && (
                          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                            💡 {c.tip}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Job Description Scanner */}
        {activeTab === 'scanner' && (
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
            <p style={{ margin: '0 0 12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Paste the job posting description you are targeting. We will scan your CV against the role requirements, extracting matching terms and identifying missing keywords.
            </p>

            <textarea
              rows={5}
              placeholder="Paste job description here (e.g. responsibilities, required skills, tools, qualifications)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                resize: 'vertical',
                marginBottom: '14px',
              }}
            />

            <button
              onClick={handleScan}
              disabled={isScanning || !jobDescription.trim()}
              className="apple-btn"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                opacity: !jobDescription.trim() ? 0.6 : 1,
              }}
            >
              <Search size={16} /> {isScanning ? 'Analyzing Keywords...' : 'Scan Job Match'}
            </button>

            {/* Scan Results */}
            {scanResult && (
              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '20px',
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Keyword Match Rate</span>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: getScoreColor(scanResult.matchPercentage) }}>
                      {scanResult.matchPercentage}%
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span>{scanResult.matchedKeywords.length} of {scanResult.totalKeywordsScanned} target keywords found</span>
                  </div>
                </div>

                {/* Matched Keywords */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Matched Keywords in Your CV ({scanResult.matchedKeywords.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {scanResult.matchedKeywords.length > 0 ? (
                      scanResult.matchedKeywords.map((kw, i) => (
                        <span key={i} style={{ padding: '4px 10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10B981', borderRadius: '16px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>No matching keywords detected.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#EF4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={16} /> Missing High-Priority Keywords ({scanResult.missingKeywords.length})
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Consider incorporating these relevant terms into your Skills, Experience, or Summary if you have experience with them:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {scanResult.missingKeywords.map((kw, i) => (
                      <span key={i} style={{ padding: '4px 10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '16px', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'var(--bg-color)',
        }}>
          <button onClick={onClose} className="apple-btn" style={{ padding: '8px 24px', fontSize: '14px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
