import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Star, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Flame, 
  Check, 
  Share2 
} from 'lucide-react';
import { api } from '../../services/supabase';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { DietBadge } from '../../components/ui/DietBadge';
import { SpiceMeter } from '../../components/ui/SpiceMeter';
import { FoodCard } from '../../components/customer/FoodCard';

export const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [food, setFood] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [relatedDishes, setRelatedDishes] = useState([]);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const fetchDish = async () => {
      const item = await api.getFoodById(id);
      if (item) {
        setFood(item);
        setSelectedPortion(item.portions?.[0] || { name: 'Standard', price: item.price });
        setSelectedAccompaniments([]);
        setQuantity(1);

        // Fetch related dishes
        const allItems = await api.getFoodItems();
        const related = allItems.filter(f => f.id !== item.id && f.category === item.category).slice(0, 3);
        setRelatedDishes(related);
      }
    };
    fetchDish();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!food) {
    return (
      <div className="container-custom" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Summoning Dish from Kitchen...</h2>
      </div>
    );
  }

  const wishlisted = isWishlisted(food.id);

  const toggleAccompaniment = (acc) => {
    if (selectedAccompaniments.some(a => a.id === acc.id)) {
      setSelectedAccompaniments(selectedAccompaniments.filter(a => a.id !== acc.id));
    } else {
      setSelectedAccompaniments([...selectedAccompaniments, acc]);
    }
  };

  const unitPrice = selectedPortion ? selectedPortion.price : food.price;
  const accompanimentsCost = selectedAccompaniments.reduce((sum, a) => sum + a.price, 0);
  const finalUnitPrice = unitPrice + accompanimentsCost;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    const portionObj = {
      name: selectedPortion.name,
      price: finalUnitPrice
    };
    const accNames = selectedAccompaniments.map(a => `${a.name} (+₹${a.price})`);
    addToCart(food, portionObj, accNames, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container-custom">
        {/* Back Link */}
        <Link
          to="/menu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Royal Menu</span>
        </Link>

        {/* 2-Column Dish Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Food Image Showcase */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card-hover)',
              border: '1px solid var(--surface-border)',
              backgroundColor: 'var(--surface-raised)'
            }}>
              <img
                src={food.image}
                alt={food.name}
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
              />

              {/* Badges on Image */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                {food.isBestseller && (
                  <span style={{
                    backgroundColor: 'var(--secondary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase'
                  }}>
                    Royal Bestseller
                  </span>
                )}
                {food.isChefSpecial && (
                  <span style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase'
                  }}>
                    Chef's Dum Masterpiece
                  </span>
                )}
              </div>

              {/* Wishlist & Share Buttons */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleShare}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Share Dish Link"
                >
                  <Share2 size={18} color="var(--text-high)" />
                </button>

                <button
                  onClick={() => toggleWishlist(food.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={18} color={wishlisted ? '#B91C1C' : '#57534E'} fill={wishlisted ? '#B91C1C' : 'none'} />
                </button>
              </div>

              {copyFeedback && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--surface-dark)',
                  color: '#FFFFFF',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600
                }}>
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Preparation Guarantee Note */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              backgroundColor: 'var(--surface-subdued)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              display: 'flex',
              gap: '12px'
            }}>
              <ShieldCheck size={24} color="#15803D" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-high)', display: 'block' }}>
                  Authentic Earthen Pot Dum Assurance
                </strong>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                  Cooked exclusively in clay handis sealed with kneaded dough over low-flame charcoal embers. Never pre-made or microwaved.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Ordering */}
          <div>
            {/* Dietary + Spice + Rating Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
              <DietBadge type={food.dietary} showLabel />
              <span style={{ color: 'var(--surface-border)' }}>|</span>
              <SpiceMeter level={food.spiceLevel} showText />
              <span style={{ color: 'var(--surface-border)' }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--secondary)', fontWeight: 700 }}>
                <Star size={14} fill="#B45309" />
                <span>{food.rating} ({food.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Dish Title */}
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: '1.15', marginBottom: '1rem', color: 'var(--text-high)' }}>
              {food.name}
            </h1>

            {/* Description Narrative */}
            <p style={{ fontSize: '1rem', lineHeight: '1.65', color: 'var(--text-body)', marginBottom: '1.75rem' }}>
              {food.description}
            </p>

            {/* Prep Time & Course */}
            <div style={{ display: 'flex', gap: '1.5rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Prep & Slow Dum: <strong>{food.prepTime}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={18} color="var(--secondary)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Course: <strong>{food.categoryName}</strong>
                </span>
              </div>
            </div>

            {/* Portion Selector (Radios) */}
            {food.portions?.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-high)', marginBottom: '0.75rem' }}>
                  Select Handi Portion
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {food.portions.map((portion) => {
                    const isSelected = selectedPortion?.name === portion.name;
                    return (
                      <div
                        key={portion.name}
                        onClick={() => setSelectedPortion(portion)}
                        style={{
                          padding: '0.875rem 1.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--surface-border)'}`,
                          backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface-raised)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--primary)' : '#A8A29E'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                          </span>
                          <span style={{ fontSize: '0.9375rem', fontWeight: isSelected ? 700 : 500 }}>
                            {portion.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-high)' }}>
                          ₹{portion.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Accompaniments Cross-Sell */}
            {food.accompaniments?.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-high)', marginBottom: '0.75rem' }}>
                  Royal Accompaniments & Pairings
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {food.accompaniments.map((acc) => {
                    const isChecked = selectedAccompaniments.some(a => a.id === acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccompaniment(acc)}
                        style={{
                          padding: '0.75rem 1.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: `1px solid ${isChecked ? 'var(--secondary)' : 'var(--surface-border)'}`,
                          backgroundColor: isChecked ? 'var(--secondary-glow)' : 'var(--surface-canvas)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: `1.5px solid ${isChecked ? 'var(--secondary)' : '#A8A29E'}`,
                            backgroundColor: isChecked ? 'var(--secondary)' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF'
                          }}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span style={{ fontSize: '0.875rem', fontWeight: isChecked ? 600 : 400 }}>
                            {acc.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          +₹{acc.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ingredients Tags */}
            {food.ingredients?.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  KEY AROMATICS & INGREDIENTS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {food.ingredients.map((ing) => (
                    <span
                      key={ing}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'var(--surface-subdued)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        color: 'var(--text-body)',
                        border: '1px solid var(--surface-border)'
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Final Add to Cart Button */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
              backgroundColor: 'var(--surface-raised)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Amount</span>
                <span style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
                  ₹{totalPrice}
                </span>
              </div>

              <div className="stepper" style={{ padding: '0.35rem 0.75rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '1.125rem' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, minWidth: '180px', padding: '0.875rem 1.5rem', fontSize: '1rem' }}
              >
                <span>Add to Handi</span>
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Dishes Carousel / Grid */}
        {relatedDishes.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--surface-border)' }}>
            <h2 style={{ fontSize: '1.875rem', marginBottom: '2rem' }}>
              Complementary Royal Preparations
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {relatedDishes.map((dish) => (
                <FoodCard key={dish.id} food={dish} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
