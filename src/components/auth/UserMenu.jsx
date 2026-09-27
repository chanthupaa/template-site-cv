import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, ChevronDown, CheckCircle2, FileText, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function UserMenu() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => openAuthModal('signin')}
          className="apple-btn secondary"
          style={{
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            borderRadius: '20px',
          }}
        >
          <LogIn size={15} />
          <span>Sign In</span>
        </button>
      </div>
    );
  }

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 10px 4px 5px',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        aria-label="User Account Menu"
      >
        {/* Avatar circle */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-color)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {getInitials(user?.name)}
        </div>

        <span style={{ fontSize: '13px', fontWeight: 600, maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {user?.name?.split(' ')[0] || 'Account'}
        </span>

        {/* Cloud Sync Dot */}
        <span
          title="Cloud Database Synced"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)',
          }}
        />

        <ChevronDown size={14} color="var(--text-secondary)" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            width: '240px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
            padding: '8px',
            animation: 'fadeIn 0.15s ease-out',
            color: 'var(--text-primary)',
          }}
        >
          {/* User Header */}
          <div style={{ padding: '8px 10px 10px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700, fontSize: '13.5px' }}>{user?.name}</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', overflowWrap: 'anywhere' }}>
              {user?.email}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: '10.5px', color: '#22C55E', fontWeight: 600, background: 'rgba(34, 197, 94, 0.1)', padding: '2px 6px', borderRadius: 10 }}>
              <CheckCircle2 size={11} />
              <span>Cloud Database Active</span>
            </div>
          </div>

          {/* Links */}
          <div style={{ padding: '6px 0' }}>
            <Link
              to="/home"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FileText size={15} color="var(--text-secondary)" />
              <span>My Saved Resumes</span>
            </Link>

            <Link
              to="/builder"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-color)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Plus size={15} color="var(--text-secondary)" />
              <span>New Resume</span>
            </Link>
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

          {/* Sign Out */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
              navigate('/');
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              fontSize: '13px',
              color: '#EF4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '6px',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
