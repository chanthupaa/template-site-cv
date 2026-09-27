import React from 'react';
import { Palette, Type, Maximize } from 'lucide-react';

export default function ThemeSection({ data, setData, inputStyle }) {
  const handleThemeChange = (field, value) => {
    setData(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        [field]: value
      }
    }));
  };

  const fontOptions = [
    { label: 'Sans Serif (Open Sans)', value: 'Open Sans, sans-serif' },
    { label: 'Serif (Merriweather)', value: 'Merriweather, serif' },
    { label: 'Monospace (Roboto Mono)', value: 'Roboto Mono, monospace' },
    { label: 'System UI', value: 'system-ui, sans-serif' }
  ];

  const spacingOptions = [
    { label: 'Compact', value: 'compact' },
    { label: 'Medium', value: 'medium' },
    { label: 'Relaxed', value: 'relaxed' }
  ];

  // Provide defaults if themeConfig doesn't exist
  const theme = data.themeConfig || {
    primaryColor: '#4A72B2',
    fontFamily: 'Open Sans, sans-serif',
    spacing: 'medium'
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Theme Controls</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Color */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            <Palette size={16} /> Primary Color
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input 
              type="color" 
              value={theme.primaryColor} 
              onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
              style={{
                width: '40px',
                height: '40px',
                padding: '0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: 'transparent'
              }}
            />
            <input
              type="text"
              value={theme.primaryColor}
              onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
              style={{ ...inputStyle, marginBottom: 0, width: '120px' }}
            />
          </div>
        </div>

        {/* Typography */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            <Type size={16} /> Typography
          </label>
          <select 
            value={theme.fontFamily} 
            onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, cursor: 'pointer' }}
          >
            {fontOptions.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>

        {/* Spacing */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            <Maximize size={16} /> Spacing
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {spacingOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleThemeChange('spacing', option.value)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: theme.spacing === option.value ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                  backgroundColor: theme.spacing === option.value ? 'var(--primary-light)' : 'var(--bg-color)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: theme.spacing === option.value ? '600' : '400',
                  fontSize: '13px'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
