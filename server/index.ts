import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { login, logout, me, signup } from "./routes/auth";
import { surveysRoutes } from "./routes/surveys";
import { usersRoutes } from "./routes/users";
import { walletRoutes } from "./routes/wallet";
import { getSession, seedQuestions } from "./db";

export function createServer() {
  const app = express();

  // seed initial data
  seedQuestions();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Optional auth attach (for non-protected routes to know userId)
  app.use((req: any, _res, next) => {
    const cookie = req.headers?.cookie as string | undefined;
    if (cookie) {
      const sid = cookie
        .split(/;\s*/)
        .map((p: string) => p.split("="))
        .find((kv: string[]) => kv[0] === "sid")?.[1];
      if (sid) {
        const sess = getSession(decodeURIComponent(sid));
        if (sess) req.userId = sess.user_id;
      }
    }
    next();
  });

  // Health/demo
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", me);
  app.post("/api/auth/logout", logout);

  // Surveys
  surveysRoutes(app);
  // Users
  usersRoutes(app);
  // Wallet
  walletRoutes(app);

  return app;
}
