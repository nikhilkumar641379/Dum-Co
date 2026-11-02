import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, DollarSign } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getAnalytics();
      setAnalytics(data);
    };
    fetchData();
  }, []);

  if (!analytics) return <div>Loading Analytics...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
          Revenue & Culinary Performance Analytics
        </h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Comprehensive breakdown of sales channels, course popularity, and operational metrics.
        </p>
      </div>

      {/* High-level Revenue Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--surface-border)' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>This Month's Gross Revenue</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Playfair Display', serif", margin: '6px 0' }}>
            ₹{analytics.summary.monthRevenue.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600 }}>↑ +24.8% vs last month</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--surface-border)' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Average Order Value (AOV)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-high)', fontFamily: "'Playfair Display', serif", margin: '6px 0' }}>
            ₹{analytics.summary.avgOrderValue}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>Consistent premium handi cart size</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--surface-border)' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Repeat Order Ratio</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#15803D', fontFamily: "'Playfair Display', serif", margin: '6px 0' }}>
            68.2%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High loyalty among Awadhi patrons</span>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Course Category Share & Revenue</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {analytics.categoryPerformance.map((cat) => (
            <div key={cat.category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.875rem' }}>
                <strong style={{ color: 'var(--text-high)' }}>{cat.category}</strong>
                <span>
                  <strong>₹{cat.revenue.toLocaleString('en-IN')}</strong> ({cat.share}%)
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--surface-subdued)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${cat.share}%`,
                    height: '100%',
                    backgroundColor: cat.category === 'Dum Biryanis' ? 'var(--primary)' : (cat.category === 'Royal Gravies' ? 'var(--secondary)' : '#15803D'),
                    borderRadius: 'var(--radius-full)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
