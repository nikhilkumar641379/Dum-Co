import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { COUPONS } from '../../data/mockData';

export const OffersPage = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 2500);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0 2.5rem' }}>
      <div className="container-custom">
        {/* Header (Compact) */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--secondary-glow)',
            color: 'var(--secondary)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            border: '1px solid #FDE68A'
          }}>
            <Sparkles size={13} />
            <span>AUTHENTIC TASTE • ROYAL PRIVILEGES</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginTop: '2px', marginBottom: '0.4rem' }}>
            Offers & Royal Vouchers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Elevate your dining with our exclusive seasonal savings. Copy any voucher code and apply it effortlessly during checkout.
          </p>
        </div>

        {/* Coupons Grid (Compact Gap & Padding) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.125rem',
          marginBottom: '2rem'
        }}>
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.id}
                style={{
                  backgroundColor: 'var(--surface-raised)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--surface-border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Top Banner Ribbon */}
                <div style={{
                  padding: '0.875rem 1.125rem',
                  backgroundColor: 'var(--primary-light)',
                  borderBottom: '1px dashed var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Gift size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                      {coupon.discountPercent ? `${coupon.discountPercent}% OFF` : `FLAT ₹${coupon.discountFlat} OFF`}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Expires {coupon.validUntil}
                  </span>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1rem 1.125rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.35rem', color: 'var(--text-high)' }}>
                    {coupon.description}
                  </h3>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1rem', flex: 1 }}>
                    {coupon.terms}
                  </p>

                  {/* Copy Code Box */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    backgroundColor: 'var(--surface-canvas)',
                    border: '1.5px dashed var(--surface-border)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>VOUCHER CODE</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--primary)', letterSpacing: '0.08em' }}>
                        {coupon.code}
                      </strong>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '5px 11px',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        backgroundColor: isCopied ? '#DCFCE7' : 'var(--text-high)',
                        color: isCopied ? '#15803D' : '#FAF2EE',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isCopied ? (
                        <>
                          <Check size={12} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <Link
                    to="/menu"
                    className="btn-outline"
                    style={{ textAlign: 'center', width: '100%', padding: '0.5rem', fontSize: '0.8125rem' }}
                  >
                    <span>Apply & Browse Menu</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Delivery Banner (Compact) */}
        <div style={{
          backgroundColor: 'var(--surface-dark)',
          color: '#FAF2EE',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem 1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.125rem'
        }}>
          <div>
            <span style={{ color: 'var(--secondary)', fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
              ALWAYS ACTIVE PRIVILEGE
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#FFF8F5', margin: 0 }}>
              Complimentary Sealed Handi Delivery
            </h2>
            <p style={{ color: '#A8A29E', marginTop: '4px', margin: 0, fontSize: '0.8125rem' }}>
              All orders exceeding ₹500 receive 100% free delivery across our 12-kilometer radius. No code needed.
            </p>
          </div>

          <Link to="/menu" className="btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
            Curate Feast
          </Link>
        </div>
      </div>
    </div>
  );
};
