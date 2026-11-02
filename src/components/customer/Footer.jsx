import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ExternalLink 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/mockData';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface-dark)',
      color: '#E0D8D5',
      paddingTop: '3rem',
      paddingBottom: '2rem',
      borderTop: '3px solid var(--secondary)'
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand, Heritage & Social Links */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
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

            <p style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#A8A29E', marginBottom: '1.25rem' }}>
              Reviving centuries-old royal Awadhi & Mughlai dum traditions. Every handi is prepared with aged basmati, hand-pounded potli spices, sealed with raw dough, and slow-cooked over dying wood charcoal embers.
            </p>

            {/* Social Media Channels */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
              <a
                href={RESTAURANT_INFO.socials?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                title="Follow Dum & Co. on Instagram"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF2EE',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E1306C'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FAF2EE'; }}
              >
                <Instagram size={17} />
              </a>

              <a
                href={RESTAURANT_INFO.socials?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                title="Like Dum & Co. on Facebook"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF2EE',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1877F2'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FAF2EE'; }}
              >
                <Facebook size={17} />
              </a>

              <a
                href={RESTAURANT_INFO.socials?.twitter || "https://twitter.com"}
                target="_blank"
                rel="noreferrer"
                title="Follow Dum & Co. on X (Twitter)"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF2EE',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1DA1F2'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FAF2EE'; }}
              >
                <Twitter size={17} />
              </a>

              <a
                href={RESTAURANT_INFO.socials?.youtube || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                title="Watch Dum Cooking on YouTube"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF2EE',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FF0000'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FAF2EE'; }}
              >
                <Youtube size={17} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
              <ShieldCheck size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>100% Tamper-Proof Clay Handi Delivery</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 style={{
              color: '#FFF8F5',
              fontSize: '1rem',
              marginBottom: '1rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Royal Specialties
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
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
                  Simmered Awadhi Gravies
                </Link>
              </li>
              <li>
                <Link to="/menu?category=cat-breads" style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                  Clay Oven Naan & Parathas
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
              fontSize: '1rem',
              marginBottom: '1rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Hours & Concierge
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#FFF8F5', display: 'block' }}>Kitchen Hours</strong>
                  <span style={{ color: '#A8A29E' }}>{RESTAURANT_INFO.timings}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#FFF8F5', display: 'block' }}>Reservations & Orders</strong>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: '#D6CEBE', textDecoration: 'none' }}>
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <MessageSquare size={16} color="#25D366" style={{ flexShrink: 0, marginTop: '2px' }} />
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

          {/* Location & Google Maps Link */}
          <div>
            <h4 style={{
              color: '#FFF8F5',
              fontSize: '1rem',
              marginBottom: '1rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Sanctuary Location
            </h4>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.8125rem', marginBottom: '1rem' }}>
              <MapPin size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ color: '#A8A29E', lineHeight: '1.45', display: 'block' }}>
                  {RESTAURANT_INFO.address}
                </span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '6px'
                  }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ fontSize: '0.6875rem', color: '#FDE68A', display: 'block', fontWeight: 600, marginBottom: '2px' }}>
                ROYAL PATRON PRIVILEGES
              </span>
              <p style={{ fontSize: '0.75rem', color: '#D6CEBE', margin: 0, lineHeight: '1.4' }}>
                Join our private dining club for secret seasonal menu launches and priority table reservations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          fontSize: '0.75rem',
          color: '#78716C'
        }}>
          <div>
            © {new Date().getFullYear()} Dum & Co. Artisanal Restaurant. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/about" style={{ color: '#78716C', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/contact" style={{ color: '#78716C', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/admin" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
