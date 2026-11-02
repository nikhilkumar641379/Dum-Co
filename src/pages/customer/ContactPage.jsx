import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/mockData';

export const ContactPage = () => {
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: '2',
    seating: 'Royal Alcove (Intimate)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0 2.5rem' }}>
      <div className="container-custom">
        {/* Header (Compact) */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
            RESERVATIONS & CONCIERGE
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginTop: '4px', marginBottom: '0.4rem' }}>
            Table Bookings & Contact
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Reserve a table in our courtly dining sanctuary or reach our hospitality concierge for bespoke catering and private feasts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Table Reservation Form (Compact) */}
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            padding: '1.5rem 1.75rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>
              Reserve a Royal Table
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              We recommend reserving at least 4 hours in advance for dinner seatings.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1.75rem 1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <CheckCircle size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>Reservation Request Received!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                  Our Maître d' will confirm your royal seating for <strong>{reservationForm.guests} guests</strong> on <strong>{reservationForm.date}</strong> at <strong>{reservationForm.time}</strong> via SMS and WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                  style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      className="input-dum"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="input-dum"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    className="input-dum"
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
                    value={reservationForm.email}
                    onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="input-dum"
                      style={{ padding: '0.55rem 0.65rem', fontSize: '0.8125rem' }}
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                      Seating Time *
                    </label>
                    <select
                      className="input-dum"
                      style={{ padding: '0.55rem 0.65rem', fontSize: '0.8125rem', cursor: 'pointer' }}
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Late)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                      Guests *
                    </label>
                    <select
                      className="input-dum"
                      style={{ padding: '0.55rem 0.65rem', fontSize: '0.8125rem', cursor: 'pointer' }}
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Royal Party</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                    Special Seating Preference
                  </label>
                  <select
                    className="input-dum"
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.8125rem', cursor: 'pointer' }}
                    value={reservationForm.seating}
                    onChange={(e) => setReservationForm({ ...reservationForm, seating: e.target.value })}
                  >
                    <option value="Royal Alcove (Intimate)">Royal Alcove (Intimate / Candlelit)</option>
                    <option value="Handi Courtyard (Airy)">Handi Courtyard (Al-fresco / Live Charcoal)</option>
                    <option value="Dastarkhwan Family Booth">Dastarkhwan Family Booth</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-high)', marginBottom: '4px' }}>
                    Notes or Dietary Dietary Needs
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Anniversary celebration, mild spice preferences, wheelchair accessibility..."
                    className="input-dum"
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.8125rem', resize: 'vertical' }}
                    value={reservationForm.notes}
                    onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.75rem', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                  <span>Confirm Table Reservation</span>
                  <Sparkles size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, WhatsApp & Google Map Embed (Compact) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Quick Contact Cards */}
            <div style={{
              backgroundColor: 'var(--surface-raised)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--surface-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.1875rem', marginBottom: '1rem' }}>Hospitality Sanctuary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Gurugram Flagship</strong>
                    <span style={{ color: 'var(--text-body)', lineHeight: '1.45', fontSize: '0.8125rem' }}>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Operational Hours</strong>
                    <span style={{ color: 'var(--text-body)', fontSize: '0.8125rem' }}>{RESTAURANT_INFO.timings}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Reservations Line</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.8125rem' }}>
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div style={{ marginTop: '1.125rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20Dum%20%26%20Co.,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '0.625rem',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.875rem'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Google Maps Visual Embed Card */}
            <div style={{
              backgroundColor: 'var(--surface-raised)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--surface-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'var(--surface-canvas)', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.8125rem' }}>Interactive Google Map Embed</strong>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl || "https://maps.google.com/?q=Sector+54+Golf+Course+Road+Gurugram+Dum+and+Co"}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  <span>Open in Maps / Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div style={{ height: '180px', width: '100%', position: 'relative', backgroundColor: '#E5E3DF' }}>
                <iframe
                  title="Dum & Co. Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14032.553258752044!2d77.098863!3d28.445258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d189bb55fdb61%3A0xe54e6fa18e0018d4!2sSector%2054%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                />
              </div>

              <div style={{ padding: '0.625rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                📍 Valet parking available on Golf Course Road entrance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
