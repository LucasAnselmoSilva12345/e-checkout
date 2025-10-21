'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, getCurrentUser, login, signup, logout } from './auth';

type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  signupUser: (email: string, password: string) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = getCurrentUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  function loginUser(email: string, password: string) {
    const user = login(email, password);
    if (user) {
      setUser(user);
    }
  }

  function signupUser(email: string, password: string) {
    const user = signup(email, password);
    setUser(user);
  }

  function logoutUser() {
    logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
