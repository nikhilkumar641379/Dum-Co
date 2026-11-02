import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Filter, Download, Clock } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    const data = await api.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    await fetchOrders();
  };

  const filteredOrders = orders.filter((ord) => {
    if (filterStatus !== 'all' && ord.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = ord.id.toLowerCase().includes(q);
      const matchName = ord.customer?.name.toLowerCase().includes(q);
      const matchPhone = ord.customer?.phone.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const statuses = ['all', 'Received', 'In Kitchen', 'Ready', 'Out for Delivery', 'Delivered'];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Title */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Live Order Management
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Track, filter, and transition customer handi orders through the kitchen dispatch cycle.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn-outline"
          style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
        >
          <Download size={16} />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by Order ID (DUM-9841), Customer Name, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dum"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Status Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`chip ${filterStatus === st ? 'active' : ''}`}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem', whiteSpace: 'nowrap' }}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FBF9F5', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Time Placed</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Customer Details</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Items Ordered</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Total Paid</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Order Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No orders match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>
                      <Link to={`/admin/orders/${ord.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                        #{ord.id}
                      </Link>
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        <span>{new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-high)' }}>{ord.customer?.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{ord.customer?.phone}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ord.customer?.address}</span>
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem', maxWidth: '240px' }}>
                      {ord.items?.map((it, idx) => (
                        <div key={idx} style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <strong>{it.quantity}x</strong> {it.name}
                        </div>
                      ))}
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-high)', display: 'block' }}>₹{ord.total}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600 }}>{ord.paymentStatus || 'Paid'}</span>
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusUpdate(ord.id, e.target.value)}
                        className="input-dum"
                        style={{
                          width: 'auto',
                          padding: '4px 10px',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          borderColor: ord.status === 'Delivered' ? '#16A34A' : 'var(--primary)'
                        }}
                      >
                        <option value="Received">Received</option>
                        <option value="In Kitchen">In Kitchen</option>
                        <option value="Ready">Ready</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="btn-outline"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        <Eye size={14} />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
