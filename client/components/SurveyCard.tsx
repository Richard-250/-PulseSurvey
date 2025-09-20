// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/useAuth";
// import { useWallet } from "@/hooks/useWallet";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// export default function SurveyCard() {
//   const { user, refetch: refetchAuth } = useAuth();
//   const { refetch: refetchWallet } = useWallet(Boolean(user));
//   const [loading, setLoading] = useState(true);
//   const [question, setQuestion] = useState<{ id: string; text: string; explanation: string } | null>(null);
//   const [canConfirm, setCanConfirm] = useState(false);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const [explanationReadAt, setExplanationReadAt] = useState<number | null>(null);

//   useEffect(() => {
//     void loadNext();
//   }, []);

//   async function loadNext() {
//     setLoading(true);
//     setCanConfirm(false);
//     setExplanationReadAt(null);
//     const res = await fetch("/api/surveys/next");
//     const data = await res.json();
//     setQuestion(data.question);
//     setLoading(false);
//     setTimeout(setupObserver, 0);
//   }

//   function setupObserver() {
//     if (!bottomRef.current) return;
//     const el = bottomRef.current;
//     const io = new IntersectionObserver(
//       (e) => {
//         if (e[0].isIntersecting) {
//           setCanConfirm(true);
//           setExplanationReadAt(Date.now());
//         }
//       },
//       { root: scrollRef.current ?? undefined, threshold: 1 },
//     );
//     io.observe(el);
//   }

//   async function confirm() {
//     if (!question) return;
//     if (!user) {
//       // redirect guests to signup to claim rewards
//       toast("Please create an account to claim rewards");
//       window.location.href = "/signup";
//       return;
//     }

//     // credit locally: 5 coins per request for authenticated users
//     const LS_USERS_KEY = "ps_users";
//     try {
//       const raw = localStorage.getItem(LS_USERS_KEY);
//       const users = raw ? JSON.parse(raw) : {};
//       const email = user.email.toLowerCase();
//       const u = users[email];
//       if (!u) throw new Error("User record not found");
//       const award = 5;
//       u.balance = (u.balance ?? 0) + award;
//       u.transactions = u.transactions ?? [];
//       u.transactions.push({ id: Math.random().toString(36).slice(2, 9), type: "credit", amount_coins: award, status: "completed", created_at: Date.now() });
//       users[email] = u;
//       localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
//       toast.success(`+${award} coins`, { description: `New balance: ${u.balance} coins` });
//       coinBurst();
//       // update auth state and wallet
//       try { await refetchAuth(); } catch {};
//       await refetchWallet();
//       await loadNext();
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to credit");
//     }
//   }

//   function coinBurst() {
//     const container = scrollRef.current;
//     if (!container) return;
//     for (let i = 0; i < 12; i++) {
//       const span = document.createElement("span");
//       span.textContent = "🪙";
//       span.style.position = "absolute";
//       span.style.left = Math.random() * 80 + 10 + "%";
//       span.style.bottom = "16px";
//       span.style.fontSize = Math.random() * 12 + 16 + "px";
//       span.style.transition = "transform 800ms ease-out, opacity 800ms ease-out";
//       container.appendChild(span);
//       requestAnimationFrame(() => {
//         span.style.transform = `translateY(-${60 + Math.random() * 60}px)`;
//         span.style.opacity = "0";
//       });
//       setTimeout(() => span.remove(), 900);
//     }
//   }

//   if (loading) return <div className="rounded-xl border p-6 bg-card shadow-sm">Loading…</div>;
//   if (!question) return <div className="rounded-xl border p-6 bg-card shadow-sm">No questions available</div>;

//   return (
//     <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
//       <div className="p-6">
//         <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Quick survey</div>
//         <h2 className="text-2xl font-semibold leading-snug">{question.text}</h2>
//       </div>
//       <div className="px-6">
//         <div className="text-sm font-medium mb-2">Why we ask this</div>
//         <div
//           ref={scrollRef}
//           className={cn(
//             "relative border rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground",
//             "max-h-[40vh] overflow-auto",
//           )}
//         >
//           <p className="leading-relaxed">{question.explanation}</p>
//           <div ref={bottomRef} className="h-1 w-full" />
//         </div>
//       </div>
//       <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-background/50 p-4 mt-4 border-t flex justify-end">
//         <Button
//           disabled={!canConfirm}
//           onClick={confirm}
//           className={cn(
//             "min-w-40 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90",
//             !canConfirm && "opacity-50",
//           )}
//         >
//           {canConfirm ? "Confirm & claim 5 coins" : "Scroll to the bottom to enable"}
//         </Button>
//       </div>
//     </div>
//   );
// }
