
"use client";

import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useCallback } from 'react';
import type { AuthUser, Role } from '@/types';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  role: Role;
  logout: () => Promise<void>;
  loginWithDumpUser: (userToLogin: AuthUser) => void; // New function
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>('guest');
  const router = useRouter();

  useEffect(() => {
    // Simulate loading for initial context setup
    setLoading(true);
    // In a real app, you might check localStorage here for a persistent session
    // For this mock setup, we just set loading to false after a brief delay
    const timer = setTimeout(() => {
      setLoading(false);
      // Optionally, set a default dump user here if you want one to be logged in on load
      // For now, we start as guest unless loginWithDumpUser is called
    }, 100); // Simulate a small delay

    return () => clearTimeout(timer);
  }, []);

  const loginWithDumpUser = useCallback((userToLogin: AuthUser) => {
    setUser(userToLogin);
    setRole(userToLogin.role);
    setLoading(false);
  }, []);

  const logout = async () => {
    setLoading(true);
    // Simulate logout process
    const timer = setTimeout(() => {
      // Always reset local state for both Firebase and dump users
      setUser(null);
      setRole('guest');
      setLoading(false);
      router.push('/'); 
    }
    )
  }


  return (
    <AuthContext.Provider value={{ user, loading, role, logout, loginWithDumpUser }}>
      {children}
    </AuthContext.Provider>
  );
};
