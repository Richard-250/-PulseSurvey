import { createContext, useContext, useMemo, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  password?: string; // stored in localStorage for demo (do NOT use in prod)
  display_name: string;
  country?: string;
  mtn_mobile_number?: string | null;
  is_email_verified?: boolean;
  balance?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (input: { email: string; password: string; display_name: string; country?: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LS_USERS_KEY = "ps_users"; // map email->user
const LS_SESSION_KEY = "ps_session"; // current user email

function readUsers(): Record<string, User> {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeUsers(users: Record<string, User>) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function readSession(): string | null {
  return localStorage.getItem(LS_SESSION_KEY);
}

function writeSession(email: string | null) {
  if (email) localStorage.setItem(LS_SESSION_KEY, email);
  else localStorage.removeItem(LS_SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = readSession();
    if (email) {
      const users = readUsers();
      const u = users[email.toLowerCase()];
      if (u) setUser(u);
    }
    setLoading(false);
  }, []);

  function refetch() {
    const email = readSession();
    if (email) {
      const users = readUsers();
      const u = users[email.toLowerCase()];
      setUser(u ?? null);
    } else setUser(null);
  }

  async function signup(input: { email: string; password: string; display_name: string; country?: string }) {
    const users = readUsers();
    const email = input.email.toLowerCase();
    if (users[email]) throw new Error("Email already registered");
    const newUser: User = {
      id: cryptoRandomId(),
      email,
      password: input.password,
      display_name: input.display_name,
      country: input.country,
      mtn_mobile_number: null,
      is_email_verified: true,
      balance: 0,
    };
    users[email] = newUser;
    writeUsers(users);
  }

  async function login(input: { email: string; password: string }) {
    const users = readUsers();
    const email = input.email.toLowerCase();
    const u = users[email];
    if (!u) throw new Error("Invalid credentials");
    if (u.password !== input.password) throw new Error("Invalid credentials");
    writeSession(email);
    setUser(u);
  }

  async function logout() {
    writeSession(null);
    setUser(null);
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

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10);
}
