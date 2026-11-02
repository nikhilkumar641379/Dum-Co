import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Printer, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Bike,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await api.getOrderById(id);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Locating Order Details...</div>;

  const handleStatusChange = async (newStatus) => {
    const updated = await api.updateOrderStatus(order.id, newStatus);
    setOrder(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Breadcrumb & Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <Link
          to="/admin/orders"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Orders</span>
        </Link>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePrint} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
            <Printer size={16} />
            <span>Print Kitchen KOT & Bill</span>
          </button>
          <a
            href={`https://wa.me/${(order.customer?.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${order.customer?.name},%20your%20Dum%20%26%20Co.%20order%20${order.id}%20is%20${order.status}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp Customer</span>
          </a>
        </div>
      </div>

      {/* Main Order Header Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--text-high)' }}>
              Order #{order.id}
            </h1>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: order.status === 'Delivered' ? '#DCFCE7' : 'var(--primary-light)',
              color: order.status === 'Delivered' ? '#15803D' : 'var(--primary)'
            }}>
              {order.status}
            </span>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Placed on {new Date(order.createdAt).toLocaleString('en-IN')} • Payment: {order.paymentMethod} ({order.paymentStatus || 'Paid'})
          </span>
        </div>

        {/* Status Transition Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Transition Status:</span>
          {['Received', 'In Kitchen', 'Ready', 'Out for Delivery', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: order.status === st ? 'var(--primary)' : 'var(--surface-border)',
                backgroundColor: order.status === st ? 'var(--primary)' : '#FFFFFF',
                color: order.status === st ? '#FFFFFF' : 'var(--text-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Items Bill & Customer Dispatch */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {/* Left Column: Kitchen Order Details & Bill */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--surface-border)' }}>
            Handi Items & Kitchen Notes
          </h3>

          {/* Items Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {order.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--surface-border-subtle)' }}>
                <div>
                  <strong style={{ fontSize: '0.9375rem', color: 'var(--text-high)', display: 'block' }}>
                    {item.quantity} × {item.name}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Portion: {item.portion || 'Standard'}
                  </span>
                  {item.accompaniments?.length > 0 && (
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)' }}>
                      Accompaniments: {item.accompaniments.join(', ')}
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Special Cooking Notes */}
          {order.notes && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--surface-subdued)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              marginBottom: '1.5rem'
            }}>
              <strong style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                PATRON'S KITCHEN INSTRUCTIONS
              </strong>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-body)', fontStyle: 'italic' }}>
                "{order.notes}"
              </p>
            </div>
          )}

          {/* Bill Calculation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Item Subtotal</span>
              <span style={{ color: 'var(--text-high)' }}>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803D' }}>
                <span>Coupon Savings</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST (5%)</span>
              <span>₹{order.tax}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Handi Seal Packaging</span>
              <span>₹{order.packagingFee || 30}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '8px',
              marginTop: '4px',
              borderTop: '1px solid var(--surface-border)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-high)'
            }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Profile & Valet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Customer Dispatch Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Customer & Destination</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <User size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-high)', display: 'block' }}>{order.customer?.name}</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Royal Patron Tier</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`tel:${order.customer?.phone}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    {order.customer?.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-high)', display: 'block' }}>Delivery Sanctuary</strong>
                  <span style={{ color: 'var(--text-body)', lineHeight: '1.5' }}>{order.customer?.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Valet / Rider Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Assigned Handi Rider</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                <Bike size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-high)' }}>{order.rider?.name || 'Vikram Chauhan'}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vehicle: {order.rider?.vehicle || 'HR-26-ED-4412'}</span>
              </div>
            </div>

            <a
              href={`tel:${order.rider?.phone || '+919988766554'}`}
              className="btn-outline"
              style={{ width: '100%', padding: '0.625rem', fontSize: '0.8125rem' }}
            >
              <Phone size={14} />
              <span>Call Rider ({order.rider?.phone || '+91 99887 66554'})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
