import React, { useState, useEffect } from 'react';
import { Save, Building, Clock, MapPin, Percent, DollarSign, Check } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await api.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  if (!settings) return <div>Loading Settings...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: isNaN(value) || name === 'phone' || name === 'whatsapp' || name === 'timings' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '840px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
          Restaurant & Operations Configuration
        </h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Manage restaurant branding, delivery radius, tax percentage, and packaging fees.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#DCFCE7',
          color: '#15803D',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          <Check size={18} />
          <span>Operational settings updated successfully! Live website updated instantly.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#FFFFFF',
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Branding & Contacts */}
        <div>
          <h3 style={{ fontSize: '1.1875rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--surface-border)' }}>
            Identity & Concierge
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Restaurant Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Concierge Phone</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Kitchen Timings</label>
              <input
                type="text"
                name="timings"
                value={settings.timings}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
          </div>
        </div>

        {/* Financial & Delivery Logistics */}
        <div>
          <h3 style={{ fontSize: '1.1875rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--surface-border)' }}>
            Financial & Delivery Parameters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>GST Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Clay Handi Fee (₹)</label>
              <input
                type="number"
                name="packagingFee"
                value={settings.packagingFee}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Delivery Fee (₹)</label>
              <input
                type="number"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Free Delivery Over (₹)</label>
              <input
                type="number"
                name="freeDeliveryThreshold"
                value={settings.freeDeliveryThreshold}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Delivery Radius (km)</label>
              <input
                type="number"
                name="deliveryRadiusKm"
                value={settings.deliveryRadiusKm}
                onChange={handleChange}
                className="input-dum"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Save size={16} />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
