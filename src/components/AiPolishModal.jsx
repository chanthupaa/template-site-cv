import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Check, Copy, X, Key, RefreshCw, Wand2 } from 'lucide-react';
import { improveTextWithAI } from '../services/aiAssistantService';

export default function AiPolishModal({ isOpen, onClose, originalText, onApply, contextTitle = 'Text' }) {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('impact');
  const [source, setSource] = useState('local');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await improveTextWithAI(originalText, 'experience', contextTitle);
      if (res.success && res.variants) {
        setVariants(res.variants);
        setSource(res.source);
      }
    } catch (_e) {
      // Silently proceed to fallback engine
    } finally {
      setLoading(false);
    }
  }, [originalText, contextTitle]);

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, handleGenerate]);

  const handleSaveApiKey = () => {
    try {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    } catch (_e) {
      // Ignore
    }
    setShowKeyConfig(false);
    handleGenerate();
  };

  const handleCopy = async (text, key) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch (_err) {
      // Ignore
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

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
        borderRadius: '12px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>AI Resume Enhancer</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                Transform weak wording into measurable, high-converting ATS statements
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              title="Configure Gemini API Key"
              className="icon-btn"
              style={{ padding: '6px', fontSize: '12px' }}
            >
              <Key size={16} />
            </button>
            <button onClick={onClose} className="icon-btn" style={{ padding: '6px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Drawer (Optional) */}
        {showKeyConfig && (
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'var(--bg-color)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '13px',
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: 500 }}>
              Optional: Custom Google Gemini API Key
            </p>
            <p style={{ margin: '0 0 10px', color: 'var(--text-secondary)', fontSize: '12px' }}>
              Leave blank to use our built-in offline NLP engine (free &amp; unlimited), or enter a key for direct cloud model inference.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                }}
              />
              <button
                onClick={handleSaveApiKey}
                className="apple-btn"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Original Preview */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Original Draft
            </div>
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '13.5px',
              lineHeight: '1.5',
              fontStyle: originalText ? 'normal' : 'italic',
              color: originalText ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}>
              {originalText || 'No text provided. AI will generate a professional starter statement.'}
            </div>
          </div>

          {/* AI Variants */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AI Enhanced Alternatives
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-color)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={13} className={loading ? 'spin' : ''} />
                Regenerate
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Sparkles size={28} style={{ animation: 'spin 1.5s linear infinite', marginBottom: '10px' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Polishing with action verbs &amp; impact metrics...</p>
              </div>
            ) : variants ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 1. Impact Option */}
                <div
                  onClick={() => setSelectedVariant('impact')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px solid ${selectedVariant === 'impact' ? 'var(--accent-color)' : 'var(--border-color)'}`,
                    backgroundColor: selectedVariant === 'impact' ? 'var(--accent-light)' : 'var(--bg-color)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-color)' }}>
                      <Wand2 size={14} /> Metric-Driven Impact (Recommended)
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(variants.impact, 'impact'); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                    >
                      {copiedKey === 'impact' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                      {copiedKey === 'impact' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                    {variants.impact}
                  </p>
                </div>

                {/* 2. Executive Option */}
                <div
                  onClick={() => setSelectedVariant('executive')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px solid ${selectedVariant === 'executive' ? 'var(--accent-color)' : 'var(--border-color)'}`,
                    backgroundColor: selectedVariant === 'executive' ? 'var(--accent-light)' : 'var(--bg-color)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#3B82F6' }}>
                      👔 Executive &amp; Strategic
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(variants.executive, 'executive'); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                    >
                      {copiedKey === 'executive' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                      {copiedKey === 'executive' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                    {variants.executive}
                  </p>
                </div>

                {/* 3. Concise ATS Option */}
                <div
                  onClick={() => setSelectedVariant('concise')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px solid ${selectedVariant === 'concise' ? 'var(--accent-color)' : 'var(--border-color)'}`,
                    backgroundColor: selectedVariant === 'concise' ? 'var(--accent-light)' : 'var(--bg-color)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#10B981' }}>
                      🎯 ATS Concise
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(variants.concise, 'concise'); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                    >
                      {copiedKey === 'concise' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                      {copiedKey === 'concise' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                    {variants.concise}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-color)',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Engine: {source === 'gemini' ? 'Google Gemini 1.5' : 'Built-in ATS Heuristic Engine'}
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              className="apple-btn secondary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (variants && variants[selectedVariant]) {
                  onApply(variants[selectedVariant]);
                  onClose();
                }
              }}
              className="apple-btn"
              style={{ padding: '8px 22px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={16} /> Apply to Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
