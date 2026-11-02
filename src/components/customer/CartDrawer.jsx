import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DietBadge } from '../ui/DietBadge';

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    tax,
    packagingFee,
    deliveryFee,
    grandTotal,
    appliedCoupon,
    couponError,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCouponCode(couponInput);
    setIsApplying(false);
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Background Scrim */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(28, 25, 23, 0.5)',
          backdropFilter: 'blur(3px)',
          transition: 'opacity 0.3s'
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: 'var(--surface-raised)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000,
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--surface-canvas)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Your Feast Handi</h2>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: 'var(--primary-subtle)',
              color: 'var(--primary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {subtotal > 0 && subtotal < 500 && (
          <div style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--secondary-light)',
            borderBottom: '1px solid #FDE68A',
            fontSize: '0.8125rem',
            color: 'var(--secondary)'
          }}>
            Add <strong>₹{500 - subtotal}</strong> more of royal dishes to unlock <strong>FREE Delivery</strong>!
          </div>
        )}

        {/* Items List Scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 1.25rem',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-subdued)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={32} color="var(--text-subtle)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Your Handi is Empty</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Explore our slow-simmered dum biryanis, kebabs, and curries to curate your feast.
              </p>
              <Link to="/menu" onClick={closeCart} className="btn-primary">
                Browse Royal Menu
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--surface-border-subtle)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover'
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <DietBadge type={item.dietary} />
                      <h4 style={{ fontSize: '0.9375rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </h4>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {item.portion}
                    </div>

                    {item.accompaniments?.length > 0 && (
                      <div style={{ fontSize: '0.6875rem', color: 'var(--secondary)', marginBottom: '6px' }}>
                        + {item.accompaniments.join(', ')}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-subtle)',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer & Bill Summary */}
        {items.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--surface-border)',
            backgroundColor: 'var(--surface-canvas)'
          }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: '1rem' }}>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#DCFCE7',
                  border: '1px dashed #16A34A',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8125rem',
                  color: '#15803D'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} />
                    <span><strong>{appliedCoupon.code}</strong> applied (-₹{appliedCoupon.discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. ROYALDUM20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="input-dum"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  />
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                  >
                    {isApplying ? 'Applying...' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && (
                <span style={{ fontSize: '0.75rem', color: 'var(--dietary-nonveg)', marginTop: '4px', display: 'block' }}>
                  {couponError}
                </span>
              )}
            </div>

            {/* Bill Lines */}
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Item Subtotal</span>
                <span style={{ color: 'var(--text-high)' }}>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dietary-veg)', fontWeight: 600 }}>
                  <span>Royal Coupon Savings</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Earthen Handi Packaging</span>
                <span>₹{packagingFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Express Delivery</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--dietary-veg)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                marginTop: '4px',
                borderTop: '1px solid var(--surface-border)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: 'var(--text-high)'
              }}>
                <span>Total Payable</span>
                <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="#15803D" />
              <span>100% Sealed Fresh in Authentic Clay Handis</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
