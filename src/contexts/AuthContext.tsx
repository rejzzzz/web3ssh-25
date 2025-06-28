'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  uid: string;
  registeredAt: Date;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, uid: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('web3ssh_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('web3ssh_user');
      }
    }
  }, []);

  const login = async (email: string, uid: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify-participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uid }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        const userData = {
          ...data.user,
          registeredAt: new Date(data.user.registeredAt),
        };
        setUser(userData);
        localStorage.setItem('web3ssh_user', JSON.stringify(userData));
        return true;
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('web3ssh_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
