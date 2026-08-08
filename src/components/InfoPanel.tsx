import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { X, GitCommitHorizontal, Linkedin, Flame, Keyboard, Route } from "lucide-react";

const SHORTCUTS = [
  { keys: ["?"], label: "Open / close this panel" },
  { keys: ["T"], label: "Toggle light / dark mode" },
  { keys: ["G", "H"], label: "Go to home" },
  { keys: ["G", "D"], label: "Go to dashboard" },
  { keys: ["G", "T"], label: "Go to today's challenge day" },
  { keys: ["Esc"], label: "Close any panel or dialog" },
];

const FLOW = [
  { icon: Flame, title: "1 · Open today's day", body: "Your dashboard always points at exactly one task. No backlog, no guessing." },
  { icon: GitCommitHorizontal, title: "2 · Build & commit", body: "Ship the task, then push a real commit to a public repo." },
  { icon: Linkedin, title: "3 · Post the proof", body: "Paste the commit URL and your LinkedIn post URL. Streak extends instantly." },
];

export function InfoPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close info panel"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="How ABTalks works"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative m-3 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-surface p-5 shadow-elevated"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold">How ABTalks works</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  60 days. One task a day. Public proof of work.
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {FLOW.map((s) => (
                <div key={s.title} className="flex gap-3 rounded-2xl border border-border bg-surface-raised p-3">
                  <s.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-semibold">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Keyboard aria-hidden className="size-3.5" /> Keyboard shortcuts
              </h3>
              <ul className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {SHORTCUTS.map((s) => (
                  <li key={s.label} className="flex items-center justify-between gap-3 bg-surface-raised px-3 py-2">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="flex gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="rounded-md border border-border-strong bg-surface px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-accent/25 bg-accent/10 p-3">
              <Route aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                A day stays open until <span className="font-semibold text-foreground">4:00 AM IST</span> — late-night
                commits still count for the previous day.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}