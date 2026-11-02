import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Plus, Star } from 'lucide-react';
import { DietBadge } from '../ui/DietBadge';
import { SpiceMeter } from '../ui/SpiceMeter';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(food.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, food.portions?.[0]);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(food.id);
  };

  return (
    <div className="card-dum flex flex-col h-full group" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Food Image Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '68%', overflow: 'hidden', backgroundColor: 'var(--surface-subdued)' }}>
        <Link to={`/dish/${food.id}`}>
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
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2 }}>
          {food.isBestseller && (
            <span style={{
              backgroundColor: 'var(--secondary)',
              color: '#FFFFFF',
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase'
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
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase'
            }}>
              Chef's Dum Pick
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
          <Heart size={18} color={wishlisted ? '#B91C1C' : '#57534E'} fill={wishlisted ? '#B91C1C' : 'none'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Meta Bar: Dietary + Prep Time + Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <h3 style={{ fontSize: '1.1875rem', lineHeight: '1.4', marginBottom: '0.5rem', color: 'var(--text-high)' }}>
          <Link to={`/dish/${food.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {food.name}
          </Link>
        </h3>

        {/* Truncated Ingredients / Description */}
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
          lineHeight: '1.45',
          marginBottom: '1rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {food.description}
        </p>

        {/* Pricing & Add to Cart Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-border-subtle)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1 }}>Starting at</span>
            <span style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--text-high)' }}>₹{food.price}</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <Link
              to={`/dish/${food.id}`}
              className="btn-outline"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}
            >
              Customise
            </Link>
            <button
              onClick={handleQuickAdd}
              className="btn-primary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}
            >
              <Plus size={15} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
