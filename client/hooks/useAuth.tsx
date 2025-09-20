import { createContext, useContext, useMemo, useState, useEffect } from "react";

type User = {
  email: string;
  display_name: string;
  country?: string;
  mtn_mobile_number?: string | null;
  is_email_verified?: boolean;
  balance?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (input: { 
    email: string; 
    password: string; 
    display_name: string; 
    country?: string;
    mtn_mobile_number?: string;
  }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "http://localhost:3000/api/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        credentials: 'include', // Include session cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function refetch() {
    checkAuthStatus();
  }

  async function signup(input: { 
    email: string; 
    password: string; 
    display_name: string; 
    country?: string;
    mtn_mobile_number?: string;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          display_name: input.display_name,
          country: input.country || '',
          mtn_mobile_number: input.mtn_mobile_number || '0000000000'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async function login(input: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
      } else {
        // Even if logout fails on server, clear local user state
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user state even if request fails
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, refetch }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}