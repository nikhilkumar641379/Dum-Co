import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Plus, Star, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { DietBadge } from '../ui/DietBadge';
import { SpiceMeter } from '../ui/SpiceMeter';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(food.id);

  const [showModal, setShowModal] = useState(false);
  const [selectedPortion, setSelectedPortion] = useState(food.portions?.[0] || null);
  const [justAdded, setJustAdded] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, food.portions?.[0]);
  };

  const handleModalAdd = () => {
    addToCart(food, selectedPortion);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowModal(false);
    }, 600);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(food.id);
  };

  const currentPrice = selectedPortion ? selectedPortion.price : food.price;

  return (
    <>
      {/* Dish Card */}
      <div
        onClick={handleCardClick}
        className="card-dum flex flex-col h-full group"
        style={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative'
        }}
        title="Tap to view full dish details"
      >
        {/* Food Image Container */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '62%', overflow: 'hidden', backgroundColor: 'var(--surface-subdued)' }}>
          <img
            src={food.image}
            alt={food.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            loading="lazy"
          />

          {/* Top Badges */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', zIndex: 2 }}>
            {food.isBestseller && (
              <span style={{
                backgroundColor: 'var(--secondary)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.03em',
                textTransform: 'uppercase'
              }}>
                Bestseller
              </span>
            )}
            {food.isChefSpecial && !food.isBestseller && (
              <span style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.03em',
                textTransform: 'uppercase'
              }}>
                Chef's Pick
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s',
              zIndex: 2
            }}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} color={wishlisted ? '#B91C1C' : '#57534E'} fill={wishlisted ? '#B91C1C' : 'none'} />
          </button>
        </div>

        {/* Card Content Body (Compact, No Description on face) */}
        <div style={{ padding: '0.875rem 1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            {/* Meta Bar: Dietary + Spice + Prep Time + Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DietBadge type={food.dietary} />
                <SpiceMeter level={food.spiceLevel} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Clock size={12} />
                <span>{food.prepTime}</span>
                <span style={{ margin: '0 2px' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--secondary)', fontWeight: 600 }}>
                  <Star size={12} fill="#B45309" />
                  <span>{food.rating}</span>
                </div>
              </div>
            </div>

            {/* Dish Title */}
            <h3 style={{
              fontSize: '1.0625rem',
              lineHeight: '1.35',
              marginBottom: '0.5rem',
              color: 'var(--text-high)',
              fontWeight: 600
            }}>
              {food.name}
            </h3>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.625rem', borderTop: '1px solid var(--surface-border-subtle)', marginTop: '0.35rem' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1 }}>Starting at</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-high)' }}>₹{food.price}</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <Link
                to={`/dish/${food.id}`}
                onClick={(e) => e.stopPropagation()}
                className="btn-outline"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              >
                Customise
              </Link>
              <button
                onClick={handleQuickAdd}
                className="btn-primary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}
              >
                <Plus size={14} />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dish Quick View Modal / Bottom Sheet */}
      {showModal && (
        <div
          className="dish-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="dish-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dish-modal-drag-handle" />
            {/* Modal Image Header */}
            <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: 'var(--surface-subdued)' }}>
              <img
                src={food.image}
                alt={food.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 25, 23, 0.7)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                title="Close"
              >
                <X size={18} />
              </button>

              <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                {food.isBestseller && (
                  <span style={{
                    backgroundColor: 'var(--secondary)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    Royal Bestseller
                  </span>
                )}
                {food.isChefSpecial && !food.isBestseller && (
                  <span style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    Chef's Special
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              {/* Meta row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DietBadge type={food.dietary} />
                  <SpiceMeter level={food.spiceLevel} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {food.spiceLevel === 1 ? 'Mild' : food.spiceLevel === 2 ? 'Medium Spiced' : 'Royal Hot'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }}>
                  <Clock size={14} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)' }}>{food.prepTime}</span>
                  <span style={{ color: 'var(--surface-border)' }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--secondary)', fontWeight: 700 }}>
                    <Star size={14} fill="#B45309" />
                    <span>{food.rating}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>({food.reviewCount || 120})</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.5rem', lineHeight: '1.25', marginBottom: '0.625rem', color: 'var(--text-high)' }}>
                {food.name}
              </h2>

              {/* Full Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-body)',
                lineHeight: '1.6',
                marginBottom: '1rem',
                backgroundColor: 'var(--surface-canvas)',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--surface-border-subtle)'
              }}>
                {food.description}
              </p>

              {/* Ingredients preview if available */}
              {food.ingredients && food.ingredients.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                    Authentic Aromatics & Ingredients
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {food.ingredients.map((ing, i) => (
                      <span key={i} style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'var(--surface-subdued)',
                        color: 'var(--text-body)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--surface-border)'
                      }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portion selector if available */}
              {food.portions && food.portions.length > 1 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-high)', display: 'block', marginBottom: '6px' }}>
                    Select Portion:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${food.portions.length}, 1fr)`, gap: '8px' }}>
                    {food.portions.map((portion, idx) => {
                      const isSelected = selectedPortion?.name === portion.name;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedPortion(portion)}
                          style={{
                            padding: '0.625rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--surface-border)',
                            backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface-canvas)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: isSelected ? 'var(--primary)' : 'var(--text-high)' }}>
                            {portion.name}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-high)', marginTop: '2px' }}>
                            ₹{portion.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--surface-border)',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Price</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-high)' }}>₹{currentPrice}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Link
                    to={`/dish/${food.id}`}
                    onClick={() => setShowModal(false)}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      padding: '0.625rem 0.875rem'
                    }}
                  >
                    Full Details &rarr;
                  </Link>

                  <button
                    onClick={handleModalAdd}
                    className="btn-primary"
                    style={{
                      padding: '0.625rem 1.25rem',
                      fontSize: '0.875rem',
                      backgroundColor: justAdded ? '#15803D' : 'var(--primary)'
                    }}
                  >
                    {justAdded ? (
                      <>
                        <Check size={16} />
                        Added to Handi!
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add to Cart • ₹{currentPrice}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
