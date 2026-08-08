import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Github,
  Linkedin,
  Loader2,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useChallenge } from "@/lib/challenge-store";
import { TOTAL_DAYS } from "@/lib/mock-data";
import { isGithubUrl, isLinkedinUrl } from "@/lib/validators";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/day/$day")({
  params: {
    parse: ({ day }) => {
      const n = Number(day);
      if (!Number.isInteger(n) || n < 1 || n > TOTAL_DAYS) throw notFound();
      return { day };
    },
    stringify: ({ day }) => ({ day: String(day) }),
  },
  head: ({ params }) => ({
    meta: [
      { title: `Day ${params.day} — ABTalkS 60-Day Challenge` },
      {
        name: "description",
        content: `Day ${params.day} of the ABTalkS challenge: read the task, build it, and submit your GitHub commit and LinkedIn post.`,
      },
      { property: "og:title", content: `Day ${params.day} — ABTalkS` },
      { property: "og:description", content: "Read the task, build it, submit your proof of work." },
    ],
  }),
  component: DayPage,
});

const TABS = ["Overview", "Requirements", "Resources"] as const;
type Tab = (typeof TABS)[number];

function useMidnightCountdown() {
  const [left, setLeft] = useState("—:—:—");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(28, 0, 0, 0); // 4:00 AM next day
      const diff = Math.max(end.getTime() - now.getTime(), 0);
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      setLeft([h, m, s].map((v) => String(v).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

function DayPage() {
  const { day: dayParam } = Route.useParams();
  const dayId = Number(dayParam);
  const { getDay, submitProof, profile } = useChallenge();
  const day = getDay(dayId);
  const [tab, setTab] = useState<Tab>("Overview");
  const countdown = useMidnightCountdown();

  if (!day) {
    return (
      <AppShell>
        <div className="py-16 text-center">
          <h1 className="text-lg font-bold">Day {dayParam} doesn't exist</h1>
          <p className="mt-1 text-xs text-muted-foreground">The challenge runs from day 1 to day {TOTAL_DAYS}.</p>
          <Link to="/dashboard" className="mt-4 inline-block text-xs font-semibold text-primary underline">
            Back to dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  const locked = day.status === "upcoming";

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-3.5" /> Dashboard
        </Link>
        <span
          className={cn(
            "rounded-full border px-3 py-1 font-mono text-[11px] font-bold",
            day.status === "completed" && "border-primary/25 bg-primary/10 text-primary",
            day.status === "today" && "border-accent/25 bg-accent/10 text-accent",
            day.status === "missed" && "border-destructive/30 bg-destructive/10 text-destructive",
            locked && "border-border bg-muted text-muted-foreground",
          )}
        >
          Day {day.id} · {day.status}
        </span>
      </div>

      <header className="mt-4">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {day.track}
        </span>
        <h1 className="mt-1 text-xl font-extrabold leading-tight">{day.title}</h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{day.summary}</p>
        {day.status === "today" && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-highlight/25 bg-highlight/10 p-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-highlight/85">Deadline</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Closes at 4:00 AM IST</p>
            </div>
            <div className="rounded-xl border border-highlight/25 bg-background/70 px-3 py-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Time left</p>
              <p className="mt-1 font-mono text-lg font-black tracking-[0.2em] text-foreground">{countdown}</p>
            </div>
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="mt-5 flex rounded-2xl border border-border bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "relative flex-1 rounded-xl py-2 text-xs font-bold transition-colors",
              tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="day-tab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-momentum"
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="mt-3 rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground"
        >
          {tab === "Overview" && (
            <p>
              {day.summary} Aim for roughly two focused hours. Working code beats a perfect plan — ship it, then write
              three honest lines about what broke.
            </p>
          )}
          {tab === "Requirements" && (
            <ul className="list-disc space-y-2 pl-4">
              {day.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          )}
          {tab === "Resources" && (
            <ul className="space-y-2">
              {day.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline underline-offset-2"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>

      {locked ? (
        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-border bg-surface-raised p-4 text-xs text-muted-foreground">
          <Lock aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            This day unlocks on day {day.id}. You're on day {profile.challengeDay} — finish today first.
          </p>
        </div>
      ) : (
        <ProofForm
          dayId={day.id}
          submitted={day.status === "completed"}
          github={day.githubUrl}
          linkedin={day.linkedinUrl}
          streak={profile.currentStreak}
          onSubmit={submitProof}
        />
      )}

      {/* Prev / next */}
      <nav className="mt-6 flex items-center justify-between gap-2" aria-label="Day navigation">
        {day.id > 1 ? (
          <Link
            to="/day/$day"
            params={{ day: String(day.id - 1) }}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft aria-hidden className="size-3.5" /> Day {day.id - 1}
          </Link>
        ) : (
          <span />
        )}
        {day.id < TOTAL_DAYS && (
          <Link
            to="/day/$day"
            params={{ day: String(day.id + 1) }}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Day {day.id + 1} <ChevronRight aria-hidden className="size-3.5" />
          </Link>
        )}
      </nav>
    </AppShell>
  );
}

function ProofForm({
  dayId,
  submitted,
  github,
  linkedin,
  streak,
  onSubmit,
}: {
  dayId: number;
  submitted: boolean;
  github?: string | undefined;
  linkedin?: string | undefined;
  streak: number;
  onSubmit: (id: number, g: string, l: string) => void;
}) {
  const [g, setG] = useState(github ?? "");
  const [l, setL] = useState(linkedin ?? "");
  const [touched, setTouched] = useState({ g: false, l: false });
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [editing, setEditing] = useState(false);

  const gValid = useMemo(() => isGithubUrl(g), [g]);
  const lValid = useMemo(() => isLinkedinUrl(l), [l]);

  if (submitted && !editing) {
    return (
      <section className="mt-5 rounded-3xl border border-primary/25 bg-primary/10 p-5 text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="mx-auto flex size-12 items-center justify-center rounded-full bg-momentum text-primary-foreground shadow-glow"
        >
          <CheckCircle2 className="size-6" />
        </motion.span>
        <h2 className="mt-3 text-sm font-bold">Proof submitted</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Your work is now public, and your streak is at {streak} day{streak === 1 ? "" : "s"}.
        </p>
        <div className="mt-3 space-y-1.5 text-left">
          {[
            { icon: Github, url: github, label: "Commit" },
            { icon: Linkedin, url: linkedin, label: "LinkedIn post" },
          ].map(
            (row) =>
              row.url && (
                <a
                  key={row.label}
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-[11px]"
                >
                  <row.icon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{row.url}</span>
                </a>
              ),
          )}
        </div>
        <button
          onClick={() => setEditing(true)}
          className="mt-3 text-xs font-semibold text-primary underline underline-offset-2"
        >
          Edit submission
        </button>
      </section>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ g: true, l: true });
    if (!gValid || !lValid) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => {
      onSubmit(dayId, g, l);
      setState("idle");
      setEditing(false);
    }, 700);
  };

  return (
    <form onSubmit={submit} className="mt-5 space-y-4 rounded-3xl border border-border bg-surface p-5">
      <h2 className="text-sm font-bold">Submit proof of work</h2>

      <Field
        id="github"
        icon={Github}
        label="GitHub repository or commit URL"
        placeholder="https://github.com/you/repo/commit/abc123"
        value={g}
        onChange={setG}
        onBlur={() => setTouched((t) => ({ ...t, g: true }))}
        valid={gValid}
        touched={touched.g}
        error="Enter a full github.com URL."
      />
      <Field
        id="linkedin"
        icon={Linkedin}
        label="LinkedIn post URL"
        placeholder="https://linkedin.com/posts/..."
        value={l}
        onChange={setL}
        onBlur={() => setTouched((t) => ({ ...t, l: true }))}
        valid={lValid}
        touched={touched.l}
        error="Enter a full linkedin.com post URL."
      />

      {state === "error" && (
        <p role="alert" className="flex items-center gap-2 text-xs font-medium text-destructive">
          <TriangleAlert aria-hidden className="size-3.5" /> Fix both links before submitting.
        </p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={state === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-momentum py-3.5 text-sm font-bold text-primary-foreground shadow-glow disabled:opacity-70"
      >
        {state === "loading" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Verifying links…
          </>
        ) : (
          <>Submit day {dayId} proof</>
        )}
      </motion.button>
      <p className="text-center text-[10px] text-subtle-foreground">
        Links are validated in the browser. Nothing is posted on your behalf.
      </p>
    </form>
  );
}

function Field({
  id,
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  valid,
  touched,
  error,
}: {
  id: string;
  icon: React.ElementType;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  valid: boolean;
  touched: boolean;
  error: string;
}) {
  const showError = touched && value.length > 0 && !valid;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold">
        <Icon aria-hidden className="size-3.5 text-muted-foreground" />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={showError}
          className={cn(
            "w-full rounded-xl border bg-background px-3.5 py-3 pr-9 text-xs text-foreground placeholder:text-subtle-foreground focus:outline-none",
            showError ? "border-destructive" : valid ? "border-primary" : "border-input",
          )}
        />
        {valid && (
          <CheckCircle2 aria-hidden className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
        )}
      </div>
      {showError && (
        <p className="text-[11px] font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}