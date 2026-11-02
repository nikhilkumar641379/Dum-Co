import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  Heart,
  Award,
  Utensils
} from 'lucide-react';
import { api } from '../../services/supabase';
import { FoodCard } from '../../components/customer/FoodCard';
import { RESTAURANT_INFO } from '../../data/mockData';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await api.getCategories();
      const foods = await api.getFoodItems();
      setCategories(cats);
      setFoodItems(foods);
    };
    fetchData();
  }, []);

  const bestsellers = foodItems.filter(f => f.isBestseller || f.isChefSpecial).slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero Section — Compact Height, Seamless Flow into Next Section */}
      <section style={{
        position: 'relative',
        padding: '2.5rem 0 2rem',
        backgroundImage: 'radial-gradient(circle at 85% 30%, rgba(254, 243, 199, 0.45) 0%, rgba(250, 247, 242, 0) 60%)',
        overflow: 'hidden'
      }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {/* Left Hero Narrative */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--secondary-glow)',
                color: 'var(--secondary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '0.875rem',
                border: '1px solid #FDE68A'
              }}>
                <Flame size={14} color="#C2410C" fill="#C2410C" />
                <span>SLOW-COOKED IN DOUGH-SEALED EARTHEN HANDIS</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                lineHeight: '1.12',
                marginBottom: '0.875rem',
                color: 'var(--text-high)'
              }}>
                The Art of <br />
                <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Royal Awadhi Dum</span> Cooking
              </h1>

              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--text-body)',
                marginBottom: '1.35rem',
                maxWidth: '520px'
              }}>
                Heirloom spices hand-crushed in brass pestles, layered with aged Basmati rice and slow-cooked over dying embers in hand-thrown clay pots. Delivered steaming to your table.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
                <Link to="/menu" className="btn-primary" style={{ padding: '0.75rem 1.625rem', fontSize: '0.9375rem' }}>
                  <span>Order Handi Feast</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to="/about" className="btn-secondary" style={{ padding: '0.75rem 1.35rem', fontSize: '0.9375rem' }}>
                  <span>Our Heritage Story</span>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div style={{
                display: 'flex',
                gap: '1.75rem',
                marginTop: '1.5rem',
                paddingTop: '1.125rem',
                borderTop: '1px solid var(--surface-border)'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    4.9 ★
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2,450+ Patrons
                  </span>
                </div>

                <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />

                <div>
                  <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    100%
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Clay Handis
                  </span>
                </div>

                <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />

                <div>
                  <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    35 Mins
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Sealed Express
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-modal)',
                border: '4px solid #FFFFFF'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"
                  alt="Awadhi Dum Biryani Handi"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />

                {/* Floating Dish Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>
                      SIGNATURE DUM CREATION
                    </span>
                    <h3 style={{ fontSize: '0.9375rem', margin: 0, color: 'var(--text-high)' }}>
                      Awadhi Gosht Dum Biryani
                    </h3>
                  </div>

                  <Link to="/dish/food-1" className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
                    Taste Now
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Pill */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'var(--surface-dark)',
                color: '#FFF8F5',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-card)',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                <Sparkles size={14} color="#FDE68A" />
                <span>Charcoal Smoked Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Grid (Compact spacing) */}
      <section style={{ padding: '2.25rem 0', backgroundColor: 'var(--surface-raised)', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
                CURATED COLLECTIONS
              </span>
              <h2 style={{ fontSize: '1.875rem', marginTop: '2px', margin: 0 }}>
                Explore by Royal Courses
              </h2>
            </div>
            <Link to="/menu" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View Full 28-Dish Catalog</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem'
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?category=${cat.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--surface-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--surface-border)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                <div style={{ position: 'relative', height: '115px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
                  }} />
                  <span style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '10px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {cat.name}
                  </span>
                </div>
                <div style={{ padding: '0.625rem 0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.itemCount} Dishes</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Bestsellers Showcase (Compact Spacing & 18px Card Gap) */}
      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--surface-canvas)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
              CHEF'S SIGNATURE PICKS
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '4px', marginBottom: '0.5rem' }}>
              Handi Bestsellers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Our most celebrated dum recipes, perfected over hundreds of slow-cooked iterations and enjoyed by royalty across the city.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.125rem'
          }}>
            {bestsellers.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <Link to="/menu" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.9375rem' }}>
              <span>View All 28 Handi Dishes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* The 3 Pillars of Dum Heritage (Compact Spacing) */}
      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--surface-dark)', color: '#FAF2EE' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
              THE DUM PUKHT PHILOSOPHY
            </span>
            <h2 style={{ fontSize: '2rem', color: '#FFF8F5', marginTop: '4px' }}>
              Why Dum & Co. Tastes Unmatched
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(194, 65, 12, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Flame size={22} color="var(--primary)" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Hand-Thrown Clay Pots
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.8125rem', lineHeight: '1.55' }}>
                Unfinished earthenware pots allow moisture and heat to circulate continuously, naturally infusing every grain of rice with mineral earthy sweetness.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 83, 9, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Sparkles size={22} color="var(--secondary)" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Atta Purdah Seal
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.8125rem', lineHeight: '1.55' }}>
                Every handi is locked airtight with a ring of whole-wheat dough. Zero steam escapes, ensuring the volatile aromas of saffron and green cardamom permeate the meat.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(21, 128, 61, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Award size={22} color="#22C55E" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                32 Rare Potli Spices
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.8125rem', lineHeight: '1.55' }}>
                Directly sourced from organic growers in Kerala, Kashmir, and Khari Baoli. Hand-toasted and tied into muslin spice parcels for deep, non-greasy aromatic layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Offer Banner (Compact) */}
      <section style={{ padding: '2rem 0', backgroundColor: 'var(--surface-raised)' }}>
        <div className="container-custom">
          <div style={{
            padding: '1.75rem 1.75rem',
            backgroundColor: 'var(--primary-light)',
            border: '2px dashed var(--primary)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div>
              <span style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                LIMITED ROYAL OFFER
              </span>
              <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--text-high)' }}>
                Get 20% Off Your Inaugural Dum Handi
              </h2>
              <p style={{ color: 'var(--text-body)', marginTop: '0.35rem', fontSize: '0.875rem' }}>
                Use voucher code <strong style={{ color: 'var(--primary)', letterSpacing: '0.05em' }}>ROYALDUM20</strong> at checkout on orders above ₹499.
              </p>
            </div>

            <Link to="/menu" className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.9375rem' }}>
              Claim & Order Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
