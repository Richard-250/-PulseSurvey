import { RequestHandler } from "express";
import {
  Question,
  creditCoins,
  getActiveQuestions,
  getBalance,
  getUserState,
  recordAnswer,
  setUserState,
} from "../db";
import { requireAuth } from "./auth";

// Simple rate limiting per user: max 60 answers/hour
const MAX_ANSWERS_PER_HOUR = 60;

export const getNextQuestion: RequestHandler = (req: any, res) => {
  const userId: string | undefined = req.userId;
  const pool = getActiveQuestions();
  if (pool.length === 0) return res.status(200).json({ question: null });

  // naive rotation avoiding repeating last served
  const st = userId ? getUserState(userId) : {};
  let q: Question | undefined;
  for (const cand of pool) {
    if (cand.id !== st.lastServedQuestionId) {
      q = cand;
      break;
    }
  }
  if (!q) q = pool[0];

  if (userId) setUserState(userId, { lastServedQuestionId: q.id, lastServedAt: Date.now() });

  res.json({
    question: {
      id: q.id,
      text: q.text,
      explanation: q.explanation,
      metadata: q.metadata,
    },
  });
};

export const postAnswer: RequestHandler = (req: any, res) => {
  const userId: string = req.userId;
  const { questionId, answer, clientTs, explanationReadAt } = req.body ?? {};
  if (!questionId) return res.status(400).json({ error: "Missing questionId" });

  // basic anti-fraud: ensure they saw the question and time delta is human-like
  const st = getUserState(userId);
  if (st.lastServedQuestionId !== questionId) {
    return res.status(400).json({ error: "Question not served or expired" });
  }
  const now = Date.now();
  const servedAt = st.lastServedAt ?? now;
  const delta = now - servedAt;
  if (delta < 1500) {
    return res.status(429).json({ error: "Too fast. Please read the explanation before confirming." });
  }

  // rate limit answers/hour
  const windowStart = st.answersWindow?.start ?? 0;
  const windowCount = st.answersWindow?.count ?? 0;
  if (now - windowStart > 60 * 60 * 1000) {
    setUserState(userId, { answersWindow: { start: now, count: 0 } });
  } else if (windowCount >= MAX_ANSWERS_PER_HOUR) {
    return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
  }

  // record answer and credit 1 coin atomically (in-memory here)
  recordAnswer({
    user_id: userId,
    question_id: questionId,
    answer_payload: answer ?? null,
    awarded_coin: 1,
    meta: { clientTs, explanationReadAt },
  });
  creditCoins(userId, 1, `answer:${questionId}`);
  const aw = st.answersWindow ?? { start: now, count: 0 };
  aw.count += 1;
  setUserState(userId, { answersWindow: aw });

  const bal = getBalance(userId);
  res.json({ ok: true, balance: bal.available });
};

export const surveysRoutes = (app: any) => {
  app.get("/api/surveys/next", (req: any, res: any, next: any) => {
    // allow both authed and guest (guest won't rotate state)
    const sidUser = (req as any).userId;
    if (!sidUser) return getNextQuestion(req, res, next);
    return getNextQuestion(req, res, next);
  });
  app.post("/api/surveys/answer", requireAuth, postAnswer);
};
