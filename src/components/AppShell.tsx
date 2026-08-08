import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { Home, LayoutGrid, Terminal, Info, Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useChallenge } from "@/lib/challenge-store";
import { InfoPanel } from "./InfoPanel";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { profile } = useChallenge();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const todayHref = `/day/${profile.challengeDay}`;

  useShortcuts({
    onInfo: () => setInfoOpen((v) => !v),
    onTheme: toggle,
    todayHref,
    navigate: (to: string) => router.navigate({ to }),
  });

  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { to: todayHref, label: `Day ${profile.challengeDay}`, icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2" aria-label="ABTalks home">
            <span className="flex size-8 items-center justify-center rounded-xl bg-momentum shadow-glow">
              <Zap aria-hidden className="size-4 fill-primary-foreground text-primary-foreground" />
            </span>
            <span className="text-sm font-extrabold tracking-tight">
              ABTalk<span className="text-primary">S</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="hidden rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:inline">
              60-Day Challenge
            </span>
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-xl border border-border bg-surface p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setInfoOpen(true)}
              aria-label="How it works and keyboard shortcuts"
              className="rounded-xl border border-border bg-surface p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Info className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4">{children}</main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border glass pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto flex w-full max-w-3xl items-center justify-around px-4 py-2">
          {items.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "relative flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-xl bg-primary/10"
                  />
                )}
                <item.icon aria-hidden className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <InfoPanel open={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}

function useShortcuts({
  onInfo,
  onTheme,
  todayHref,
  navigate,
}: {
  onInfo: () => void;
  onTheme: () => void;
  todayHref: string;
  navigate: (to: string) => void;
}) {
  useEffect(() => {
    let awaitingGo = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();

      if (awaitingGo) {
        awaitingGo = false;
        clearTimeout(timer);
        const target = key === "h" ? "/" : key === "d" ? "/dashboard" : key === "t" ? todayHref : null;
        if (target) {
          e.preventDefault();
          navigate(target);
        }
        return;
      }

      if (key === "g") {
        awaitingGo = true;
        timer = setTimeout(() => (awaitingGo = false), 1200);
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        onInfo();
      }
      if (key === "t") {
        e.preventDefault();
        onTheme();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [onInfo, onTheme, todayHref, navigate]);
}