import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/supabase';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dumco_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'food-1-regular',
          foodId: 'food-1',
          name: 'Awadhi Gosht Dum Biryani',
          portion: 'Regular Handi (Serves 1-2)',
          price: 645,
          quantity: 1,
          dietary: 'non-veg',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
          spiceLevel: 2,
          accompaniments: ['Burani Garlic Raita']
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dumco_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (foodItem, selectedPortion, selectedAccompaniments = [], quantity = 1) => {
    const portionName = selectedPortion?.name || foodItem.portions?.[0]?.name || 'Standard';
    const unitPrice = selectedPortion?.price || foodItem.price;
    const cartItemId = `${foodItem.id}-${portionName.replace(/\s+/g, '-').toLowerCase()}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            foodId: foodItem.id,
            name: foodItem.name,
            portion: portionName,
            price: unitPrice,
            quantity,
            dietary: foodItem.dietary,
            image: foodItem.image,
            spiceLevel: foodItem.spiceLevel,
            accompaniments: selectedAccompaniments
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setItems(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
    }
  };

  const removeFromCart = (cartItemId) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.05); // 5% GST
  const packagingFee = subtotal > 0 ? 30 : 0;
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 500 ? 0 : 45);
  const grandTotal = Math.max(0, taxableAmount + tax + packagingFee + deliveryFee);

  const applyCouponCode = async (code) => {
    setCouponError('');
    const res = await api.validateCoupon(code, subtotal);
    if (res.valid) {
      setAppliedCoupon({
        code: res.coupon.code,
        discount: res.discount,
        description: res.coupon.description
      });
      return { success: true, message: res.message };
    } else {
      setCouponError(res.message);
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      discount,
      tax,
      packagingFee,
      deliveryFee,
      grandTotal,
      appliedCoupon,
      couponError,
      applyCouponCode,
      removeCoupon,
      isCartOpen,
      setIsCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
