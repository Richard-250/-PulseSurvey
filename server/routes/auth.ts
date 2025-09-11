import { RequestHandler } from "express";
import {
  createSession,
  createUser,
  deleteSession,
  getSession,
  getUserByEmail,
  getUserById,
  settings,
  verifyPassword,
} from "../db";

const NINETY_DAYS_MS = 1000 * 60 * 60 * 24 * 90;

function getCookie(req: any, name: string): string | undefined {
  const cookie = req.headers?.cookie as string | undefined;
  if (!cookie) return undefined;
  const parts = cookie.split(/;\s*/);
  for (const p of parts) {
    const [k, v] = p.split("=");
    if (k === name) return decodeURIComponent(v);
  }
  return undefined;
}

function setCookie(res: any, name: string, value: string, opts: { maxAgeMs: number }) {
  const attrs = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${Math.floor(opts.maxAgeMs / 1000)}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Secure`,
  ];
  res.setHeader("Set-Cookie", attrs.join("; "));
}

function clearCookie(res: any, name: string) {
  const attrs = [`${name}=`, `Max-Age=0`, `Path=/`, `HttpOnly`, `SameSite=Lax`, `Secure`];
  res.setHeader("Set-Cookie", attrs.join("; "));
}

export const signup: RequestHandler = (req, res) => {
  const { email, password, display_name, country } = req.body ?? {};
  if (!email || !password || !display_name) return res.status(400).json({ error: "Missing fields" });
  try {
    const user = createUser({ email, password, display_name, country });
    const sess = createSession(user.id, NINETY_DAYS_MS);
    setCookie(res, "sid", sess.id, { maxAgeMs: NINETY_DAYS_MS });
    res.json({ user: { id: user.id, email: user.email, display_name: user.display_name }, settings });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login: RequestHandler = (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  const user = getUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (!verifyPassword(password, user.password_hash)) return res.status(401).json({ error: "Invalid credentials" });
  const sess = createSession(user.id, NINETY_DAYS_MS);
  setCookie(res, "sid", sess.id, { maxAgeMs: NINETY_DAYS_MS });
  res.json({ user: { id: user.id, email: user.email, display_name: user.display_name }, settings });
};

export const me: RequestHandler = (req, res) => {
  const sid = getCookie(req, "sid");
  if (!sid) return res.status(200).json({ user: null });
  const sess = getSession(sid);
  if (!sess) return res.status(200).json({ user: null });
  const user = getUserById(sess.user_id);
  if (!user) return res.status(200).json({ user: null });
  res.json({
    user: {
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      country: user.country,
      mtn_mobile_number: user.mtn_mobile_number,
      is_email_verified: user.is_email_verified,
    },
  });
};

export const logout: RequestHandler = (req, res) => {
  const sid = getCookie(req, "sid");
  if (sid) deleteSession(sid);
  clearCookie(res, "sid");
  res.json({ ok: true });
};

export function requireAuth(req: any, res: any, next: any) {
  const sid = getCookie(req, "sid");
  if (!sid) return res.status(401).json({ error: "Unauthorized" });
  const sess = getSession(sid);
  if (!sess) return res.status(401).json({ error: "Session expired" });
  (req as any).userId = sess.user_id;
  next();
}
