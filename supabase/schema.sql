-- ==========================================================================
-- Dum & Co. — Complete PostgreSQL Database Schema & Seed Data for Supabase
-- ==========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Patrons & Administrators)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'manager')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    item_count INT DEFAULT 0,
    sort_order INT DEFAULT 1,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused'))
);

-- 3. Food Items Catalog Table
CREATE TABLE IF NOT EXISTS public.food_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
    image_url TEXT,
    dietary_type TEXT DEFAULT 'veg' CHECK (dietary_type IN ('veg', 'non-veg')),
    spice_level INT DEFAULT 1 CHECK (spice_level BETWEEN 0 AND 3),
    prep_time TEXT DEFAULT '25 mins',
    rating NUMERIC(2, 1) DEFAULT 4.9,
    review_count INT DEFAULT 120,
    is_bestseller BOOLEAN DEFAULT false,
    is_chef_special BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    ingredients TEXT[],
    portions JSONB,
    accompaniments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Coupons & Promotional Vouchers
CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_percent INT,
    discount_flat NUMERIC(10, 2),
    max_discount NUMERIC(10, 2),
    min_order NUMERIC(10, 2) DEFAULT 0,
    valid_until DATE,
    description TEXT,
    terms TEXT,
    usage_count INT DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired'))
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0,
    tax NUMERIC(10, 2) NOT NULL,
    packaging_fee NUMERIC(10, 2) DEFAULT 30,
    delivery_fee NUMERIC(10, 2) DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'Received' CHECK (status IN ('Received', 'In Kitchen', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled')),
    payment_method TEXT DEFAULT 'Online UPI',
    payment_status TEXT DEFAULT 'Paid' CHECK (payment_status IN ('Pending', 'Paid', 'Refunded')),
    cooking_notes TEXT,
    rider_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    food_item_id TEXT REFERENCES public.food_items(id) ON DELETE SET NULL,
    food_name TEXT NOT NULL,
    portion TEXT,
    quantity INT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    accompaniments TEXT[]
);

-- 7. Wishlists Table
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    food_item_id TEXT REFERENCES public.food_items(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, food_item_id)
);

-- 8. Restaurant Settings Table
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
    id INT PRIMARY KEY DEFAULT 1,
    name TEXT NOT NULL,
    tagline TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    address TEXT,
    timings TEXT,
    delivery_radius_km INT DEFAULT 12,
    min_order NUMERIC(10, 2) DEFAULT 250,
    tax_rate NUMERIC(4, 2) DEFAULT 5.0,
    packaging_fee NUMERIC(10, 2) DEFAULT 30.0,
    delivery_fee NUMERIC(10, 2) DEFAULT 45.0,
    free_delivery_threshold NUMERIC(10, 2) DEFAULT 500.0,
    is_open BOOLEAN DEFAULT true
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Allow public read of food items & categories
CREATE POLICY "Public Read Food Items" ON public.food_items FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.restaurant_settings FOR SELECT USING (true);

-- ==========================================
-- SEED DATA
-- ==========================================

INSERT INTO public.restaurant_settings (id, name, tagline, phone, whatsapp, email, address, timings, delivery_radius_km, min_order, tax_rate, packaging_fee, delivery_fee, free_delivery_threshold, is_open)
VALUES (1, 'Dum & Co.', 'Royal Dum Cooking & Artisanal Indian Dining', '+91 98765 43210', '+919876543210', 'concierge@dumandco.com', '74 Heritage Enclave, Golf Course Road, Sector 54, Gurugram, Haryana 122002', '12:00 PM – 11:30 PM (Daily)', 12, 250, 5, 30, 45, 500, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.categories (id, name, description, image_url, item_count, sort_order)
VALUES
('cat-biryani', 'Dum Biryanis', 'Slow-cooked in clay handis sealed with dough over low charcoal flame', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', 6, 1),
('cat-starters', 'Clay Oven Starters', 'Tandoor charred kebabs, delicate tikkas, and melt-in-mouth delicacies', 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', 6, 2),
('cat-curries', 'Royal Gravies', 'Simmered for 8+ hours with whole crushed heritage spices and saffron', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80', 5, 3),
('cat-breads', 'Artisanal Breads', 'Khamiri roti, warqi parathas, and zafrani sheermaal fresh from the tandoor', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80', 4, 4),
('cat-desserts', 'Royal Mithai', 'Centuries-old sweet delicacies crafted with pistachios, chashni, and gold vark', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', 4, 5),
('cat-beverages', 'Crafted Refreshers', 'Botanical sherbets, smoked spices, and cardamom-infused coolers', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', 5, 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.coupons (id, code, discount_percent, max_discount, min_order, valid_until, description, terms, usage_count, status)
VALUES
('coup-1', 'ROYALDUM20', 20, 200, 499, '2026-12-31', '20% off up to ₹200 on all Handi Dum Biryanis & Gravies', 'Valid once per user. Minimum cart value ₹499.', 1420, 'active'),
('coup-2', 'FIRSTFEAST', 25, 250, 399, '2026-12-31', 'Welcome feast! 25% off up to ₹250 on your inaugural order', 'Valid on first-time orders only.', 890, 'active'),
('coup-3', 'ROYALFLAT100', NULL, NULL, 699, '2026-11-30', 'Flat ₹100 instant cash discount on orders above ₹699', 'Applicable on all dishes.', 2150, 'active')
ON CONFLICT (id) DO NOTHING;
