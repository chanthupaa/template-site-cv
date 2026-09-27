import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function EducationSection({ data, setData, inputStyle }) {
  const handleEducationChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []), 
        { id: Date.now().toString(), degree: '', school: '', duration: '', description: '' }
      ]
    }));
  };

  const removeEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: (prev.education || []).filter(edu => edu.id !== id)
    }));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setData(prev => {
      const newItems = [...(prev.education || [])];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, education: newItems };
    });
  };

  const moveDown = (index) => {
    if (index === (data.education || []).length - 1) return;
    setData(prev => {
      const newItems = [...(prev.education || [])];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, education: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Education</h2>
        <button onClick={addEducation} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      {(data.education || []).map((edu, index) => (
        <div key={edu.id} className="item-container" style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => moveUp(index)}
              disabled={index === 0}
              style={{ background: 'none', border: 'none', color: index === 0 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === 0 ? 'default' : 'pointer', padding: 0 }}
            >
              <ArrowUp size={16} />
            </button>
            <button 
              onClick={() => moveDown(index)}
              disabled={index === (data.education || []).length - 1}
              style={{ background: 'none', border: 'none', color: index === (data.education || []).length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === (data.education || []).length - 1 ? 'default' : 'pointer', padding: 0 }}
            >
              <ArrowDown size={16} />
            </button>
            <button 
              onClick={() => removeEducation(edu.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, marginLeft: '8px' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <input
            style={{ ...inputStyle, width: 'calc(100% - 80px)' }}
            type="text"
            placeholder="Degree (e.g. B.S. Computer Science)"
            value={edu.degree}
            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input
              style={inputStyle}
              type="text"
              placeholder="School / University"
              value={edu.school}
              onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Duration (e.g. 2016 - 2020)"
              value={edu.duration}
              onChange={(e) => handleEducationChange(edu.id, 'duration', e.target.value)}
            />
          </div>
          <textarea
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder="Description (Optional)"
            value={edu.description}
            onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
