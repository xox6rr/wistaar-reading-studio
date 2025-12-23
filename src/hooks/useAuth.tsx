import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// ============================================
// FRONTEND-ONLY AUTH HOOK
// Replace this with your backend API calls
// ============================================

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'wistaar_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  // ============================================
  // TODO: Replace with your backend API call
  // Example: POST /api/auth/signup
  // ============================================
  const signUp = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock successful signup
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        created_at: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // ============================================
  // TODO: Replace with your backend API call
  // Example: POST /api/auth/signin
  // ============================================
  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock successful signin
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        created_at: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // ============================================
  // TODO: Replace with your backend API call
  // Example: POST /api/auth/signout
  // ============================================
  const signOut = async (): Promise<void> => {
    // TODO: Call your logout endpoint if needed
    // await fetch('/api/auth/signout', { method: 'POST' });

    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
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
