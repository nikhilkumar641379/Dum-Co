import React, { useState, useEffect } from 'react';
import { PlusCircle, Tag, Trash2, Edit3, CheckCircle } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [form, setForm] = useState({
    code: '',
    discountPercent: 20,
    maxDiscount: 200,
    minOrder: 499,
    validUntil: '2026-12-31',
    description: '20% off up to ₹200 on all orders',
    terms: 'Valid once per user.',
    status: 'active'
  });

  const fetchCoupons = async () => {
    const data = await api.getCoupons();
    setCoupons(data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setForm({
      code: 'ROYAL' + Math.floor(100 + Math.random() * 900),
      discountPercent: 15,
      maxDiscount: 150,
      minOrder: 499,
      validUntil: '2026-12-31',
      description: 'Exclusive 15% royal patron privilege',
      terms: 'Applicable on Handi Biryanis & Gravies.',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Delete coupon code ${code}?`)) {
      await api.deleteCoupon(id);
      await fetchCoupons();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = editingCoupon
      ? { ...editingCoupon, ...form }
      : { ...form, code: form.code.toUpperCase() };

    await api.saveCoupon(payload);
    setShowModal(false);
    await fetchCoupons();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Coupons & Promotional Vouchers
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure discount incentives, cart value gates, and campaign validity.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary"
          style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
        >
          <PlusCircle size={16} />
          <span>Generate New Voucher</span>
        </button>
      </div>

      {/* Coupons Table */}
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
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Voucher Code</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Discount Value</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Min Cart Threshold</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Redemptions</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Expiry Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={16} color="var(--primary)" />
                      <strong style={{ fontSize: '1rem', color: 'var(--primary)', letterSpacing: '0.06em' }}>
                        {c.code}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                      {c.description}
                    </span>
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>
                    {c.discountPercent ? `${c.discountPercent}% OFF (Cap ₹${c.maxDiscount || 'None'})` : `Flat ₹${c.discountFlat} OFF`}
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    ₹{c.minOrder || 0}
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-body)' }}>
                    <strong>{c.usageCount || 0}</strong> uses
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>
                    {c.validUntil}
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: c.status === 'active' ? '#DCFCE7' : '#FEE2E2',
                      color: c.status === 'active' ? '#15803D' : '#B91C1C'
                    }}>
                      {c.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <button
                      onClick={() => handleDelete(c.id, c.code)}
                      style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '4px' }}
                      title="Delete Voucher"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '480px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.75rem', backgroundColor: '#FBF9F5', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Create Promotion Voucher</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Voucher Code *</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className="input-dum"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Discount %</label>
                  <input
                    type="number"
                    value={form.discountPercent}
                    onChange={(e) => setForm({ ...form, discountPercent: Number(e.target.value) })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Max Cap (₹)</label>
                  <input
                    type="number"
                    value={form.maxDiscount}
                    onChange={(e) => setForm({ ...form, maxDiscount: Number(e.target.value) })}
                    className="input-dum"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Min Cart Value (₹)</label>
                  <input
                    type="number"
                    value={form.minOrder}
                    onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Validity Date</label>
                  <input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    className="input-dum"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Campaign Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-dum"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Publish Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
