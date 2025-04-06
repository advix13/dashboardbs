import { supabase } from './supabase';

// Types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
  created_at: string;
}

export interface AuthError {
  message: string;
}

// Sign up a new user
export const signUp = async (email: string, password: string, fullName: string): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error.message);
      return { user: null, error };
    }

    return { user: data.user as User, error: null };
  } catch (err: any) {
    console.error('Unexpected sign up error:', err);
    return { user: null, error: { message: err.message || 'An unexpected error occurred during sign up' } };
  }
};

// Sign in an existing user
export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      return { user: null, error };
    }

    return { user: data.user as User, error: null };
  } catch (err: any) {
    console.error('Unexpected sign in error:', err);
    return { user: null, error: { message: err.message || 'An unexpected error occurred during sign in' } };
  }
};

// Sign out the current user
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error.message);
      return { error };
    }

    return { error: null };
  } catch (err: any) {
    console.error('Unexpected sign out error:', err);
    return { error: { message: err.message || 'An unexpected error occurred during sign out' } };
  }
};

// Get the current user
export const getCurrentUser = async (): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error.message);
      return { user: null, error };
    }

    if (!data.session) {
      return { user: null, error: null };
    }

    return { user: data.session.user as User, error: null };
  } catch (err: any) {
    console.error('Unexpected get current user error:', err);
    return { user: null, error: { message: err.message || 'An unexpected error occurred while getting the current user' } };
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Reset password error:', error.message);
      return { error };
    }

    return { error: null };
  } catch (err: any) {
    console.error('Unexpected reset password error:', err);
    return { error: { message: err.message || 'An unexpected error occurred during password reset' } };
  }
}; 