import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  RotateCcw, 
  ExternalLink, 
  LogOut, 
  Award,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/supabase';

export const ProfileOrdersPage = () => {
  const { user, logoutCustomer } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'profile'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Aaditya Singhania',
    email: user?.email || 'aaditya.singhania@gmail.com',
    phone: user?.phone || '+91 98201 12345',
    address: user?.address || 'Villa 14, Magnolias, Golf Course Road, Gurugram'
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const all = await api.getOrders();
      setOrders(all);
    };
    fetchOrders();
  }, []);

  const handleReorder = (order) => {
    order.items?.forEach(item => {
      addToCart(
        { id: item.id, name: item.name, price: item.price, dietary: 'non-veg', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
        { name: item.portion || 'Standard', price: item.price },
        item.accompaniments || []
      );
    });
    navigate('/checkout');
  };

  const handleLogout = () => {
    logoutCustomer();
    navigate('/login');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        {/* Profile Hero Header */}
        <div style={{
          backgroundColor: 'var(--surface-dark)',
          color: '#FAF2EE',
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif"
            }}>
              {profileForm.name[0] || 'P'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.875rem', margin: 0, color: '#FFF8F5' }}>
                  {profileForm.name}
                </h1>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--secondary-glow)',
                  color: 'var(--secondary)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Award size={12} />
                  <span>Royal Patron</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8125rem', color: '#A8A29E' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} />
                  {profileForm.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} />
                  {profileForm.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn-outline"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backgroundColor: 'transparent',
              color: '#F87171',
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '2.5rem' }}>
          <button
            onClick={() => setActiveTab('orders')}
            className={`chip ${activeTab === 'orders' ? 'active' : ''}`}
            style={{ fontSize: '0.9375rem', padding: '0.625rem 1.25rem' }}
          >
            Handi Orders History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`chip ${activeTab === 'addresses' ? 'active' : ''}`}
            style={{ fontSize: '0.9375rem', padding: '0.625rem 1.25rem' }}
          >
            Saved Delivery Sanctuaries
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`chip ${activeTab === 'profile' ? 'active' : ''}`}
            style={{ fontSize: '0.9375rem', padding: '0.625rem 1.25rem' }}
          >
            Account Credentials
          </button>
        </div>

        {/* Orders Tab Content */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--surface-raised)', borderRadius: 'var(--radius-xl)' }}>
                <ShoppingBag size={48} color="var(--text-subtle)" style={{ margin: '0 auto 1rem' }} />
                <h3>No Orders Placed Yet</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Your handi feast history will appear here once you place your first order.
                </p>
                <Link to="/menu" className="btn-primary">Browse Royal Menu</Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    backgroundColor: 'var(--surface-raised)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--surface-border)',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border-subtle)', marginBottom: '1rem', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '1.0625rem', color: 'var(--text-high)' }}>Order #{ord.id}</strong>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: ord.status === 'Delivered' ? '#DCFCE7' : 'var(--primary-light)',
                          color: ord.status === 'Delivered' ? '#15803D' : 'var(--primary)'
                        }}>
                          {ord.status}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {ord.paymentMethod}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Link
                        to={`/order-tracking/${ord.id}`}
                        className="btn-outline"
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}
                      >
                        <ExternalLink size={14} />
                        <span>Track Handi</span>
                      </Link>
                      <button
                        onClick={() => handleReorder(ord)}
                        className="btn-primary"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
                      >
                        <RotateCcw size={14} />
                        <span>Reorder Feast</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                    {ord.items?.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span>{item.quantity} × {item.name} ({item.portion || 'Regular'})</span>
                        <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-border-subtle)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Delivered to: {ord.customer?.address || 'Golf Course Road, Gurugram'}</span>
                    <strong style={{ fontSize: '1.0625rem', color: 'var(--text-high)' }}>Total: ₹{ord.total}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Addresses Tab Content */}
        {activeTab === 'addresses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              backgroundColor: 'var(--surface-raised)',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--primary)',
              padding: '1.75rem',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}>
                PRIMARY
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={18} color="var(--primary)" />
                <strong style={{ fontSize: '1.0625rem' }}>Home Sanctuary</strong>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: '1.5', margin: 0 }}>
                {profileForm.address}
              </p>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Delivery Valet Note: Ring bell once, leave sealed handi at console.
              </span>
            </div>

            <div style={{
              backgroundColor: 'var(--surface-raised)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--surface-border)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              <Plus size={32} color="var(--primary)" style={{ marginBottom: '8px' }} />
              <strong style={{ fontSize: '1rem', color: 'var(--text-high)' }}>Add New Delivery Address</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Work, Private Lounge or Villa</span>
            </div>
          </div>
        )}

        {/* Profile Edit Tab Content */}
        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)',
            padding: '2rem',
            maxWidth: '600px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Update Personal Details</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Mobile Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Primary Address</label>
                  <textarea
                    rows={2}
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="input-dum"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary">Save Profile Changes</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
