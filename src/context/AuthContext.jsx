import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dumco_auth_user');
      return saved ? JSON.parse(saved) : {
        id: 'cust-demo',
        name: 'Aaditya Singhania',
        email: 'aaditya.singhania@gmail.com',
        phone: '+91 98201 12345',
        role: 'customer',
        address: 'Villa 14, Magnolias, Golf Course Road, Gurugram'
      };
    } catch {
      return null;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('dumco_admin_auth') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dumco_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dumco_auth_user');
    }
  }, [user]);

  const loginCustomer = (email, name = 'Patron') => {
    const newUser = {
      id: `cust-${Date.now()}`,
      email,
      name,
      phone: '+91 98765 43210',
      role: 'customer',
      address: 'DLF Phase 5, Gurugram'
    };
    setUser(newUser);
    return newUser;
  };

  const loginAdmin = (username, password) => {
    // Default admin credential verification
    if ((username === 'admin@dumandco.com' || username === 'admin') && (password === 'dumco2026' || password === 'admin123')) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('dumco_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid admin credentials. (Hint: admin@dumandco.com / dumco2026)' };
  };

  const logoutCustomer = () => {
    setUser(null);
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('dumco_admin_auth');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loginCustomer,
      logoutCustomer,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
