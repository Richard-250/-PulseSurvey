import { createContext, useContext, useMemo, useState, useEffect } from "react";

type User = {
  id: string;
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
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://pulse-survey-backend-1.onrender.com/api/auth";

// Token management utilities
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

const setStoredUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

// API request helper with token
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getStoredToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    const storedToken = getStoredToken();
    
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    await checkAuthStatus();
  }

  async function checkAuthStatus() {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/me`);

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setStoredUser(userData);
      } else {
        // Token is invalid, clear it
        handleAuthError();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      handleAuthError();
    } finally {
      setLoading(false);
    }
  }

  function handleAuthError() {
    setUser(null);
    setToken(null);
    removeStoredToken();
  }

  async function refetch() {
    await checkAuthStatus();
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          display_name: input.display_name,
          country: input.country || '',
          mtn_mobile_number: input.mtn_mobile_number || ''
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token and user data
      setStoredToken(data.token);
      setStoredUser(data.user);
      setToken(data.token);
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

      // Store token and user data
      setStoredToken(data.token);
      setStoredUser(data.user);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      // Call logout endpoint (optional, mainly for server-side cleanup)
      await makeAuthenticatedRequest(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request error:', error);
      // Continue with local cleanup even if server request fails
    } finally {
      // Always clear local state
      setUser(null);
      setToken(null);
      removeStoredToken();
    }
  }

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, refetch, token }),
    [user, loading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Export helper function for making authenticated requests
export { makeAuthenticatedRequest };