import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/customer/Navbar';
import { Footer } from '../components/customer/Footer';
import { CartDrawer } from '../components/customer/CartDrawer';

export const CustomerLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
};
