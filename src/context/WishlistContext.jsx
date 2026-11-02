import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dumco_wishlist');
      return saved ? JSON.parse(saved) : ['food-1', 'food-4', 'food-7'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dumco_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (foodId) => {
    setWishlistIds(prev => 
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  };

  const isWishlisted = (foodId) => wishlistIds.includes(foodId);

  return (
    <WishlistContext.Provider value={{
      wishlistIds,
      toggleWishlist,
      isWishlisted
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
