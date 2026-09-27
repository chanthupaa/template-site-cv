import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

export default function PersonalInfoSection({ data, setData, inputStyle, onOpenAiPolish }) {
  const fileInputRef = useRef(null);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Invalid file format. Please upload an image file (PNG, JPG, or WEBP).');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // Maximum 1.5MB to protect local storage quota
      const MAX_SIZE = 1.5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert('Image too large. Please select a profile picture under 1.5 MB.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profilePicture: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, profilePicture: null }
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Personal Information</h2>
      
      {/* Profile Picture Upload */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Profile Picture</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {data.personalInfo.profilePicture ? (
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              <img 
                src={data.personalInfo.profilePicture} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
              <button
                onClick={removeProfilePicture}
                style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: 'var(--error-color)', color: 'white',
                  border: 'none', borderRadius: '50%', width: '24px', height: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div 
              style={{
                width: '80px', height: '80px', borderRadius: '50%',
                backgroundColor: 'var(--bg-color)', border: '1px dashed var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <Upload size={24} />
            </div>
          )}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-upload"
            />
            <label 
              htmlFor="profile-upload"
              style={{
                display: 'inline-block', padding: '8px 16px',
                backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)',
                borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
              }}
            >
              Upload Image
            </label>
          </div>
        </div>
      </div>

      <input
        style={inputStyle}
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={data.personalInfo.fullName || ''}
        onChange={handlePersonalInfoChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={data.personalInfo.jobTitle || ''}
        onChange={handlePersonalInfoChange}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={data.personalInfo.email || ''}
          onChange={handlePersonalInfoChange}
        />
        <input
          style={inputStyle}
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.personalInfo.phone || ''}
          onChange={handlePersonalInfoChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Professional Summary
        </label>
        {onOpenAiPolish && (
          <button
            type="button"
            onClick={() => onOpenAiPolish({
              text: data.personalInfo.summary || '',
              contextTitle: `${data.personalInfo.jobTitle || 'Professional'} Summary`,
              onApply: (newSummary) => {
                setData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, summary: newSummary }
                }));
              }
            })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: 'var(--accent-color)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            ✨ Polish with AI
          </button>
        )}
      </div>
      <textarea
        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        name="summary"
        placeholder="Professional Summary"
        value={data.personalInfo.summary || ''}
        onChange={handlePersonalInfoChange}
      />
    </div>
  );
}
