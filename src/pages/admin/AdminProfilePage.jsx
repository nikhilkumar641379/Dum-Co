import React, { useState } from 'react';
import { UserCheck, Shield, Bell, Key, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminProfilePage = () => {
  const { logoutAdmin } = useAuth();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    soundOnOrder: true,
    emailDailyReport: true,
    smsLowStock: false
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      alert('New passcodes do not match.');
      return;
    }
    setPasswordSuccess(true);
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '780px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
          Admin Profile & Security Controls
        </h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Manage your executive credentials, audio alerts, and access preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--secondary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 800
        }}>
          AD
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            General Operations Manager
          </h2>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block' }}>
            admin@dumandco.com • Flagship Sanctuary (Gurugram)
          </span>
          <span style={{
            display: 'inline-block',
            marginTop: '6px',
            fontSize: '0.6875rem',
            fontWeight: 700,
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)'
          }}>
            Super Admin Role
          </span>
        </div>
      </div>

      {/* Audio & Kitchen Notification Preferences */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.1875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="var(--primary)" />
          <span>Kitchen Dispatch Alerts</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <strong style={{ fontSize: '0.9375rem', display: 'block' }}>Royal Handi Gong Audio Chime</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Play distinctive royal bell chime upon receiving incoming online order</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.soundOnOrder}
              onChange={(e) => setNotifications({ ...notifications, soundOnOrder: e.target.checked })}
              style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <strong style={{ fontSize: '0.9375rem', display: 'block' }}>Daily Nightly Revenue Report (Email)</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-generate PDF summary of sales and top dishes at 11:45 PM</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailDailyReport}
              onChange={(e) => setNotifications({ ...notifications, emailDailyReport: e.target.checked })}
              style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
            />
          </label>
        </div>
      </div>

      {/* Security Passcode Change */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.1875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={18} color="var(--primary)" />
          <span>Update Security Passcode</span>
        </h3>

        {passwordSuccess && (
          <div style={{ padding: '0.75rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.8125rem' }}>
            ✓ Passcode updated successfully!
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '420px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Current Passcode</label>
            <input
              type="password"
              required
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="input-dum"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>New Passcode</label>
            <input
              type="password"
              required
              value={passwords.next}
              onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
              className="input-dum"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Confirm New Passcode</label>
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="input-dum"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
            Update Passcode
          </button>
        </form>
      </div>
    </div>
  );
};
