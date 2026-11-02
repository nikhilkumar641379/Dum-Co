import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { api } from '../../services/supabase';
import { FoodCard } from '../../components/customer/FoodCard';

export const WishlistPage = () => {
  const { wishlistIds } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const all = await api.getFoodItems();
      const matched = all.filter(item => wishlistIds.includes(item.id));
      setWishlistItems(matched);
    };
    fetchItems();
  }, [wishlistIds]);

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0 2.5rem' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
            CURATED FEAST LIST
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '6px', marginBottom: '0.75rem' }}>
            Wishlist & Favourites
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Your personally saved preparations. Keep track of delicacies you want to order for family gatherings and celebrations.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 1rem',
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            maxWidth: '560px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-subdued)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Heart size={30} color="var(--text-subtle)" />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>No Saved Dishes Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '2rem' }}>
              Tap the heart icon on any signature dum biryani, kebab, or curry to save it to your royal wishlist.
            </p>
            <Link to="/menu" className="btn-primary">
              <span>Explore Royal Menu</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.125rem'
          }}>
            {wishlistItems.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
