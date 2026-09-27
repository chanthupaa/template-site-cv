import React from 'react';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SkillsSection({ data, setData, inputStyle }) {
  const handleSkillChange = (id, value) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, name: value } : skill
      )
    }));
  };

  const addSkill = () => {
    setData(prev => ({
      ...prev,
      skills: [
        ...(prev.skills || []), 
        { id: Date.now().toString(), name: '' }
      ]
    }));
  };

  const removeSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill.id !== id)
    }));
  };

  const moveLeft = (index) => {
    if (index === 0) return;
    setData(prev => {
      const newItems = [...(prev.skills || [])];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, skills: newItems };
    });
  };

  const moveRight = (index) => {
    if (index === (data.skills || []).length - 1) return;
    setData(prev => {
      const newItems = [...(prev.skills || [])];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, skills: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Skills</h2>
        <button onClick={addSkill} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {(data.skills || []).map((skill, index) => (
          <div key={skill.id} className="item-container" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-color)', borderRadius: '20px', padding: '4px 12px', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => moveLeft(index)}
              disabled={index === 0}
              style={{ background: 'none', border: 'none', color: index === 0 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', padding: 0, marginRight: '4px' }}
            >
              <ArrowLeft size={14} />
            </button>
            <input
              style={{ ...inputStyle, border: 'none', backgroundColor: 'transparent', padding: '4px', marginBottom: 0, width: '120px' }}
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) => handleSkillChange(skill.id, e.target.value)}
            />
            <button 
              onClick={() => moveRight(index)}
              disabled={index === (data.skills || []).length - 1}
              style={{ background: 'none', border: 'none', color: index === (data.skills || []).length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === (data.skills || []).length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', padding: 0, marginLeft: '4px', marginRight: '4px' }}
            >
              <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => removeSkill(skill.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
