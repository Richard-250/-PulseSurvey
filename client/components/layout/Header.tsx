import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { balance, isLoading, refetch } = useWallet(Boolean(user));
  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const [open, setOpen] = useState(false);

  function initials(s: string) {
    if (!s) return "U";
    const parts = s.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1][0] ?? "")).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12">
        <div className="h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow" />
            <span className="font-extrabold tracking-tight text-xl">PulseSurvey</span>
          </Link>

          <nav className="ml-8 hidden md:flex items-center gap-6 text-sm">
            <Nav to="/about">About Us</Nav>
            <Nav to="/about-surveys">About Surveys</Nav>
            <Nav to="/faq">FAQ</Nav>
            <Nav to="/survey">Survey</Nav>
          </nav>

          {/* mobile menu button */}
          <div className="ml-4 md:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-muted/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-muted/30"
                >
                  <div className="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-semibold">{initials(user.display_name || user.email)}</div>
                  <div className="hidden sm:flex flex-col text-xs leading-tight text-right">
                    <span className="font-medium">{user.display_name || user.email}</span>
                    <span className="text-muted-foreground">{isLoading ? "…" : `${balance ?? 0} coins`} • {(Math.round(((balance ?? 0) * 2) * 100) / 100) ?? 0} RWF</span>
                  </div>
                </button>
                <Button variant="outline" className="text-sm hidden sm:inline-flex" onClick={() => navigate("/wallet")}>Wallet</Button>
                <Button variant="ghost" className="text-sm hidden sm:inline-flex" onClick={() => logout()}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90">Sign up</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 w-[85%] max-w-xs bg-background h-full shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-amber-500" /> <div className="font-bold">PulseSurvey</div></div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">✕</button>
            </div>
            <nav className="flex flex-col gap-3">
              <Nav to="/about">About Us</Nav>
              <Nav to="/about-surveys">About Surveys</Nav>
              <Nav to="/faq">FAQ</Nav>
              <Nav to="/survey">Survey</Nav>
              {user ? (
                <>
                  <button onClick={() => { setOpen(false); navigate('/dashboard');}} className="text-left">Dashboard</button>
                  <button onClick={() => { setOpen(false); navigate('/wallet');}} className="text-left">Wallet</button>
                  <button onClick={() => { setOpen(false); logout();}} className="text-left">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setOpen(false); navigate('/login'); }} className="text-left">Login</button>
                  <button onClick={() => { setOpen(false); navigate('/signup'); }} className="text-left">Sign up</button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Nav({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "transition-colors hover:text-foreground/80 text-foreground/70",
          isActive && "text-foreground",
        )
      }
    >
      {children}
    </NavLink>
  );
}
