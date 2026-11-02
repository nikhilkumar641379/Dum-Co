import { createClient } from '@supabase/supabase-js';
import { 
  FOOD_ITEMS, 
  CATEGORIES, 
  COUPONS, 
  INITIAL_ORDERS, 
  CUSTOMERS, 
  RESTAURANT_INFO,
  ANALYTICS_DATA 
} from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isLiveSupabase = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

export const supabase = isLiveSupabase 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage helpers for zero-setup live persistence
const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(`dumco_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key, value) => {
  try {
    localStorage.setItem(`dumco_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
};

// Initialize Storage
if (!localStorage.getItem('dumco_food_items')) setLocal('food_items', FOOD_ITEMS);
if (!localStorage.getItem('dumco_categories')) setLocal('categories', CATEGORIES);
if (!localStorage.getItem('dumco_coupons')) setLocal('coupons', COUPONS);
if (!localStorage.getItem('dumco_orders')) setLocal('orders', INITIAL_ORDERS);
if (!localStorage.getItem('dumco_customers')) setLocal('customers', CUSTOMERS);
if (!localStorage.getItem('dumco_settings')) setLocal('settings', RESTAURANT_INFO);

// ==========================================
// Database Services (Dual-Mode: Supabase / Mock)
// ==========================================

export const api = {
  // Food Items
  async getFoodItems() {
    if (isLiveSupabase) {
      const { data, error } = await supabase.from('food_items').select('*');
      if (!error && data?.length) return data;
    }
    return getLocal('food_items', FOOD_ITEMS);
  },

  async getFoodById(id) {
    const items = await this.getFoodItems();
    return items.find(item => item.id === id) || null;
  },

  async saveFoodItem(food) {
    const items = await this.getFoodItems();
    let updated;
    if (food.id) {
      updated = items.map(item => item.id === food.id ? { ...item, ...food } : item);
    } else {
      const newItem = { ...food, id: `food-${Date.now()}`, rating: 5.0, reviewCount: 1 };
      updated = [newItem, ...items];
    }
    setLocal('food_items', updated);
    return updated;
  },

  async deleteFoodItem(id) {
    const items = await this.getFoodItems();
    const updated = items.filter(item => item.id !== id);
    setLocal('food_items', updated);
    return updated;
  },

  // Categories
  async getCategories() {
    if (isLiveSupabase) {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data?.length) return data;
    }
    return getLocal('categories', CATEGORIES);
  },

  async saveCategory(category) {
    const categories = await this.getCategories();
    let updated;
    if (category.id) {
      updated = categories.map(c => c.id === category.id ? { ...c, ...category } : c);
    } else {
      const newCat = { ...category, id: `cat-${Date.now()}`, itemCount: 0, status: 'active' };
      updated = [...categories, newCat];
    }
    setLocal('categories', updated);
    return updated;
  },

  async deleteCategory(id) {
    const categories = await this.getCategories();
    const updated = categories.filter(c => c.id !== id);
    setLocal('categories', updated);
    return updated;
  },

  // Orders
  async getOrders() {
    if (isLiveSupabase) {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data?.length) return data;
    }
    return getLocal('orders', INITIAL_ORDERS);
  },

  async getOrderById(id) {
    const orders = await this.getOrders();
    return orders.find(o => o.id === id) || null;
  },

  async createOrder(orderPayload) {
    const orderId = `DUM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      ...orderPayload,
      id: orderId,
      status: 'Received',
      paymentStatus: orderPayload.paymentStatus || (orderPayload.paymentMethod?.toLowerCase().includes('cod') ? 'Pending' : 'Paid'),
      createdAt: new Date().toISOString(),
      rider: {
        name: "Arjun Verma",
        phone: "+91 98722 11099",
        vehicle: "HR-26-DM-8821"
      }
    };

    if (isLiveSupabase) {
      try {
        const { error } = await supabase.from('orders').insert({
          id: newOrder.id,
          customer_name: newOrder.customer?.name || 'Customer',
          customer_email: newOrder.customer?.email || 'customer@example.com',
          customer_phone: newOrder.customer?.phone || '+91 98765 43210',
          delivery_address: newOrder.customer?.address || '',
          subtotal: Number(newOrder.subtotal) || 0,
          discount: Number(newOrder.discount) || 0,
          tax: Number(newOrder.tax) || 0,
          packaging_fee: Number(newOrder.packagingFee) || 30,
          delivery_fee: Number(newOrder.deliveryFee) || 0,
          total: Number(newOrder.total) || 0,
          status: 'Received',
          payment_method: newOrder.paymentMethod || 'Online UPI',
          payment_status: newOrder.paymentStatus,
          cooking_notes: newOrder.notes || '',
          rider_info: newOrder.rider
        });
        if (error) {
          console.warn('Supabase order insert notice (falling back to local):', error.message || error);
        }
      } catch (err) {
        console.warn('Supabase connection error on order creation:', err);
      }
    }

    const orders = await this.getOrders();
    const updated = [newOrder, ...orders.filter(o => o.id !== newOrder.id)];
    setLocal('orders', updated);
    return newOrder;
  },

  async updateOrderStatus(orderId, status) {
    const orders = await this.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setLocal('orders', updated);
    return updated.find(o => o.id === orderId);
  },

  // Coupons
  async getCoupons() {
    return getLocal('coupons', COUPONS);
  },

  async validateCoupon(code, cartSubtotal) {
    const coupons = await this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === 'active');
    
    if (!coupon) {
      return { valid: false, message: "Invalid coupon code." };
    }
    if (cartSubtotal < coupon.minOrder) {
      return { valid: false, message: `Minimum order of ₹${coupon.minOrder} required for this coupon.` };
    }

    let discount = 0;
    if (coupon.discountPercent) {
      discount = Math.min((cartSubtotal * coupon.discountPercent) / 100, coupon.maxDiscount || Infinity);
    } else if (coupon.discountFlat) {
      discount = coupon.discountFlat;
    }

    return {
      valid: true,
      coupon,
      discount: Math.round(discount),
      message: `Coupon ${coupon.code} applied! Saved ₹${Math.round(discount)}`
    };
  },

  async saveCoupon(coupon) {
    const coupons = await this.getCoupons();
    let updated;
    if (coupon.id) {
      updated = coupons.map(c => c.id === coupon.id ? { ...c, ...coupon } : c);
    } else {
      const newCoupon = { ...coupon, id: `coup-${Date.now()}`, usageCount: 0, status: 'active' };
      updated = [newCoupon, ...coupons];
    }
    setLocal('coupons', updated);
    return updated;
  },

  async deleteCoupon(id) {
    const coupons = await this.getCoupons();
    const updated = coupons.filter(c => c.id !== id);
    setLocal('coupons', updated);
    return updated;
  },

  // Customers
  async getCustomers() {
    return getLocal('customers', CUSTOMERS);
  },

  async getCustomerById(id) {
    const customers = await this.getCustomers();
    return customers.find(c => c.id === id) || null;
  },

  // Settings
  async getSettings() {
    return getLocal('settings', RESTAURANT_INFO);
  },

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    const updated = { ...current, ...newSettings };
    setLocal('settings', updated);
    return updated;
  },

  // Analytics
  async getAnalytics() {
    const orders = await this.getOrders();
    const todayTotal = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    return {
      ...ANALYTICS_DATA,
      summary: {
        ...ANALYTICS_DATA.summary,
        todayRevenue: todayTotal,
        todayOrders: orders.length
      }
    };
  }
};
