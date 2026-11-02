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
  const [activeTab, setActiveTab] = useState('all');

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
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem',
        backgroundImage: 'radial-gradient(circle at 85% 30%, rgba(254, 243, 199, 0.5) 0%, rgba(250, 247, 242, 0) 60%)',
        overflow: 'hidden'
      }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
          }}>
            {/* Left Hero Narrative */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--secondary-glow)',
                color: 'var(--secondary)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '1.25rem',
                border: '1px solid #FDE68A'
              }}>
                <Flame size={15} color="#C2410C" fill="#C2410C" />
                <span>SLOW-COOKED IN DOUGH-SEALED EARTHEN HANDIS</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: '1.1',
                marginBottom: '1.25rem',
                color: 'var(--text-high)'
              }}>
                The Art of <br />
                <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Royal Awadhi Dum</span> Cooking
              </h1>

              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.65',
                color: 'var(--text-body)',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Heirloom spices hand-crushed in brass pestles, layered with aged Basmati rice and slow-cooked over dying embers in hand-thrown clay pots. Delivered steaming to your table.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Link to="/menu" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                  <span>Order Handi Feast</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/about" className="btn-secondary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                  <span>Our Heritage Story</span>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--surface-border)'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    4.9 ★
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    2,450+ Royal Patrons
                  </span>
                </div>

                <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />

                <div>
                  <span style={{ display: 'block', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    100%
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Authentic Clay Handis
                  </span>
                </div>

                <div style={{ width: '1px', backgroundColor: 'var(--surface-border)' }} />

                <div>
                  <span style={{ display: 'block', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
                    35 Mins
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Sealed Express Delivery
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
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>
                      SIGNATURE DUM CREATION
                    </span>
                    <h3 style={{ fontSize: '1.0625rem', margin: 0, color: 'var(--text-high)' }}>
                      Awadhi Gosht Dum Biryani
                    </h3>
                  </div>

                  <Link to="/dish/food-1" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                    Taste Now
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Pill */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                backgroundColor: 'var(--surface-dark)',
                color: '#FFF8F5',
                padding: '10px 16px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-card)',
                fontSize: '0.8125rem',
                fontWeight: 600
              }}>
                <Sparkles size={16} color="#FDE68A" />
                <span>Charcoal Smoked Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Grid */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--surface-raised)', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
                CURATED COLLECTIONS
              </span>
              <h2 style={{ fontSize: '2.25rem', marginTop: '4px', margin: 0 }}>
                Explore by Royal Courses
              </h2>
            </div>
            <Link to="/menu" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View Full 28-Dish Catalog</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem'
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
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
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
                    bottom: '10px',
                    left: '12px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {cat.name}
                  </span>
                </div>
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.itemCount} Dishes</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Bestsellers Showcase */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface-canvas)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
              CHEF'S SIGNATURE PICKS
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '6px', marginBottom: '0.75rem' }}>
              Handi Bestsellers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              Our most celebrated dum recipes, perfected over hundreds of slow-cooked iterations and enjoyed by royalty across the city.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {bestsellers.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/menu" className="btn-primary" style={{ padding: '0.875rem 2.25rem', fontSize: '1rem' }}>
              <span>View All 28 Handi Dishes</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* The 3 Pillars of Dum Heritage */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface-dark)', color: '#FAF2EE' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
              THE DUM PUKHT PHILOSOPHY
            </span>
            <h2 style={{ fontSize: '2.5rem', color: '#FFF8F5', marginTop: '6px' }}>
              Why Dum & Co. Tastes Unmatched
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            <div style={{
              padding: '2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'rgba(194, 65, 12, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Flame size={28} color="var(--primary)" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Hand-Thrown Clay Pots
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Unfinished earthenware pots allow moisture and heat to circulate continuously, naturally infusing every grain of rice with mineral earthy sweetness.
              </p>
            </div>

            <div style={{
              padding: '2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'rgba(180, 83, 9, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={28} color="var(--secondary)" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                Atta Purdah Seal
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Every handi is locked airtight with a ring of whole-wheat dough. Zero steam escapes, ensuring the volatile aromas of saffron and green cardamom permeate the meat.
              </p>
            </div>

            <div style={{
              padding: '2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'rgba(21, 128, 61, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Award size={28} color="#22C55E" />
              </div>
              <h3 style={{ color: '#FFF8F5', fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                32 Rare Potli Spices
              </h3>
              <p style={{ color: '#A8A29E', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Directly sourced from organic growers in Kerala, Kashmir, and Khari Baoli. Hand-toasted and tied into muslin spice parcels for deep, non-greasy aromatic layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Offer Banner */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--surface-raised)' }}>
        <div className="container-custom">
          <div style={{
            padding: '3rem 2.5rem',
            backgroundColor: 'var(--primary-light)',
            border: '2px dashed var(--primary)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}>
            <div>
              <span style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.75rem'
              }}>
                LIMITED ROYAL OFFER
              </span>
              <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-high)' }}>
                Get 20% Off Your Inaugural Dum Handi
              </h2>
              <p style={{ color: 'var(--text-body)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                Use voucher code <strong style={{ color: 'var(--primary)', letterSpacing: '0.05em' }}>ROYALDUM20</strong> at checkout on orders above ₹499.
              </p>
            </div>

            <Link to="/menu" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              Claim & Order Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
