import { createContext, useContext, useMemo, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  display_name: string;
  country?: string;
  mtn_mobile_number?: string | null;
  is_email_verified?: boolean;
  balance?: number;
  last_withdrawal_date?: string;
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
  updateProfile: (input: {
    display_name?: string;
    country?: string;
    mtn_mobile_number?: string;
  }) => Promise<void>;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://pulse-survey-backend.onrender.com/api/auth";

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

const getStoredUser = (): User | null => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const setStoredUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

// API request helper with token and better error handling
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getStoredToken();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  // Handle specific error cases
  if (response.status === 401) {
    // Token is invalid or expired
    removeStoredToken();
    throw new Error('Authentication failed. Please log in again.');
  }

  return response;
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
    const storedUser = getStoredUser();
    
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    
    // Set stored user immediately for better UX, then verify with server
    if (storedUser) {
      setUser(storedUser);
    }

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
    setLoading(true);
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
          email: input.email.trim().toLowerCase(),
          password: input.password,
          display_name: input.display_name.trim(),
          country: input.country?.trim() || '',
          mtn_mobile_number: input.mtn_mobile_number?.trim() || ''
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes from backend
        if (data.code === 'USER_EXISTS') {
          throw new Error('An account with this email already exists');
        }
        if (data.code === 'MISSING_REQUIRED_FIELDS') {
          throw new Error('Please fill in all required fields');
        }
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
          email: input.email.trim().toLowerCase(),
          password: input.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes from backend
        if (data.code === 'INVALID_CREDENTIALS') {
          throw new Error('Invalid email or password');
        }
        if (data.code === 'MISSING_CREDENTIALS') {
          throw new Error('Please enter both email and password');
        }
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

  async function updateProfile(input: {
    display_name?: string;
    country?: string;
    mtn_mobile_number?: string;
  }) {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/update-profile`, {
        method: 'PUT',
        body: JSON.stringify({
          display_name: input.display_name?.trim(),
          country: input.country?.trim(),
          mtn_mobile_number: input.mtn_mobile_number?.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      // Update local state
      setUser(data.user);
      setStoredUser(data.user);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, refetch, updateProfile, token }),
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