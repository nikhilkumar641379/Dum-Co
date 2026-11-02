import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModalPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { loginCustomer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCustomer(email || 'aaditya.singhania@gmail.com', name || 'Aaditya Singhania');
    navigate(from, { replace: true });
  };

  const handleQuickDemoLogin = () => {
    loginCustomer('aaditya.singhania@gmail.com', 'Aaditya Singhania');
    navigate(from, { replace: true });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 1rem 6rem' }}>
      <div style={{
        maxWidth: '460px',
        margin: '0 auto',
        backgroundColor: 'var(--surface-raised)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-modal)',
        overflow: 'hidden'
      }}>
        {/* Modal Brand Top */}
        <div style={{
          padding: '2.5rem 2rem 1.75rem',
          textAlign: 'center',
          backgroundColor: 'var(--surface-dark)',
          color: '#FAF2EE'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            fontFamily: "'Playfair Display', serif",
            margin: '0 auto 1rem'
          }}>
            D
          </div>
          <h2 style={{ fontSize: '1.625rem', color: '#FFF8F5', margin: '0 0 6px' }}>
            {isRegister ? 'Join the Royal Dastarkhwan' : 'Welcome to Dum & Co.'}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#A8A29E', margin: 0 }}>
            {isRegister ? 'Create an account for saved handis & exclusive privileges' : 'Sign in to access your orders, wishlist, and rewards'}
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem' }}>
          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--secondary-light)',
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
            <span>Instant Demo Patron Login (1-Click)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--surface-border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Or Continue With Credentials</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--surface-border)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {isRegister && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-dum"
                    style={{ paddingLeft: '2.4rem' }}
                    placeholder="Aaditya Singhania"
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-dum"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="patron@example.com"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-dum"
                    style={{ paddingLeft: '2.4rem' }}
                    placeholder="+91 98201 12345"
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dum"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem', fontSize: '0.9375rem' }}
            >
              <span>{isRegister ? 'Register Royal Account' : 'Sign In to Feast'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New to Dum & Co.?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Create an account
                </button>
              </span>
            )}
          </div>

          {/* Admin Portal Gateway */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--surface-border)', textAlign: 'center' }}>
            <Link to="/admin/login" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              Are you restaurant staff? <strong style={{ color: 'var(--secondary)' }}>Staff Admin Portal &rarr;</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
