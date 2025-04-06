'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthError, signIn, signOut, signUp, getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current route is one of the auth routes
  const isAuthRoute = pathname === '/login' || pathname === '/signup' || pathname === '/reset-password';
  
  // These routes require auth but have special handling
  const isSpecialAuthRoute = pathname === '/profile' || pathname === '/update-password';

  // Load the user on first render and set up auth state listener
  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      try {
        const { user: currentUser, error: userError } = await getCurrentUser();
        setUser(currentUser);
        setError(userError);

        // If the user is logged in and on an auth route, redirect to dashboard
        if (currentUser && isAuthRoute) {
          router.push('/');
        }
        // If the user is not logged in and on a protected route (not auth or special route), redirect to login
        else if (!currentUser && !isAuthRoute && !isSpecialAuthRoute) {
          router.push('/login');
        }
      } catch (err: any) {
        console.error('Auth provider error:', err);
        setError({ message: err.message || 'An unexpected error occurred' });
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (session) {
        setUser(session.user as User);
        if (isAuthRoute) {
          router.push('/');
        }
      } else {
        setUser(null);
        if (!isAuthRoute && !isSpecialAuthRoute) {
          router.push('/login');
        }
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [router, isAuthRoute, pathname]);

  // Sign-in handler
  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        setUser(result.user);
      }
      return result;
    } catch (err: any) {
      const error = { message: err.message || 'An unexpected error occurred during sign in' };
      setError(error);
      return { user: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-up handler
  const handleSignUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signUp(email, password, fullName);
      if (result.error) {
        setError(result.error);
      } else {
        setUser(result.user);
      }
      return result;
    } catch (err: any) {
      const error = { message: err.message || 'An unexpected error occurred during sign up' };
      setError(error);
      return { user: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-out handler
  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signOut();
      if (result.error) {
        setError(result.error);
      } else {
        setUser(null);
        router.push('/login');
      }
      return result;
    } catch (err: any) {
      const error = { message: err.message || 'An unexpected error occurred during sign out' };
      setError(error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 