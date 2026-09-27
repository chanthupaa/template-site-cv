import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function CertificationsSection({ data, setData, inputStyle }) {
  const handleCertificationChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addCertification = () => {
    setData(prev => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []), 
        { id: Date.now().toString(), name: '', issuer: '', date: '' }
      ]
    }));
  };

  const removeCertification = (id) => {
    setData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(cert => cert.id !== id)
    }));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setData(prev => {
      const newItems = [...(prev.certifications || [])];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      return { ...prev, certifications: newItems };
    });
  };

  const moveDown = (index) => {
    if (index === (data.certifications || []).length - 1) return;
    setData(prev => {
      const newItems = [...(prev.certifications || [])];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      return { ...prev, certifications: newItems };
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Certifications</h2>
        <button onClick={addCertification} className="icon-btn" style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-color)' }}>
          <Plus size={18} />
        </button>
      </div>

      {(data.certifications || []).map((cert, index) => (
        <div key={cert.id} className="item-container" style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
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
              disabled={index === (data.certifications || []).length - 1}
              style={{ background: 'none', border: 'none', color: index === (data.certifications || []).length - 1 ? 'var(--border-color)' : 'var(--text-secondary)', cursor: index === (data.certifications || []).length - 1 ? 'default' : 'pointer', padding: 0 }}
            >
              <ArrowDown size={16} />
            </button>
            <button 
              onClick={() => removeCertification(cert.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, marginLeft: '8px' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <input
            style={{ ...inputStyle, width: 'calc(100% - 80px)' }}
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e) => handleCertificationChange(cert.id, 'issuer', e.target.value)}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Date / Year"
              value={cert.date}
              onChange={(e) => handleCertificationChange(cert.id, 'date', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
