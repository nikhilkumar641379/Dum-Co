import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0 3rem' }}>
      <div className="container-custom">
        {/* Heritage Banner Hero (Compact) */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
            CENTURIES OF AWADHI GASTRONOMY
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '4px', marginBottom: '0.75rem', lineHeight: '1.18' }}>
            Slow-Cooked Dum Traditions, <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Reimagined for Royalty</span>
          </h1>
          <p style={{ color: 'var(--text-body)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
            Dum & Co. was born from a singular culinary obsession: resurrecting the courtly cooking techniques of the Nawabs of Awadh, where time, patience, and sealed steam create depth that modern fast-casual kitchens can never match.
          </p>
        </div>

        {/* Narrative & Visual Split (Compact) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
              THE DUM PUKHT CRAFT
            </span>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Breathe In The Steam Of Antiquity
            </h2>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              The word <em>Dum</em> translates directly to "breathing in", while <em>Pukht</em> signifies "slow cooking". In our kitchen, every handi is treated as an airtight pressure chamber. Layers of aged dehradun basmati rice and marinated meat or vegetables are sealed under a ring of hand-kneaded whole wheat atta dough.
            </p>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
              Placed over smoldering sal wood charcoal, the ingredients cook entirely in their own trapped juices and volatile steam. When you break the dough seal at your dining table, that initial fragrant plume of saffron, mace, and rosewater is the exact same aroma that delighted royal courts in 1784.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1.35rem', color: 'var(--primary)', display: 'block' }}>100%</strong>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Clay Handis</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />
              <div>
                <strong style={{ fontSize: '1.35rem', color: 'var(--secondary)', display: 'block' }}>32</strong>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Heritage Aromatics</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />
              <div>
                <strong style={{ fontSize: '1.35rem', color: '#15803D', display: 'block' }}>0%</strong>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Additives</span>
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
              bottom: '-12px',
              left: '14px',
              backgroundColor: 'var(--surface-dark)',
              color: '#FAF2EE',
              padding: '0.75rem 1.125rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-modal)'
            }}>
              <span style={{ color: 'var(--secondary)', fontSize: '0.6875rem', fontWeight: 700, display: 'block' }}>
                DAILY RITUAL
              </span>
              <strong style={{ fontSize: '0.875rem', color: '#FFF8F5' }}>
                Potli Spices Hand-Ground at Dawn
              </strong>
            </div>
          </div>
        </div>

        {/* Spice Origin & Sourcing (Compact) */}
        <div style={{
          backgroundColor: 'var(--surface-subdued)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 1.75rem',
          border: '1px solid var(--surface-border)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
              PURITY OF PROVENANCE
            </span>
            <h2 style={{ fontSize: '1.75rem', marginTop: '4px' }}>
              Where Our Ingredients Come From
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--primary)' }}>PAMPORE, KASHMIR</span>
              <h3 style={{ fontSize: '1.0625rem', margin: '4px 0 6px' }}>Mongra Saffron (Kesar)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                Only grade-A deep crimson stigmas are steeped in warm buffalo milk to impart our iconic golden glow and floral fragrance.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--primary)' }}>WAYANAD, KERALA</span>
              <h3 style={{ fontSize: '1.0625rem', margin: '4px 0 6px' }}>Malabar Green Cardamom</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                High-altitude bold pods crushed freshly before service, lending sweet eucalyptus and mint-tinted citrus undertones.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-raised)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--primary)' }}>DEHRADUN FOOTHILLS</span>
              <h3 style={{ fontSize: '1.0625rem', margin: '4px 0 6px' }}>Two-Year Aged Basmati</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                Aged naturally in burlap sacks to lower moisture content, ensuring every long slender grain cooks fluffy, separated, and aromatic.
              </p>
            </div>
          </div>
        </div>

        {/* Master Chef Tribute (Compact) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2rem'
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', marginBottom: '6px' }}>
              <Award size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>CHEF PATRON</span>
            </div>
            <h2 style={{ fontSize: '1.875rem', marginBottom: '0.75rem' }}>
              Ustad Farhan Qureshi
            </h2>
            <p style={{ color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              A 4th-generation Bawarchi carrying the hereditary culinary secrets of the royal Lucknow dastarkhwan. For over 28 years, Ustad Farhan has championed the preservation of slow-cooking over coal handis without shortcuts.
            </p>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: '0.875rem', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
              "Food cooked in a hurry nourishes only the stomach. Food cooked with love and unhurried patience heals the soul."
            </p>

            <Link to="/menu" className="btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
              <span>Taste The Legacy</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
