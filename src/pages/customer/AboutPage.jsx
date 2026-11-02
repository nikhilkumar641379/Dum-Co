import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0 6rem' }}>
      <div className="container-custom">
        {/* Heritage Banner Hero */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--secondary)' }}>
            CENTURIES OF AWADHI GASTRONOMY
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', marginTop: '8px', marginBottom: '1.25rem', lineHeight: '1.15' }}>
            Slow-Cooked Dum Traditions, <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Reimagined for Royalty</span>
          </h1>
          <p style={{ color: 'var(--text-body)', fontSize: '1.125rem', lineHeight: '1.7' }}>
            Dum & Co. was born from a singular culinary obsession: resurrecting the courtly cooking techniques of the Nawabs of Awadh, where time, patience, and sealed steam create depth that modern fast-casual kitchens can never match.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
              THE DUM PUKHT CRAFT
            </span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
              Breathe In The Steam Of Antiquity
            </h2>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              The word <em>Dum</em> translates directly to "breathing in", while <em>Pukht</em> signifies "slow cooking". In our kitchen, every handi is treated as an airtight pressure chamber. Layers of aged dehradun basmati rice and marinated meat or vegetables are sealed under a ring of hand-kneaded whole wheat atta dough.
            </p>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '2rem' }}>
              Placed over smoldering sal wood charcoal, the ingredients cook entirely in their own trapped juices and volatile steam. When you break the dough seal at your dining table, that initial fragrant plume of saffron, mace, and rosewater is the exact same aroma that delighted royal courts in 1784.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
              <div>
                <strong style={{ fontSize: '1.5rem', color: 'var(--primary)', display: 'block' }}>100%</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Natural Earthen Handis</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />
              <div>
                <strong style={{ fontSize: '1.5rem', color: 'var(--secondary)', display: 'block' }}>32</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Heritage Potli Aromatics</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />
              <div>
                <strong style={{ fontSize: '1.5rem', color: '#15803D', display: 'block' }}>0%</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Artificial Additives</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card-hover)',
              border: '4px solid #FFFFFF'
            }}>
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80"
                alt="Clay Handi Simmering"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '20px',
              backgroundColor: 'var(--surface-dark)',
              color: '#FAF2EE',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-modal)'
            }}>
              <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 700, display: 'block' }}>
                DAILY RITUAL
              </span>
              <strong style={{ fontSize: '0.9375rem', color: '#FFF8F5' }}>
                Potli Spices Hand-Ground at Dawn
              </strong>
            </div>
          </div>
        </div>

        {/* Spice Origin & Sourcing */}
        <div style={{
          backgroundColor: 'var(--surface-subdued)',
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem 2.5rem',
          border: '1px solid var(--surface-border)',
          marginBottom: '5rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
              PURITY OF PROVENANCE
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '6px' }}>
              Where Our Ingredients Come From
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>PAMPORE, KASHMIR</span>
              <h3 style={{ fontSize: '1.1875rem', margin: '6px 0 10px' }}>Mongra Saffron (Kesar)</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                Only grade-A deep crimson stigmas are steeped in warm buffalo milk to impart our iconic golden glow and floral fragrance.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>WAYANAD, KERALA</span>
              <h3 style={{ fontSize: '1.1875rem', margin: '6px 0 10px' }}>Malabar Green Cardamom</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                High-altitude bold pods crushed freshly before service, lending sweet eucalyptus and mint-tinted citrus undertones.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>DEHRADUN FOOTHILLS</span>
              <h3 style={{ fontSize: '1.1875rem', margin: '6px 0 10px' }}>Two-Year Aged Basmati</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                Aged naturally in burlap sacks to lower moisture content, ensuring every long slender grain cooks fluffy, separated, and aromatic.
              </p>
            </div>
          </div>
        </div>

        {/* Master Chef Tribute */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--surface-border)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
              alt="Master Chef Ustad"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', marginBottom: '8px' }}>
              <Award size={18} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>CHEF PATRON</span>
            </div>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
              Ustad Farhan Qureshi
            </h2>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '1rem' }}>
              A 4th-generation Bawarchi carrying the hereditary culinary secrets of the royal Lucknow dastarkhwan. For over 28 years, Ustad Farhan has championed the preservation of slow-cooking over coal handis without shortcuts.
            </p>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem', marginBottom: '2rem' }}>
              "Food cooked in a hurry nourishes only the stomach. Food cooked with love and unhurried patience heals the soul."
            </p>

            <Link to="/menu" className="btn-primary">
              <span>Taste The Legacy</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
