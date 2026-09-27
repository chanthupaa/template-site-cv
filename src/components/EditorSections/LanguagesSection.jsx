import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function LanguagesSection({ data, setData, inputStyle }) {
  const handleLanguageChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: field === 'percentage' ? Number(value) : value } : lang
      )
    }));
  };

  const addLanguage = () => {
    setData(prev => ({
      ...prev,
      languages: [
        ...(prev.languages || []), 
        { id: Date.now().toString(), name: '', percentage: 50 }
      ]
    }));
  };

  const removeLanguage = (id) => {
    setData(prev => ({
      ...prev,
      languages: (prev.languages || []).filter(lang => lang.id !== id)
    }));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setData(prev => {
      const newItems = [...(prev.languages || [])];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, languages: newItems };
    });
  };

  const moveDown = (index) => {
    if (index === (data.languages || []).length - 1) return;
    setData(prev => {
      const newItems = [...(prev.languages || [])];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, languages: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Languages</h2>
        <button onClick={addLanguage} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      {(data.languages || []).map((lang, index) => (
        <div key={lang.id} className="item-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
          <input
            style={{ ...inputStyle, marginBottom: 0 }}
            type="text"
            placeholder="Language"
            value={lang.name}
            onChange={(e) => handleLanguageChange(lang.id, 'name', e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={lang.percentage}
            onChange={(e) => handleLanguageChange(lang.id, 'percentage', e.target.value)}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <button 
            onClick={() => moveUp(index)}
            disabled={index === 0}
            style={{ background: 'none', border: 'none', color: index === 0 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === 0 ? 'default' : 'pointer', padding: '4px' }}
          >
            <ArrowUp size={16} />
          </button>
          <button 
            onClick={() => moveDown(index)}
            disabled={index === (data.languages || []).length - 1}
            style={{ background: 'none', border: 'none', color: index === (data.languages || []).length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === (data.languages || []).length - 1 ? 'default' : 'pointer', padding: '4px' }}
          >
            <ArrowDown size={16} />
          </button>
          <button onClick={() => removeLanguage(lang.id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
