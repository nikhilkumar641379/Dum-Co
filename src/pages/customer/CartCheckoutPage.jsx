import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  Tag, 
  CheckCircle, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/supabase';
import { PaymentModal } from '../../components/PaymentModal';

export const CartCheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items,
    subtotal,
    discount,
    tax,
    packagingFee,
    deliveryFee,
    grandTotal,
    appliedCoupon,
    couponError,
    applyCouponCode,
    removeCoupon,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || 'Aaditya Singhania',
    phone: user?.phone || '+91 98201 12345',
    email: user?.email || 'aaditya.singhania@gmail.com',
    address: user?.address || 'Villa 14, Magnolias, Golf Course Road',
    landmark: 'Opposite DLF Club',
    city: 'Gurugram',
    pincode: '122002',
    cookingNotes: 'Please ensure extra brown onions (barista) on the dum biryani handi.',
    deliveryOption: 'express', // 'express' or 'scheduled'
    paymentMethod: 'upi' // 'upi', 'card', 'cod'
  });

  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-custom" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <ShoppingBag size={54} color="var(--text-subtle)" style={{ margin: '0 auto 1.5rem' }} />
        <h2>Your Handi is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Please add dishes from our royal menu to proceed with checkout.
        </p>
        <Link to="/menu" className="btn-primary">
          Explore Royal Menu
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    await applyCouponCode(couponCode);
  };

  // Triggered on Form Submit
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'cod') {
      executeOrderCreation({
        method: 'Cash on Delivery (Handi COD)',
        status: 'Pending',
        transactionId: null
      });
    } else {
      setShowPaymentModal(true);
    }
  };

  // Executes Order Creation and Saves to Supabase/LocalStorage
  const executeOrderCreation = async (paymentDetails) => {
    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city} - ${formData.pincode}`
      },
      items: items.map(i => ({
        id: i.foodId,
        name: i.name,
        portion: i.portion,
        price: i.price,
        quantity: i.quantity,
        accompaniments: i.accompaniments
      })),
      subtotal,
      discount,
      tax,
      packagingFee,
      deliveryFee,
      total: grandTotal,
      notes: formData.cookingNotes,
      paymentMethod: paymentDetails.method || 'Online UPI',
      paymentStatus: paymentDetails.status || 'Paid',
      transactionId: paymentDetails.transactionId || null,
      deliveryOption: formData.deliveryOption === 'express' ? 'Express Dum Delivery (35 Mins)' : 'Scheduled Royal Dinner'
    };

    try {
      const created = await api.createOrder(orderPayload);
      
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#C2410C', '#B45309', '#15803D', '#FAF2EE']
        });
      } catch (err) {
        // Confetti fallback
      }

      clearCart();
      setTimeout(() => {
        navigate(`/order-tracking/${created.id}`);
      }, 1000);
    } catch (err) {
      console.error('Order creation error', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0 2.5rem' }}>
      <div className="container-custom">
        {/* Navigation Breadcrumb */}
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
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Continue Ordering</span>
        </Link>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '2.5rem' }}>
          Secure Royal Checkout
        </h1>

        <form onSubmit={handleCheckoutSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Left Column: Delivery & Payment Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Contact Information */}
              <div style={{
                backgroundColor: 'var(--surface-raised)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>1</span>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Contact Information</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-dum"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number (for rider updates) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-dum"
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Email Address (for receipt & invoice) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-dum"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Destination */}
              <div style={{
                backgroundColor: 'var(--surface-raised)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>2</span>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Delivery Sanctuary / Address</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Street / Villa / Apartment Details *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-dum"
                      placeholder="e.g. Villa 14, Magnolias, Golf Course Road"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Landmark</label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="input-dum"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-dum"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="input-dum"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Special Kitchen or Dum Preparation Notes</label>
                    <textarea
                      name="cookingNotes"
                      rows={2}
                      value={formData.cookingNotes}
                      onChange={handleInputChange}
                      className="input-dum"
                      placeholder="e.g. Less spicy for children, extra salan, ring bell twice..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{
                backgroundColor: 'var(--surface-raised)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>3</span>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Payment Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${formData.paymentMethod === 'upi' ? 'var(--primary)' : 'var(--surface-border)'}`,
                      backgroundColor: formData.paymentMethod === 'upi' ? 'var(--primary-light)' : 'var(--surface-canvas)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <div>
                        <strong style={{ fontSize: '0.9375rem', display: 'block' }}>Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fastest & seamless contactless authorization</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--dietary-veg)', fontWeight: 700 }}>RECOMMENDED</span>
                  </label>

                  <label
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${formData.paymentMethod === 'card' ? 'var(--primary)' : 'var(--surface-border)'}`,
                      backgroundColor: formData.paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--surface-canvas)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.9375rem', display: 'block' }}>Credit / Debit Cards & Net Banking</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visa, Mastercard, RuPay, Amex via Razorpay Secure Gateway</span>
                    </div>
                  </label>

                  <label
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${formData.paymentMethod === 'cod' ? 'var(--primary)' : 'var(--surface-border)'}`,
                      backgroundColor: formData.paymentMethod === 'cod' ? 'var(--primary-light)' : 'var(--surface-canvas)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.9375rem', display: 'block' }}>Cash / UPI on Handi Delivery</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay at your doorstep upon receiving sealed clay handis</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Pay */}
            <div>
              <div style={{
                backgroundColor: 'var(--surface-raised)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--surface-border)',
                boxShadow: 'var(--shadow-card)',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--surface-border)' }}>
                  Handi Feast Summary
                </h3>

                {/* Items Mini List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem', maxHeight: '240px', overflowY: 'auto' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-high)' }}>
                          {item.quantity} × {item.name}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.portion}
                        </span>
                      </div>
                      <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Voucher Promo Code */}
                <div style={{ marginBottom: '1.5rem' }}>
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
                        <span><strong>{appliedCoupon.code}</strong> (-₹{appliedCoupon.discount})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        style={{ background: 'none', border: 'none', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="input-dum"
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="btn-outline"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <span style={{ fontSize: '0.75rem', color: '#B91C1C', marginTop: '4px', display: 'block' }}>
                          {couponError}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
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
                    <span>Clay Handi Seal Packaging</span>
                    <span>₹{packagingFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Delivery Charges</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--dietary-veg)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    marginTop: '6px',
                    borderTop: '1px solid var(--surface-border)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-high)'
                  }}>
                    <span>Grand Total</span>
                    <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.0625rem', gap: '8px' }}
                >
                  <Sparkles size={18} />
                  <span>{isSubmitting ? 'Sealing Your Order...' : `Place Royal Order • ₹${grandTotal}`}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={16} color="#15803D" />
                  <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Interactive Royal Sandbox Payment Gateway Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={grandTotal}
        orderDetails={{
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }}
        onPaymentSuccess={(paymentDetails) => {
          setShowPaymentModal(false);
          executeOrderCreation(paymentDetails);
        }}
      />
    </div>
  );
};
