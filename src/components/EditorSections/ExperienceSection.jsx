import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function ExperienceSection({ data, setData, inputStyle, onOpenAiPolish }) {
  const handleExperienceChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [
        ...prev.experience, 
        { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }
      ]
    }));
  };

  const removeExperience = (id) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    setData(prev => {
      if (index <= 0 || index >= prev.experience.length) return prev;
      const newItems = [...prev.experience];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, experience: newItems };
    });
  };

  const moveDown = (index) => {
    setData(prev => {
      if (index < 0 || index >= prev.experience.length - 1) return prev;
      const newItems = [...prev.experience];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, experience: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Experience</h2>
        <button onClick={addExperience} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      {data.experience.map((exp, index) => (
        <div key={exp.id} className="item-container" style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
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
              disabled={index === data.experience.length - 1}
              style={{ background: 'none', border: 'none', color: index === data.experience.length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === data.experience.length - 1 ? 'default' : 'pointer', padding: 0 }}
            >
              <ArrowDown size={16} />
            </button>
            <button 
              onClick={() => removeExperience(exp.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, marginLeft: '8px' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <input
            style={{ ...inputStyle, width: 'calc(100% - 80px)' }}
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Duration (e.g. 2020 - Present)"
              value={exp.duration}
              onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', marginTop: '8px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-secondary)' }}>
              Responsibilities & Achievements
            </label>
            {onOpenAiPolish && (
              <button
                type="button"
                onClick={() => onOpenAiPolish({
                  text: exp.description || '',
                  contextTitle: `${exp.role || 'Role'} at ${exp.company || 'Company'}`,
                  onApply: (newDesc) => {
                    handleExperienceChange(exp.id, 'description', newDesc);
                  }
                })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-color)',
                  fontSize: '12px',
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
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder="Description (use action verbs and measurable results)"
            value={exp.description}
            onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
