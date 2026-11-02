import React, { useState, useEffect } from 'react';
import { Search, Users, Award, Mail, Phone, ShoppingBag, Eye } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await api.getCustomers();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q) && !c.phone.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Customer CRM & Patron Directory
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Monitor loyal patrons, lifetime spending, order frequencies, and culinary preferences.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search patrons by name, email, or mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dum"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      {/* Customers Table */}
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
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patron Details</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Loyalty Tier</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Total Handis Ordered</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Lifetime Spend</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Culinary Affinity</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--secondary)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                      }}>
                        {cust.name[0]}
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-high)' }}>{cust.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.email} • {cust.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: cust.loyaltyTier === 'Royal Patron' ? 'var(--secondary-glow)' : 'var(--surface-subdued)',
                      color: cust.loyaltyTier === 'Royal Patron' ? 'var(--secondary)' : 'var(--text-high)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Award size={12} />
                      <span>{cust.loyaltyTier}</span>
                    </span>
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>
                    {cust.totalOrders} Feasts
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-body)' }}>
                    {cust.favoriteDish}
                  </td>

                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="btn-outline"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <Eye size={14} />
                      <span>CRM View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer CRM Modal View */}
      {selectedCustomer && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '520px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#1E1B19', color: '#FAF2EE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                  {selectedCustomer.name[0]}
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#FFF8F5' }}>{selectedCustomer.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#FDE68A' }}>{selectedCustomer.loyaltyTier}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
            </div>

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--surface-subdued)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Feasts</span>
                  <strong style={{ display: 'block', fontSize: '1.25rem' }}>{selectedCustomer.totalOrders}</strong>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--surface-subdued)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lifetime Value</span>
                  <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--primary)' }}>₹{selectedCustomer.totalSpent.toLocaleString()}</strong>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--text-high)', marginBottom: '4px' }}>Preferred Handi:</strong>
                <span>{selectedCustomer.favoriteDish}</span>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--text-high)', marginBottom: '4px' }}>Direct Contact:</strong>
                <span>Email: {selectedCustomer.email}</span><br />
                <span>Phone: {selectedCustomer.phone}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="btn-outline"
                  style={{ flex: 1, padding: '0.625rem', textAlign: 'center', fontSize: '0.8125rem' }}
                >
                  <Phone size={14} />
                  <span>Call Patron</span>
                </a>
                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=Dear%20${selectedCustomer.name},%20greetings%20from%20Dum%20%26%20Co.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.625rem', textAlign: 'center', fontSize: '0.8125rem' }}
                >
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
