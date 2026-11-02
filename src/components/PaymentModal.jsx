import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Building2, 
  Clock, 
  Check, 
  Copy, 
  Lock, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, amount, orderDetails, onPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [customUpi, setCustomUpi] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0); // 0: idle, 1: connecting, 2: success
  const [txnId, setTxnId] = useState('');

  // Card Form State
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8821',
    name: orderDetails?.name || 'Aaditya Singhania',
    expiry: '09/28',
    cvv: '•••'
  });

  // Selected Bank for Netbanking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Countdown timer for UPI QR
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('dumandco@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePay = (methodName) => {
    setIsProcessing(true);
    setProcessStep(1);

    const generatedTxn = `TXN_DUM_${Math.floor(100000 + Math.random() * 900000)}`;
    setTxnId(generatedTxn);

    // Realistic banking simulation (1.4 seconds)
    setTimeout(() => {
      setProcessStep(2);
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess({
          transactionId: generatedTxn,
          method: methodName,
          amount: amount,
          status: 'Paid',
          paidAt: new Date().toISOString()
        });
      }, 1000);
    }, 1400);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: 'var(--surface-raised, #1C1917)',
        color: '#FAF2EE',
        width: '100%',
        maxWidth: '520px',
        borderRadius: '20px',
        border: '1px solid rgba(194, 65, 12, 0.25)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(194, 65, 12, 0.15)',
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* Modal Top Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(194, 65, 12, 0.2) 0%, rgba(28, 25, 23, 0.9) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #C2410C, #9A3412)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(194, 65, 12, 0.3)'
            }}>
              <Sparkles size={20} color="#FAF2EE" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FAF2EE' }}>
                Dum & Co. Royal Pay
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 238, 0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={11} color="#22C55E" /> 256-Bit Encrypted Payment
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'rgba(250, 242, 238, 0.6)', letterSpacing: '0.05em' }}>
                Amount to Pay
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FB923C', lineHeight: 1 }}>
                ₹{amount}
              </div>
            </div>

            {!isProcessing && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FAF2EE',
                  transition: 'background 0.2s'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Processing State Overlay */}
        {isProcessing ? (
          <div style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem'
          }}>
            {processStep === 1 ? (
              <>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid rgba(194, 65, 12, 0.2)',
                  borderTopColor: '#FB923C',
                  animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '1.25rem', color: '#FAF2EE' }}>
                    Authorizing Payment...
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(250, 242, 238, 0.7)' }}>
                    Verifying with your bank securely. Do not close or refresh this window.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '2px solid #22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E'
                }}>
                  <Check size={36} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1.35rem', color: '#4ADE80' }}>
                    Payment Successful!
                  </h4>
                  <p style={{ margin: '0 0 6px', fontSize: '0.875rem', color: 'rgba(250, 242, 238, 0.8)' }}>
                    Transaction Reference: <strong style={{ color: '#FB923C' }}>{txnId}</strong>
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 238, 0.6)' }}>
                    Redirecting to Live Order Tracking...
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            {/* Tabs Selector */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                style={{
                  padding: '0.875rem 0.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'upi' ? '2.5px solid #FB923C' : '2.5px solid transparent',
                  color: activeTab === 'upi' ? '#FB923C' : 'rgba(250, 242, 238, 0.6)',
                  fontWeight: activeTab === 'upi' ? 700 : 500,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Smartphone size={16} /> Instant UPI / QR
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                style={{
                  padding: '0.875rem 0.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'card' ? '2.5px solid #FB923C' : '2.5px solid transparent',
                  color: activeTab === 'card' ? '#FB923C' : 'rgba(250, 242, 238, 0.6)',
                  fontWeight: activeTab === 'card' ? 700 : 500,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <CreditCard size={16} /> Debit / Credit
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                style={{
                  padding: '0.875rem 0.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'netbanking' ? '2.5px solid #FB923C' : '2.5px solid transparent',
                  color: activeTab === 'netbanking' ? '#FB923C' : 'rgba(250, 242, 238, 0.6)',
                  fontWeight: activeTab === 'netbanking' ? 700 : 500,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Building2 size={16} /> Net Banking
              </button>
            </div>

            {/* Tab 1: UPI & QR Code */}
            {activeTab === 'upi' && (
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1rem',
                  borderRadius: '16px',
                  display: 'inline-block',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative'
                }}>
                  {/* Dynamic SVG QR Code Design */}
                  <svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="170" height="170" fill="white" />
                    {/* Corner Position Markers */}
                    <rect x="10" y="10" width="40" height="40" rx="6" fill="#1C1917" />
                    <rect x="18" y="18" width="24" height="24" rx="2" fill="white" />
                    <rect x="23" y="23" width="14" height="14" fill="#C2410C" />

                    <rect x="120" y="10" width="40" height="40" rx="6" fill="#1C1917" />
                    <rect x="128" y="18" width="24" height="24" rx="2" fill="white" />
                    <rect x="133" y="23" width="14" height="14" fill="#C2410C" />

                    <rect x="10" y="120" width="40" height="40" rx="6" fill="#1C1917" />
                    <rect x="18" y="128" width="24" height="24" rx="2" fill="white" />
                    <rect x="23" y="133" width="14" height="14" fill="#C2410C" />

                    {/* QR Code Dots Matrix */}
                    <rect x="58" y="16" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="76" y="16" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="94" y="16" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="58" y="34" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="94" y="34" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="16" y="58" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="34" y="58" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="126" y="58" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="144" y="58" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="16" y="76" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="144" y="76" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="16" y="94" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="34" y="94" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="126" y="94" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="144" y="94" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="58" y="126" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="76" y="126" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="94" y="126" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="58" y="144" width="10" height="10" rx="2" fill="#1C1917" />
                    <rect x="94" y="144" width="10" height="10" rx="2" fill="#1C1917" />

                    {/* Center Royal Dum Emblem */}
                    <circle cx="85" cy="85" r="22" fill="#C2410C" />
                    <circle cx="85" cy="85" r="19" fill="#1C1917" />
                    <text x="85" y="89" fill="#FB923C" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DUM</text>
                  </svg>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8125rem', color: 'rgba(250, 242, 238, 0.7)', marginBottom: '0.75rem' }}>
                  <Clock size={14} color="#FB923C" />
                  <span>QR code expires in: <strong style={{ color: '#FAF2EE' }}>{formatTimer(timeLeft)}</strong></span>
                </div>

                {/* UPI VPA Copy Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '0.625rem 1rem',
                  maxWidth: '340px',
                  margin: '0 auto 1.25rem'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'rgba(250, 242, 238, 0.5)', display: 'block' }}>RESTAURANT VPA</span>
                    <strong style={{ fontSize: '0.875rem', color: '#FAF2EE' }}>dumandco@icici</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUPI}
                    style={{
                      background: copiedUpi ? '#15803D' : 'rgba(194, 65, 12, 0.3)',
                      color: '#FAF2EE',
                      border: '1px solid rgba(194, 65, 12, 0.4)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedUpi ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>

                {/* Popular UPI Apps Pill List */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'].map(app => (
                    <span key={app} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      color: 'rgba(250, 242, 238, 0.8)'
                    }}>
                      {app}
                    </span>
                  ))}
                </div>

                {/* Simulated Payment Action Button */}
                <button
                  type="button"
                  onClick={() => handlePay('Instant UPI / QR Code')}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
                    color: '#FAF2EE',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(194, 65, 12, 0.3)'
                  }}
                >
                  <Sparkles size={18} />
                  <span>Simulate Successful UPI Payment • ₹{amount}</span>
                </button>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card */}
            {activeTab === 'card' && (
              <div style={{ padding: '1.5rem' }}>
                {/* Visual Card Mockup */}
                <div style={{
                  background: 'linear-gradient(135deg, #292524 0%, #0C0A09 100%)',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(251, 146, 60, 0.3)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                  marginBottom: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#FB923C', letterSpacing: '0.05em' }}>
                      ROYAL PATRON CARD
                    </span>
                    <ShieldCheck size={18} color="#22C55E" />
                  </div>
                  <div style={{ fontSize: '1.1875rem', letterSpacing: '0.15em', fontFamily: 'monospace', color: '#FAF2EE', marginBottom: '1.25rem' }}>
                    {cardData.number}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'rgba(250, 242, 238, 0.5)' }}>CARD HOLDER</span>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FAF2EE' }}>{cardData.name}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'rgba(250, 242, 238, 0.5)' }}>EXPIRES</span>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FAF2EE' }}>{cardData.expiry}</div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 238, 0.7)', marginBottom: '4px', display: 'block' }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.625rem 0.875rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#FAF2EE',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 238, 0.7)', marginBottom: '4px', display: 'block' }}>
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.625rem 0.875rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FAF2EE',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 238, 0.7)', marginBottom: '4px', display: 'block' }}>
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength="3"
                        defaultValue="821"
                        style={{
                          width: '100%',
                          padding: '0.625rem 0.875rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FAF2EE',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePay('Credit / Debit Card')}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
                    color: '#FAF2EE',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(194, 65, 12, 0.3)'
                  }}
                >
                  <Lock size={16} />
                  <span>Authorize & Pay • ₹{amount}</span>
                </button>
              </div>
            )}

            {/* Tab 3: Net Banking */}
            {activeTab === 'netbanking' && (
              <div style={{ padding: '1.5rem' }}>
                <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'rgba(250, 242, 238, 0.7)' }}>
                  Select your primary banking institution for Instant NetBanking Authorization:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: selectedBank === bank ? 'rgba(194, 65, 12, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1.5px solid ${selectedBank === bank ? '#FB923C' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '10px',
                        color: selectedBank === bank ? '#FB923C' : '#FAF2EE',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handlePay(`Net Banking (${selectedBank})`)}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
                    color: '#FAF2EE',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(194, 65, 12, 0.3)'
                  }}
                >
                  <Building2 size={16} />
                  <span>Proceed with {selectedBank} • ₹{amount}</span>
                </button>
              </div>
            )}

            {/* Footer Trust Shield */}
            <div style={{
              padding: '0.875rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: 'rgba(250, 242, 238, 0.5)'
            }}>
              <ShieldCheck size={14} color="#22C55E" />
              <span>Certified Dum & Co. Sandbox Gateway • Zero Real Funds Deducted</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
