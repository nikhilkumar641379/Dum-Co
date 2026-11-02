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
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--secondary-glow)',
            color: 'var(--secondary)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            marginBottom: '1rem',
            border: '1px solid #FDE68A'
          }}>
            <Sparkles size={14} />
            <span>AUTHENTIC TASTE • ROYAL PRIVILEGES</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '4px', marginBottom: '0.75rem' }}>
            Offers & Royal Vouchers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Elevate your dining with our exclusive seasonal savings. Copy any voucher code and apply it effortlessly during checkout.
          </p>
        </div>

        {/* Coupons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
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
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--primary-light)',
                  borderBottom: '1px dashed var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Gift size={20} color="var(--primary)" />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                      {coupon.discountPercent ? `${coupon.discountPercent}% OFF` : `FLAT ₹${coupon.discountFlat} OFF`}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Expires {coupon.validUntil}
                  </span>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-high)' }}>
                    {coupon.description}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
                    {coupon.terms}
                  </p>

                  {/* Copy Code Box */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--surface-canvas)',
                    border: '1.5px dashed var(--surface-border)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'block' }}>VOUCHER CODE</span>
                      <strong style={{ fontSize: '1.125rem', color: 'var(--primary)', letterSpacing: '0.08em' }}>
                        {coupon.code}
                      </strong>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        backgroundColor: isCopied ? '#DCFCE7' : 'var(--text-high)',
                        color: isCopied ? '#15803D' : '#FAF2EE',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <Link
                    to="/menu"
                    className="btn-outline"
                    style={{ textAlign: 'center', width: '100%', padding: '0.625rem', fontSize: '0.875rem' }}
                  >
                    <span>Apply & Browse Menu</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Delivery Banner */}
        <div style={{
          backgroundColor: 'var(--surface-dark)',
          color: '#FAF2EE',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
              ALWAYS ACTIVE PRIVILEGE
            </span>
            <h2 style={{ fontSize: '1.75rem', color: '#FFF8F5', margin: 0 }}>
              Complimentary Sealed Handi Delivery
            </h2>
            <p style={{ color: '#A8A29E', marginTop: '6px', margin: 0, fontSize: '0.9375rem' }}>
              All orders exceeding ₹500 receive 100% free delivery across our 12-kilometer radius. No code needed.
            </p>
          </div>

          <Link to="/menu" className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            Curate Feast
          </Link>
        </div>
      </div>
    </div>
  );
};
