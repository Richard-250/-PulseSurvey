import { RequestHandler } from "express";
import { createPayout, getBalance, settings } from "../db";
import { requireAuth } from "./auth";

export const getWallet: RequestHandler = (req: any, res) => {
  const userId: string = req.userId;
  const bal = getBalance(userId);
  res.json({ balance: bal.available, pending: bal.pending, transactions: bal.transactions, settings });
};

export const withdraw: RequestHandler = (req: any, res) => {
  const userId: string = req.userId;
  const { coins, mtn_mobile } = req.body ?? {};
  if (!coins || coins <= 0) return res.status(400).json({ error: "Invalid amount" });
  const bal = getBalance(userId);
  if (coins > bal.available) return res.status(400).json({ error: "Insufficient balance" });
  if (coins < settings.min_withdraw_coins) return res.status(400).json({ error: `Minimum withdrawal is ${settings.min_withdraw_coins} coins` });
  if (!mtn_mobile) return res.status(400).json({ error: "MTN mobile number required" });
  const pr = createPayout(userId, coins, mtn_mobile);
  res.json({ request: pr });
};

export const walletRoutes = (app: any) => {
  app.get("/api/wallet", requireAuth, getWallet);
  app.post("/api/wallet/withdraw", requireAuth, withdraw);
};
