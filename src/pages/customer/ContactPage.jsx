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
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
            RESERVATIONS & CONCIERGE
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '6px', marginBottom: '0.75rem' }}>
            Table Bookings & Contact
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Reserve a table in our courtly dining sanctuary or reach our hospitality concierge for bespoke catering and private feasts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Table Reservation Form */}
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Reserve a Royal Table
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              We recommend reserving at least 4 hours in advance for dinner seatings.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  Reservation Request Received
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Our concierge has logged your table for <strong>{reservationForm.guests} Guests</strong> on <strong>{reservationForm.date} at {reservationForm.time}</strong>. We will send a confirmation SMS to <strong>{reservationForm.phone}</strong>.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline">
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={reservationForm.name}
                    onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    className="input-dum"
                    placeholder="e.g. Aaditya Singhania"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                      className="input-dum"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                      className="input-dum"
                      placeholder="patron@example.com"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Date *</label>
                    <input
                      type="date"
                      required
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                      className="input-dum"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Seating Time *</label>
                    <select
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                      className="input-dum"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Guests *</label>
                    <select
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                      className="input-dum"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Royal Banquet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Preferred Seating</label>
                  <select
                    value={reservationForm.seating}
                    onChange={(e) => setReservationForm({ ...reservationForm, seating: e.target.value })}
                    className="input-dum"
                  >
                    <option value="Royal Alcove (Intimate)">Royal Alcove (Intimate & Velvet Curtained)</option>
                    <option value="Main Dining Court">Main Dining Court (High Ceiling & Brass Chandeliers)</option>
                    <option value="Courtyard Terrace">Courtyard Terrace (Open Sky Charcoal Experience)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Special Dietary or Occasion Notes</label>
                  <textarea
                    rows={2}
                    value={reservationForm.notes}
                    onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                    className="input-dum"
                    placeholder="Anniversary, birthday, pure vegetarian setup, high-chair..."
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.875rem', fontSize: '1rem' }}>
                  <span>Confirm Table Reservation</span>
                  <Sparkles size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, WhatsApp & Google Map Embed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Contact Cards */}
            <div style={{
              backgroundColor: 'var(--surface-raised)',
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--surface-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Hospitality Sanctuary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9375rem' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Gurugram Flagship</strong>
                    <span style={{ color: 'var(--text-body)', lineHeight: '1.5' }}>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={22} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Operational Hours</strong>
                    <span style={{ color: 'var(--text-body)' }}>{RESTAURANT_INFO.timings}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-high)', display: 'block' }}>Reservations Line</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--surface-border)' }}>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20Dum%20%26%20Co.,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.9375rem'
                  }}
                >
                  <MessageSquare size={18} />
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
              <div style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--surface-canvas)', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.875rem' }}>Interactive Google Map Embed</strong>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  <span>Open in Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div style={{ height: '220px', width: '100%', position: 'relative', backgroundColor: '#E5E3DF' }}>
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

              <div style={{ padding: '0.875rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                📍 Valet parking available on Golf Course Road entrance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
