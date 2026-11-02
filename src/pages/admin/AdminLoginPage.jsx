import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const [username, setUsername] = useState('admin@dumandco.com');
  const [password, setPassword] = useState('dumco2026');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const res = loginAdmin(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  const handleQuickDemoAdmin = () => {
    loginAdmin('admin@dumandco.com', 'dumco2026');
    navigate('/admin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1E1B19',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-modal)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#2A2522',
          padding: '2.5rem 2rem 1.75rem',
          textAlign: 'center',
          color: '#FAF2EE'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.35rem',
            fontFamily: "'Playfair Display', serif",
            margin: '0 auto 1rem'
          }}>
            D
          </div>
          <h1 style={{ fontSize: '1.5rem', color: '#FFF8F5', margin: '0 0 4px', fontFamily: "'Playfair Display', serif" }}>
            Dum & Co. Management
          </h1>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)', fontWeight: 700 }}>
            Restricted Executive Portal
          </span>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem' }}>
          {/* 1-Click Fast Admin Access */}
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--secondary-glow)',
              color: 'var(--secondary)',
              border: '1.5px solid #FDE68A',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={16} />
            <span>Instant Demo Admin Access (1-Click)</span>
          </button>

          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Staff Email ID</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-dum"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Security Passcode</label>
              <div style={{ position: 'relative' }}>
                <Key size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dum"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem', fontSize: '0.9375rem' }}
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              &larr; Return to Customer Dining Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
