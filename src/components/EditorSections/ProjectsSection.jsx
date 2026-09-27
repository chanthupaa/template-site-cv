import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function ProjectsSection({ data, setData, inputStyle, onOpenAiPolish }) {
  const handleProjectChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []), 
        { id: Date.now().toString(), name: '', link: '', description: '' }
      ]
    }));
  };

  const removeProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(proj => proj.id !== id)
    }));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setData(prev => {
      const newItems = [...(prev.projects || [])];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, projects: newItems };
    });
  };

  const moveDown = (index) => {
    if (index === (data.projects || []).length - 1) return;
    setData(prev => {
      const newItems = [...(prev.projects || [])];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, projects: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Projects</h2>
        <button onClick={addProject} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      {(data.projects || []).map((proj, index) => (
        <div key={proj.id} className="item-container" style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
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
              disabled={index === (data.projects || []).length - 1}
              style={{ background: 'none', border: 'none', color: index === (data.projects || []).length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === (data.projects || []).length - 1 ? 'default' : 'pointer', padding: 0 }}
            >
              <ArrowDown size={16} />
            </button>
            <button 
              onClick={() => removeProject(proj.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, marginLeft: '8px' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <input
            style={{ ...inputStyle, width: 'calc(100% - 80px)' }}
            type="text"
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => handleProjectChange(proj.id, 'name', e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Link (e.g. GitHub URL)"
            value={proj.link}
            onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', marginTop: '8px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-secondary)' }}>
              Project Overview & Impact
            </label>
            {onOpenAiPolish && (
              <button
                type="button"
                onClick={() => onOpenAiPolish({
                  text: proj.description || '',
                  contextTitle: `Project: ${proj.name || 'Key Initiative'}`,
                  onApply: (newDesc) => {
                    handleProjectChange(proj.id, 'description', newDesc);
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
            placeholder="Description of architecture, technologies, and achievements"
            value={proj.description}
            onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
