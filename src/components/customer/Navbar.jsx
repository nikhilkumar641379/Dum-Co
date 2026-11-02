import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu as MenuIcon, X, Search, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { openCart, totalItemCount, subtotal } = useCart();
  const { wishlistIds } = useWishlist();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Royal Menu', path: '/menu' },
    { label: 'Offers & Coupons', path: '/offers' },
    { label: 'Our Heritage', path: '/about' },
    { label: 'Table & Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Heritage Notice Bar */}
      <div style={{
        backgroundColor: 'var(--surface-dark)',
        color: '#FAF2EE',
        fontSize: '0.75rem',
        padding: '0.4rem 1rem',
        textAlign: 'center',
        fontWeight: 500,
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <span>👑 Slow-cooked in sealed earthen handis over charcoal embers</span>
        <span style={{ color: 'var(--secondary)' }}>•</span>
        <span>Free Handi Delivery on orders above ₹500</span>
        <span style={{ color: 'var(--secondary)' }}>•</span>
        <Link to="/offers" style={{ color: '#FDE68A', textDecoration: 'underline', fontWeight: 600 }}>
          Code: ROYALDUM20
        </Link>
      </div>

      {/* Main Glass Navbar */}
      <nav className="header-glass" style={{ padding: '0.9rem 0' }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              fontFamily: "'Playfair Display', serif",
              boxShadow: '0 4px 12px rgba(194, 65, 12, 0.3)'
            }}>
              D
            </div>
            <div>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: 'var(--text-high)',
                letterSpacing: '-0.02em',
                display: 'block',
                lineHeight: 1.1
              }}>
                Dum & Co.
              </span>
              <span style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--secondary)',
                fontWeight: 700,
                display: 'block'
              }}>
                Artisanal Handi Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
            <style>{`
              @media (min-width: 900px) {
                .nav-desktop { display: flex !important; }
                .nav-mobile-btn { display: none !important; }
              }
            `}</style>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: isActive(link.path) ? 700 : 500,
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--text-body)',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '2px'
                  }} />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              style={{
                position: 'relative',
                color: 'var(--text-high)',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--surface-border)'
              }}
              title="Wishlist & Favourites"
            >
              <Heart size={18} />
              {wishlistIds.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--secondary)',
                  color: '#FFFFFF',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Profile / Account */}
            <Link
              to="/profile"
              style={{
                color: 'var(--text-high)',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--surface-border)'
              }}
              title={user ? `Profile: ${user.name}` : 'Login / Sign Up'}
            >
              <User size={18} />
            </Link>

            {/* Handi Cart Trigger Button */}
            <button
              onClick={openCart}
              className="btn-primary"
              style={{
                padding: '0.55rem 1.15rem',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ display: 'none' }} className="cart-text-desktop">Handi</span>
              <style>{`
                @media (min-width: 640px) {
                  .cart-text-desktop { display: inline !important; }
                }
              `}</style>
              <span style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--primary)',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)'
              }}>
                {totalItemCount}
              </span>
              {subtotal > 0 && (
                <span style={{ fontSize: '0.8125rem', opacity: 0.9 }}>• ₹{subtotal}</span>
              )}
            </button>

            {/* Admin Portal Quick Link */}
            <Link
              to="/admin"
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 600,
                padding: '6px 10px',
                border: '1px dashed var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'none'
              }}
              className="admin-link-desktop"
              title="Restaurant Admin Dashboard"
            >
              Admin
            </Link>
            <style>{`
              @media (min-width: 1024px) {
                .admin-link-desktop { display: inline-flex !important; }
              }
            `}</style>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-btn"
              style={{
                background: 'none',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-high)'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            borderTop: '1px solid var(--surface-border)',
            padding: '1.25rem',
            marginTop: '0.75rem',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: isActive(link.path) ? 700 : 500,
                    color: isActive(link.path) ? 'var(--primary)' : 'var(--text-high)'
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ textDecoration: 'none', color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9375rem' }}
                >
                  🛡️ Admin Management Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
