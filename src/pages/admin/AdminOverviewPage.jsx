import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Clock, 
  ArrowUpRight, 
  PlusCircle, 
  Tag, 
  ChefHat, 
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminOverviewPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stats = await api.getAnalytics();
      const orders = await api.getOrders();
      setAnalytics(stats);
      setRecentOrders(orders.slice(0, 5));
    };
    fetchData();
  }, []);

  const handleQuickStatusChange = async (orderId, newStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    const updated = await api.getOrders();
    setRecentOrders(updated.slice(0, 5));
  };

  if (!analytics) return <div>Loading Executive Dashboard...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner & Quick Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Restaurant Command Overview
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Real-time handi orders, live kitchen queues, and sales telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/admin/menu/add" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            <PlusCircle size={16} />
            <span>Add New Dish</span>
          </Link>
          <Link to="/admin/coupons" className="btn-outline" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            <Tag size={16} />
            <span>Create Promo</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Card 1: Today Revenue */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Today's Revenue</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#15803D',
              backgroundColor: '#DCFCE7',
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)'
            }}>
              +18.4%
              <ArrowUpRight size={12} />
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
            ₹{analytics.summary.todayRevenue.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Across all order channels
          </span>
        </div>

        {/* Card 2: Handi Orders */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Orders Placed</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#15803D',
              backgroundColor: '#DCFCE7',
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)'
            }}>
              +12 today
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
            {analytics.summary.todayOrders} Handis
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Avg Order: ₹{analytics.summary.avgOrderValue}
          </span>
        </div>

        {/* Card 3: Active In Kitchen */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Live Kitchen Queue</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              <Flame size={12} />
              Simmering
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
            {analytics.summary.activeKitchenQueue} Handis
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Target prep: under 30 mins
          </span>
        </div>

        {/* Card 4: Registered Patrons */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Patrons</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
              CRM Active
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif" }}>
            {analytics.summary.totalCustomers}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Gurugram & Delhi NCR
          </span>
        </div>
      </div>

      {/* Hourly Sales Trend Visualizer */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1875rem', margin: '0 0 4px' }}>Today's Hourly Ordering Surge</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Peak dining hours 7:00 PM – 10:00 PM</span>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)', fontWeight: 700 }}>
            Peak Hour: 8:00 PM (42 Handis)
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${analytics.hourlyOrders.length}, 1fr)`,
          alignItems: 'flex-end',
          gap: '12px',
          height: '180px',
          paddingTop: '20px',
          borderBottom: '1px solid var(--surface-border)'
        }}>
          {analytics.hourlyOrders.map((item) => {
            const heightPercent = (item.orders / 45) * 100;
            return (
              <div key={item.hour} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {item.orders}
                </span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '40px',
                    height: `${heightPercent}%`,
                    backgroundColor: item.orders > 30 ? 'var(--primary)' : 'var(--secondary)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease'
                  }}
                  title={`${item.hour}: ₹${item.revenue.toLocaleString()}`}
                />
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Live Orders Queue */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1875rem', margin: '0 0 2px' }}>Live Incoming Orders Stream</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated live • Click order to inspect details</span>
          </div>
          <Link to="/admin/orders" style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            View All Orders Queue &rarr;
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FBF9F5', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Items Summary</th>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Total</th>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Current Status</th>
                <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>
                    <Link to={`/admin/orders/${ord.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                      #{ord.id}
                    </Link>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <strong style={{ display: 'block', color: 'var(--text-high)' }}>{ord.customer?.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ord.customer?.phone}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-body)' }}>
                    {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>
                    ₹{ord.total}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: ord.status === 'Delivered' ? '#DCFCE7' : 'var(--primary-light)',
                      color: ord.status === 'Delivered' ? '#15803D' : 'var(--primary)'
                    }}>
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {ord.status === 'Received' && (
                      <button
                        onClick={() => handleQuickStatusChange(ord.id, 'In Kitchen')}
                        className="btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Send to Dum
                      </button>
                    )}
                    {ord.status === 'In Kitchen' && (
                      <button
                        onClick={() => handleQuickStatusChange(ord.id, 'Ready')}
                        className="btn-outline"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#15803D', borderColor: '#16A34A' }}
                      >
                        Mark Ready
                      </button>
                    )}
                    {ord.status === 'Ready' && (
                      <button
                        onClick={() => handleQuickStatusChange(ord.id, 'Out for Delivery')}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Hand to Rider
                      </button>
                    )}
                    {ord.status === 'Out for Delivery' && (
                      <button
                        onClick={() => handleQuickStatusChange(ord.id, 'Delivered')}
                        className="btn-outline"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Mark Delivered
                      </button>
                    )}
                    {ord.status === 'Delivered' && (
                      <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600 }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
