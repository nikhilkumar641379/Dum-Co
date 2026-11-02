import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  PlusCircle, 
  Layers, 
  Tag, 
  Users, 
  BarChart3, 
  Settings, 
  UserCheck, 
  LogOut, 
  ExternalLink, 
  Bell, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { isAdminLoggedIn, logoutAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not logged in as admin, redirect to admin login
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Live Orders', path: '/admin/orders', icon: ShoppingBag, badge: '3 Active' },
    { label: 'Menu Catalog', path: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Add New Dish', path: '/admin/menu/add', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Coupons & Promos', path: '/admin/coupons', icon: Tag },
    { label: 'Customers CRM', path: '/admin/customers', icon: Users },
    { label: 'Analytics & Sales', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Restaurant Settings', path: '/admin/settings', icon: Settings },
    { label: 'Admin Profile', path: '/admin/profile', icon: UserCheck }
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname === path) return true;
    return false;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F2' }}>
      {/* Sidebar for Desktop */}
      <aside style={{
        width: '260px',
        backgroundColor: '#1E1B19',
        color: '#FAF2EE',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 50,
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
      }} className="admin-sidebar">
        <style>{`
          @media (max-width: 900px) {
            .admin-sidebar {
              transform: ${mobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
              transition: transform 0.3s ease;
            }
            .admin-main-content {
              margin-left: 0 !important;
            }
          }
        `}</style>

        {/* Sidebar Brand Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.125rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              D
            </div>
            <div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: '#FFF8F5',
                display: 'block',
                lineHeight: 1.1
              }}>
                Dum & Co.
              </span>
              <span style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--secondary)',
                fontWeight: 700
              }}>
                Management Panel
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#A8A29E',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#FFFFFF' : '#A8A29E',
                  backgroundColor: active ? 'var(--primary)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={active ? '#FFFFFF' : '#A8A29E'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.6875rem',
                    backgroundColor: active ? '#7C2D12' : '#B45309',
                    color: '#FFFFFF',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#D6CEBE',
              fontSize: '0.8125rem',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          >
            <span>View Live Customer Site</span>
            <ExternalLink size={14} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#F87171',
              backgroundColor: 'transparent',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main-content">
        {/* Top Header */}
        <header style={{
          height: '70px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px',
                cursor: 'pointer'
              }}
              className="admin-mobile-toggle"
            >
              <Menu size={20} />
            </button>
            <style>{`
              @media (max-width: 900px) {
                .admin-mobile-toggle { display: block !important; }
              }
            `}</style>
            
            {/* Live Kitchen Status Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Kitchen Status:</span>
              <button
                onClick={() => setIsStoreOpen(!isStoreOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: isStoreOpen ? '#DCFCE7' : '#FEE2E2',
                  color: isStoreOpen ? '#15803D' : '#B91C1C',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isStoreOpen ? '#16A34A' : '#DC2626' }} />
                <span>{isStoreOpen ? 'Accepting Orders' : 'Store Paused'}</span>
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color="var(--text-body)" style={{ cursor: 'pointer' }} />
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)'
              }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem'
              }}>
                AD
              </div>
              <div style={{ display: 'none' }} className="admin-user-info">
                <style>{`
                  @media (min-width: 640px) {
                    .admin-user-info { display: block !important; }
                  }
                `}</style>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, display: 'block', lineHeight: 1 }}>General Manager</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gurugram Flagship</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
