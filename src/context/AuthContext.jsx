import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devtask_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const userData = {
      name: email.split('@')[0] || 'Medeu Seidali',
      email,
      role: 'Admin',
      token: `jwt-token-${Date.now()}`
    };
    setUser(userData);
    localStorage.setItem('devtask_auth_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devtask_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
