import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/mockData';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface-dark)',
      color: '#E0D8D5',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      borderTop: '3px solid var(--secondary)'
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Heritage Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                fontFamily: "'Playfair Display', serif"
              }}>
                D
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                color: '#FFF8F5',
                fontWeight: 700
              }}>
                Dum & Co.
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#A8A29E', marginBottom: '1.5rem' }}>
              Reviving centuries-old royal Awadhi & Mughlai dum traditions. Every handi is prepared with aged basmati, hand-pounded potli spices, sealed with raw dough, and slow-cooked over dying wood charcoal embers.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
              <ShieldCheck size={18} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>100% Tamper-Proof Clay Handi Delivery</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 style={{
              color: '#FFF8F5',
              fontSize: '1.125rem',
              marginBottom: '1.25rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Royal Specialties
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/menu?category=cat-biryani" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  Handi Dum Biryanis
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cat-starters" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  Tandoori & Charred Kebabs
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cat-curries" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  36-Hour Dal Dum Pukht
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cat-breads" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  Zafrani Sheermaal & Warqi Paratha
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cat-desserts" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  Royal Kesar Mithai
                </Link>
              </li>
              <li>
                <Link to="/offers" style={{ color: '#FDE68A', textDecoration: 'none', fontWeight: 600 }}>
                  Exclusive Feast Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Timings & Service Col */}
          <div>
            <h4 style={{
              color: '#FFF8F5',
              fontSize: '1.125rem',
              marginBottom: '1.25rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Hours & Concierge
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#FFF8F5', display: 'block' }}>Kitchen Hours</strong>
                  <span style={{ color: '#A8A29E' }}>{RESTAURANT_INFO.timings}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#FFF8F5', display: 'block' }}>Reservations & Orders</strong>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <MessageSquare size={18} color="#25D366" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#FFF8F5', display: 'block' }}>Instant WhatsApp Concierge</strong>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20Dum%20%26%20Co.,%20I%20would%20like%20to%20place%20an%20order`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#86EFAC', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Heritage Address */}
          <div>
            <h4 style={{
              color: '#FFF8F5',
              fontSize: '1.125rem',
              marginBottom: '1.25rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Sanctuary
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: '#A8A29E', lineHeight: '1.5' }}>
                {RESTAURANT_INFO.address}
              </span>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#FDE68A', display: 'block', fontWeight: 600, marginBottom: '4px' }}>
                ROYAL PATRON PRIVILEGES
              </span>
              <p style={{ fontSize: '0.8125rem', color: '#D6CEBE', margin: 0 }}>
                Join our private dining club for secret seasonal menu launches and priority table reservations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: '#78716C'
        }}>
          <div>
            © {new Date().getFullYear()} Dum & Co. Artisanal Restaurant. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" style={{ color: '#78716C', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/contact" style={{ color: '#78716C', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/admin" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
