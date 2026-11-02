import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Customer Pages (11 Screens)
import { HomePage } from './pages/customer/HomePage';
import { MenuPage } from './pages/customer/MenuPage';
import { FoodDetailPage } from './pages/customer/FoodDetailPage';
import { CartCheckoutPage } from './pages/customer/CartCheckoutPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { ProfileOrdersPage } from './pages/customer/ProfileOrdersPage';
import { WishlistPage } from './pages/customer/WishlistPage';
import { OffersPage } from './pages/customer/OffersPage';
import { AboutPage } from './pages/customer/AboutPage';
import { ContactPage } from './pages/customer/ContactPage';
import { AuthModalPage } from './pages/customer/AuthModalPage';

// Admin Pages (17 Screens)
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminOrderDetailsPage } from './pages/admin/AdminOrderDetailsPage';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminAddFoodPage } from './pages/admin/AdminAddFoodPage';
import { AdminEditFoodPage } from './pages/admin/AdminEditFoodPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              {/* Customer Website Routes */}
              <Route path="/" element={<CustomerLayout />}>
                <Route index element={<HomePage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="dish/:id" element={<FoodDetailPage />} />
                <Route path="checkout" element={<CartCheckoutPage />} />
                <Route path="order-tracking/:id" element={<OrderTrackingPage />} />
                <Route path="order-tracking" element={<OrderTrackingPage />} />
                <Route path="profile" element={<ProfileOrdersPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="offers" element={<OffersPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<AuthModalPage />} />
              </Route>

              {/* Admin Public Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Dashboard Protected Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="orders/:id" element={<AdminOrderDetailsPage />} />
                <Route path="menu" element={<AdminMenuPage />} />
                <Route path="menu/add" element={<AdminAddFoodPage />} />
                <Route path="menu/edit/:id" element={<AdminEditFoodPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="coupons" element={<AdminCouponsPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
