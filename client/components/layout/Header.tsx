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
                  <div className="flex flex-col text-xs leading-tight text-right">
                    {/* <span className="font-medium">{user.display_name || user.email}</span> */}
               <span className="text-muted-foreground">
                   {isLoading ? "…" : `${balance ?? 0} coins`} • {(Math.round(((balance ?? 0) * 3 / 5) * 100) / 100) ?? 0} RWF
                </span>
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
        <div className="md:hidden fixed inset-0 z-50" onClick={() => setOpen(false)}>
          {/* Background blur overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Menu panel */}
          <div className="absolute right-0 top-0 w-[85%] max-w-xs bg-background border-l shadow-2xl h-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow" />
                <div className="font-bold text-foreground">PulseSurvey</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 hover:bg-muted/30 rounded-md transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col h-full">
              {/* User balance section */}
              {user && (
                <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                        Current Balance
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold font-mono text-foreground">
                          {isLoading ? "…" : balance ?? 0}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-amber-600 text-sm font-bold uppercase">coins</span>
                          <span className="text-xs text-muted-foreground">
                            ≈ {(Math.round(((balance ?? 0) * 2) * 100) / 100)} RWF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation */}
              <div className="flex-1 p-4">
                <nav className="flex flex-col gap-1 bg-orange-300">
                  <MobileNavLink to="/about" onClick={() => setOpen(false)}>About Us</MobileNavLink>
                  <MobileNavLink to="/about-surveys" onClick={() => setOpen(false)}>About Surveys</MobileNavLink>
                  <MobileNavLink to="/faq" onClick={() => setOpen(false)}>FAQ</MobileNavLink>
                  <MobileNavLink to="/survey" onClick={() => setOpen(false)}>Survey</MobileNavLink>
                  
                  {user ? (
                    <div className="mt-6 pt-4 border-t space-y-1 bg-orange-300">
                      <MobileNavButton onClick={() => { setOpen(false); navigate('/dashboard'); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline mr-3">
                          <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Dashboard
                      </MobileNavButton>
                      <MobileNavButton onClick={() => { setOpen(false); navigate('/wallet'); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline mr-3">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 010-4h14v4"/>
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5v14a2 2 0 002 2h16v-5"/>
                          <circle cx="16" cy="12" r="2" strokeWidth="2"/>
                        </svg>
                        Wallet
                      </MobileNavButton>
                      <MobileNavButton onClick={() => { setOpen(false); logout(); }} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline mr-3">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                        </svg>
                        Logout
                      </MobileNavButton>
                    </div>
                  ) : (
                    <div className="mt-6 pt-4 border-t space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => { setOpen(false); navigate('/login'); }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90" 
                        onClick={() => { setOpen(false); navigate('/signup'); }}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
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

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "block px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/30 hover:text-foreground text-foreground/70",
          isActive && "text-foreground bg-muted/20",
        )
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavButton({ onClick, children, className }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/30 hover:text-foreground text-foreground/70",
        className
      )}
    >
      {children}
    </button>
  );
}