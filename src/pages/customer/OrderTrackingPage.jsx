import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Flame, 
  PackageCheck, 
  Bike, 
  Home, 
  Phone, 
  Clock, 
  MessageSquare, 
  Printer, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/supabase';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(2); // Simulated in kitchen / simmering

  useEffect(() => {
    const fetchOrder = async () => {
      const allOrders = await api.getOrders();
      const current = allOrders.find(o => o.id === id) || allOrders[0];
      setOrder(current);

      if (current) {
        if (current.status === 'Received') setActiveStep(1);
        else if (current.status === 'In Kitchen') setActiveStep(2);
        else if (current.status === 'Ready') setActiveStep(3);
        else if (current.status === 'Out for Delivery') setActiveStep(4);
        else if (current.status === 'Delivered') setActiveStep(5);
      }
    };
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return (
      <div className="container-custom" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Locating Handi Dispatch...</h2>
      </div>
    );
  }

  const steps = [
    { title: 'Order Confirmed', desc: 'Potli spices hand-measured', icon: CheckCircle2 },
    { title: 'Simmering on Dum', desc: 'Dough-sealed handi over charcoal', icon: Flame },
    { title: 'Packed & Inspected', desc: 'Tamper-evident royal ribbon applied', icon: PackageCheck },
    { title: 'Rider on the Way', desc: 'Express thermal bag dispatch', icon: Bike },
    { title: 'Delivered', desc: 'Enjoy your piping hot feast', icon: Home }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem 0 5rem' }}>
      <div className="container-custom">
        {/* Navigation Breadcrumb */}
        <Link
          to="/profile"
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
          <span>My Orders History</span>
        </Link>

        {/* Order Header Card */}
        <div style={{
          backgroundColor: 'var(--surface-raised)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                LIVE HANDI TRACKER
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Order #{order.id}
              </span>
            </div>

            <h1 style={{ fontSize: '1.875rem', margin: 0, color: 'var(--text-high)' }}>
              {activeStep === 5 ? 'Feast Delivered Successfully' : 'Your Dum Handi is Being Prepared'}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9375rem', margin: 0 }}>
              Estimated Arrival: <strong style={{ color: 'var(--primary)' }}>{order.estimatedDelivery || '28-35 mins'}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn-outline"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Printer size={16} />
              <span>Print Kitchen Bill</span>
            </button>
            <a
              href={`https://wa.me/919876543210?text=Hi%20Dum%20%26%20Co.,%20checking%20status%20for%20order%20${order.id}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp Kitchen</span>
            </a>
          </div>
        </div>

        {/* 5-Stage Visual Progress Timeline */}
        <div style={{
          backgroundColor: 'var(--surface-raised)',
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Royal Preparation Journey</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {steps.map((st, idx) => {
              const stepNumber = idx + 1;
              const isPast = stepNumber < activeStep;
              const isCurrent = stepNumber === activeStep;
              const Icon = st.icon;

              return (
                <div key={st.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent ? 'var(--primary)' : (isPast ? '#15803D' : 'var(--surface-subdued)'),
                    color: isCurrent || isPast ? '#FFFFFF' : 'var(--text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: isCurrent ? '0 0 0 6px var(--primary-light)' : 'none',
                    transition: 'all 0.3s'
                  }}>
                    <Icon size={24} />
                  </div>

                  <strong style={{
                    fontSize: '0.9375rem',
                    color: isCurrent ? 'var(--primary)' : (isPast ? 'var(--text-high)' : 'var(--text-muted)'),
                    marginBottom: '4px'
                  }}>
                    {st.title}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {st.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Info: Rider Card & Order Recap */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Delivery Valet Card */}
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Assigned Delivery Valet</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700
              }}>
                {order.rider?.name?.[0] || 'V'}
              </div>

              <div>
                <strong style={{ fontSize: '1.125rem', display: 'block', color: 'var(--text-high)' }}>
                  {order.rider?.name || 'Vikram Chauhan'}
                </strong>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block' }}>
                  Handi Specialist Rider • 5.0 ★
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>
                  Vehicle: {order.rider?.vehicle || 'HR-26-ED-4412'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={`tel:${order.rider?.phone || '+919988766554'}`}
                className="btn-primary"
                style={{ flex: 1, padding: '0.75rem', fontSize: '0.875rem' }}
              >
                <Phone size={16} />
                <span>Call Valet</span>
              </a>
              <a
                href={`https://wa.me/${(order.rider?.phone || '919988766554').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ flex: 1, padding: '0.75rem', fontSize: '0.875rem' }}
              >
                <MessageSquare size={16} />
                <span>Message</span>
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border-subtle)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <strong>Delivery Destination:</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--text-high)' }}>
                {order.customer?.address || 'Golf Course Road, Gurugram'}
              </p>
            </div>
          </div>

          {/* Itemized Order Recap */}
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Order Details</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--text-high)' }}>
                      {item.quantity} × {item.name}
                    </span>
                    {item.portion && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.portion}
                      </span>
                    )}
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              paddingTop: '1rem',
              borderTop: '1px solid var(--surface-border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dietary-veg)' }}>
                  <span>Coupon Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (5%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                marginTop: '4px',
                borderTop: '1px solid var(--surface-border)',
                fontSize: '1.125rem',
                fontWeight: 800,
                color: 'var(--text-high)'
              }}>
                <span>Total Paid</span>
                <span style={{ color: 'var(--primary)' }}>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
