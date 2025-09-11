import { RequestHandler } from "express";
import { getBalance, getUserById, updateUser } from "../db";
import { requireAuth } from "./auth";

export const meProfile: RequestHandler = (req: any, res) => {
  const userId: string = req.userId;
  const user = getUserById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  const bal = getBalance(userId);
  res.json({
    user: {
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      country: user.country,
      mtn_mobile_number: user.mtn_mobile_number,
      is_email_verified: user.is_email_verified,
      balance: bal.available,
      pending: bal.pending,
    },
  });
};

export const updateMe: RequestHandler = (req: any, res) => {
  const userId: string = req.userId;
  const { display_name, country, mtn_mobile_number } = req.body ?? {};
  const user = updateUser(userId, { display_name, country, mtn_mobile_number });
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

export const usersRoutes = (app: any) => {
  app.get("/api/users/me", requireAuth, meProfile);
  app.put("/api/users/me", requireAuth, updateMe);
};
