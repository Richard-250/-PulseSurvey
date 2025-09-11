import crypto from "crypto";

export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  password_hash: string; // salt:hash
  display_name: string;
  country?: string;
  mtn_mobile_number?: string | null;
  is_email_verified: boolean;
  created_at: number;
  updated_at: number;
}

export interface Session {
  id: UUID;
  user_id: UUID;
  created_at: number;
  expires_at: number; // ms epoch
}

export interface QuestionMeta {
  tags?: string[];
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface Question {
  id: UUID;
  text: string;
  explanation: string;
  metadata?: QuestionMeta;
  status: "active" | "paused" | "archived";
  created_at: number;
  created_by?: UUID;
}

export interface Answer {
  id: UUID;
  user_id: UUID;
  question_id: UUID;
  answer_payload: any;
  awarded_coin: number; // 1 per answer
  created_at: number;
  meta?: { explanationReadAt?: number; clientTs?: number };
}

export type WalletTxType =
  | "credit"
  | "debit"
  | "payout_request"
  | "payout_complete";

export interface WalletTransaction {
  id: UUID;
  user_id: UUID;
  type: WalletTxType;
  amount_coins: number; // positive integers
  amount_currency?: number | null;
  status: "pending" | "completed" | "failed";
  reference?: string | null;
  created_at: number;
}

export interface PayoutRequest {
  id: UUID;
  user_id: UUID;
  amount_coins: number;
  amount_currency?: number;
  mtn_mobile_number: string;
  provider_reference?: string;
  status: "pending" | "completed" | "failed";
  created_at: number;
}

export interface Settings {
  coin_to_currency: number; // coins per currency unit (e.g., 100 = 1 unit)
  min_withdraw_coins: number; // threshold
}

export interface UserState {
  lastServedQuestionId?: UUID;
  lastServedAt?: number;
  answersToday?: number;
  answersWindow?: { start: number; count: number };
  ipHistory?: { ip: string; ts: number }[];
}

const users = new Map<UUID, User>();
const usersByEmail = new Map<string, User>();
const sessions = new Map<UUID, Session>();
const questions = new Map<UUID, Question>();
const answers = new Map<UUID, Answer>();
const userAnswers = new Map<UUID, Answer[]>();
const walletTx = new Map<UUID, WalletTransaction[]>();
const payoutRequests = new Map<UUID, PayoutRequest[]>();
const userStates = new Map<UUID, UserState>();

export const settings: Settings = {
  coin_to_currency: 100, // 100 coins = 1 unit
  min_withdraw_coins: 1000,
};

export function uid(): UUID {
  return crypto.randomUUID();
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const check = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(check, "hex"));
}

export function createUser(params: {
  email: string;
  password: string;
  display_name: string;
  country?: string;
}): User {
  if (usersByEmail.has(params.email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  const now = Date.now();
  const user: User = {
    id: uid(),
    email: params.email.toLowerCase(),
    password_hash: hashPassword(params.password),
    display_name: params.display_name,
    country: params.country,
    mtn_mobile_number: null,
    is_email_verified: true,
    created_at: now,
    updated_at: now,
  };
  users.set(user.id, user);
  usersByEmail.set(user.email, user);
  walletTx.set(user.id, []);
  userStates.set(user.id, {});
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return usersByEmail.get(email.toLowerCase());
}

export function getUserById(id: UUID): User | undefined {
  return users.get(id);
}

export function updateUser(id: UUID, patch: Partial<User>): User {
  const u = users.get(id);
  if (!u) throw new Error("User not found");
  const updated = { ...u, ...patch, updated_at: Date.now() } as User;
  users.set(id, updated);
  if (updated.email && updated.email !== u.email) {
    usersByEmail.delete(u.email);
    usersByEmail.set(updated.email, updated);
  }
  return updated;
}

export function createSession(user_id: UUID, ttlMs: number): Session {
  const now = Date.now();
  const sess: Session = { id: uid(), user_id, created_at: now, expires_at: now + ttlMs };
  sessions.set(sess.id, sess);
  return sess;
}

export function getSession(id: UUID): Session | undefined {
  const s = sessions.get(id);
  if (!s) return undefined;
  if (s.expires_at < Date.now()) {
    sessions.delete(id);
    return undefined;
  }
  return s;
}

export function deleteSession(id: UUID) {
  sessions.delete(id);
}

export function seedQuestions() {
  if (questions.size > 0) return;
  const now = Date.now();
  const sample: Array<Omit<Question, "id">> = [
    {
      text: "How many minutes do you typically spend commuting each weekday?",
      explanation:
        "We ask this to help urban planners and mobility startups understand travel patterns and reduce congestion. Your answer guides public transport schedules and micro-mobility placement.",
      metadata: { tags: ["mobility", "lifestyle"], category: "daily" },
      status: "active",
      created_at: now,
    },
    {
      text: "Which grocery item have you noticed has increased most in price recently?",
      explanation:
        "Knowing price sensitivity by category helps retailers plan discounts and helps regulators monitor inflation. We never share personal data—only aggregated insights.",
      metadata: { tags: ["retail", "inflation"], category: "economy" },
      status: "active",
      created_at: now,
    },
    {
      text: "How reliable is your mobile network during peak evening hours?",
      explanation:
        "This informs telecom providers about coverage gaps and capacity issues, so they can improve service in high-demand neighborhoods.",
      metadata: { tags: ["telecom"], category: "utilities" },
      status: "active",
      created_at: now,
    },
    {
      text: "Do you prefer mobile money or cash for small purchases under 5,000?",
      explanation:
        "Fintech teams use this to improve checkout experiences and expand acceptance for small merchants. Your feedback shapes real-world payment experiences.",
      metadata: { tags: ["fintech"], category: "payments" },
      status: "active",
      created_at: now,
    },
    {
      text: "How many hours of uninterrupted electricity did you have yesterday?",
      explanation:
        "Energy planners and backup power providers use this to plan capacity and support reliability improvements in your area.",
      metadata: { tags: ["energy"], category: "utilities" },
      status: "active",
      created_at: now,
    },
  ];
  for (const q of sample) {
    const id = uid();
    questions.set(id, { id, ...q });
  }
}

export function getActiveQuestions(): Question[] {
  return [...questions.values()].filter((q) => q.status === "active");
}

export function recordAnswer(a: Omit<Answer, "id" | "created_at">): Answer {
  const ans: Answer = { id: uid(), created_at: Date.now(), ...a };
  answers.set(ans.id, ans);
  const list = userAnswers.get(ans.user_id) ?? [];
  list.push(ans);
  userAnswers.set(ans.user_id, list);
  return ans;
}

export function getBalance(user_id: UUID): { available: number; pending: number; transactions: WalletTransaction[] } {
  const txs = walletTx.get(user_id) ?? [];
  let available = 0;
  let pending = 0;
  for (const t of txs) {
    if (t.type === "credit" && t.status === "completed") available += t.amount_coins;
    if ((t.type === "debit" || t.type === "payout_request") && t.status !== "failed") available -= t.amount_coins;
    if (t.status === "pending" && (t.type === "payout_request" || t.type === "debit")) pending += t.amount_coins;
  }
  return { available, pending, transactions: [...txs].sort((a, b) => b.created_at - a.created_at) };
}

export function creditCoins(user_id: UUID, coins: number, ref?: string) {
  const tx: WalletTransaction = {
    id: uid(),
    user_id,
    type: "credit",
    amount_coins: coins,
    status: "completed",
    reference: ref,
    created_at: Date.now(),
  };
  const list = walletTx.get(user_id) ?? [];
  list.push(tx);
  walletTx.set(user_id, list);
  return tx;
}

export function createPayout(user_id: UUID, coins: number, mtn: string): PayoutRequest {
  const pr: PayoutRequest = {
    id: uid(),
    user_id,
    amount_coins: coins,
    mtn_mobile_number: mtn,
    status: "pending",
    created_at: Date.now(),
  };
  const prList = payoutRequests.get(user_id) ?? [];
  prList.push(pr);
  payoutRequests.set(user_id, prList);
  // create a pending debit
  const tx: WalletTransaction = {
    id: uid(),
    user_id,
    type: "payout_request",
    amount_coins: coins,
    status: "pending",
    reference: pr.id,
    created_at: Date.now(),
  };
  const list = walletTx.get(user_id) ?? [];
  list.push(tx);
  walletTx.set(user_id, list);
  return pr;
}

export function markPayoutCompleted(user_id: UUID, prId: UUID) {
  const prs = payoutRequests.get(user_id) ?? [];
  const pr = prs.find((p) => p.id === prId);
  if (pr) pr.status = "completed";
  const txs = walletTx.get(user_id) ?? [];
  const tx = txs.find((t) => t.reference === prId);
  if (tx) tx.status = "completed";
}

export function getUserState(user_id: UUID): UserState {
  const st = userStates.get(user_id) ?? {};
  userStates.set(user_id, st);
  return st;
}

export function setUserState(user_id: UUID, patch: Partial<UserState>) {
  const st = getUserState(user_id);
  Object.assign(st, patch);
  userStates.set(user_id, st);
}
