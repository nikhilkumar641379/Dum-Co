import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Gift, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { openCart, totalItemCount } = useCart();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="mobile-bottom-nav">
      {/* Home */}
      <Link
        to="/"
        className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
      >
        <Home size={20} color={isActive('/') ? 'var(--primary)' : 'var(--text-muted)'} />
        <span>Home</span>
      </Link>

      {/* Royal Menu */}
      <Link
        to="/menu"
        className={`mobile-nav-item ${isActive('/menu') ? 'active' : ''}`}
      >
        <UtensilsCrossed size={20} color={isActive('/menu') ? 'var(--primary)' : 'var(--text-muted)'} />
        <span>Menu</span>
      </Link>

      {/* Offers */}
      <Link
        to="/offers"
        className={`mobile-nav-item ${isActive('/offers') ? 'active' : ''}`}
      >
        <Gift size={20} color={isActive('/offers') ? 'var(--primary)' : 'var(--text-muted)'} />
        <span>Offers</span>
      </Link>

      {/* Cart (Handi) */}
      <button
        onClick={openCart}
        className="mobile-nav-item"
        style={{ position: 'relative' }}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <ShoppingBag size={20} color="var(--primary)" />
          {totalItemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-8px',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              fontSize: '0.625rem',
              fontWeight: 800,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {totalItemCount}
            </span>
          )}
        </div>
        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Handi</span>
      </button>

      {/* Profile */}
      <Link
        to="/profile"
        className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}
      >
        <User size={20} color={isActive('/profile') ? 'var(--primary)' : 'var(--text-muted)'} />
        <span>{user ? 'Account' : 'Login'}</span>
      </Link>
    </nav>
  );
};
