import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Lock,
  Sparkles,
  Target,
  Trophy,
  X,
  Flame,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StreakFlame } from "@/components/StreakFlame";
import { useChallenge } from "@/lib/challenge-store";
import { PRESETS } from "@/lib/mock-data";
import type { ChallengeDay, PresetKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ABTalkS 60-Day Challenge" },
      {
        name: "description",
        content: "Your streak, today's task, and your progress across the 60-day ABTalkS challenge.",
      },
      { property: "og:title", content: "Dashboard — ABTalkS" },
      { property: "og:description", content: "Track your streak, today's task and 60-day progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { profile, preset, setPreset, completedCount, missedCount, totalDays } = useChallenge();
  const [selected, setSelected] = useState<ChallengeDay | null>(null);
  const today = profile.days.find((d) => d.id === profile.challengeDay);
  const pct = Math.round((completedCount / totalDays) * 100);
  const isEmpty = profile.college === "";

  return (
    <AppShell>
      {/* Profile */}
      <section className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-momentum text-sm font-bold text-primary-foreground">
            {profile.initials}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold">{profile.name}</h1>
            <p className="truncate text-[11px] text-muted-foreground">
              {isEmpty ? "Add your college to appear on campus leaderboards" : `${profile.college} · ${profile.branch}`}
            </p>
          </div>
        </div>
        <StreakFlame streak={profile.currentStreak} size="lg" />
      </section>

      {/* Preset switcher — demo affordance for edge-case states */}
      <section className="mt-4 rounded-2xl border border-border bg-surface p-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 pl-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Preview state
          </span>
          {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setPreset(k)}
              aria-pressed={preset === k}
              className={cn(
                "shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                preset === k
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-raised text-muted-foreground hover:text-foreground",
              )}
            >
              {PRESETS[k].label}
            </button>
          ))}
        </div>
      </section>

      {/* Contextual banner */}
      {isEmpty && (
        <Banner tone="accent" icon={Sparkles}>
          Your profile is empty. Add your college and track so recruiters can find you — takes 30 seconds.
        </Banner>
      )}
      {!isEmpty && profile.challengeDay === 1 && (
        <Banner tone="primary" icon={Sparkles}>
          Day 1 of 60. No streak yet — tonight's commit starts it.
        </Banner>
      )}
      {missedCount > 0 && (
        <Banner tone="warning" icon={AlertTriangle}>
          You missed Day {profile.days.find((d) => d.status === "missed")?.id}. Your {profile.longestStreak}-day best is
          safe — submit today to start again.
        </Banner>
      )}

      {/* Today's task */}
      {today && (
        <section className="relative mt-4 overflow-hidden rounded-[1.6rem] border border-border bg-surface p-5 shadow-elevated">
          <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/15 blur-3xl" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                Day {today.id} of {totalDays}
              </span>
              <h2 className="mt-3 text-lg font-bold leading-tight">{today.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{today.summary}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl border border-border/70 bg-surface-raised/70 px-3 py-2 text-[11px] font-medium text-muted-foreground sm:whitespace-nowrap">
              <Clock aria-hidden className="size-3.5" />
              Due at local midnight
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border/70 bg-surface-raised/70 p-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span
                className={cn(
                  "size-2 rounded-full",
                  today.status === "completed" ? "bg-primary" : "animate-flame bg-highlight",
                )}
              />
              {today.status === "completed" ? "Submitted & verified" : "Pending submission"}
            </span>
            <motion.div whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
              <Link
                to="/day/$day"
                params={{ day: String(today.id) }}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-momentum px-4 py-2.5 text-xs font-bold text-primary-foreground sm:w-auto"
              >
                {today.status === "completed" ? "View proof" : "Submit proof"}
                <ChevronRight aria-hidden className="size-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="mt-4 grid grid-cols-2 gap-2.5">
        <Stat label="Completion" value={`${pct}%`} sub={`${completedCount} of ${totalDays} days`}>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-momentum"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </div>
        </Stat>
        <Stat
          label="Consistency"
          value={`${profile.consistencyScore}%`}
          sub={profile.consistencyScore >= 80 ? "Top 8% of this cohort" : "Build it back up"}
          icon={Trophy}
        />
        <Stat label="Longest streak" value={`${profile.longestStreak}d`} sub="Personal best" icon={Target} />
        <Stat
          label="Days left"
          value={`${totalDays - profile.challengeDay + 1}`}
          sub="Until you finish the challenge"
          icon={Clock}
        />
      </section>

      {/* Matrix */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">60-day journey</h2>
          <span className="text-[10px] text-subtle-foreground">Tap any day</span>
        </div>
        <div className="mt-3 grid grid-cols-10 gap-1.5 rounded-2xl border border-border bg-surface p-3 sm:gap-2 sm:p-4">
          {profile.days.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              aria-label={`Day ${d.id}, ${d.status}`}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border font-mono text-[10px] font-bold transition-transform hover:scale-105",
                d.status === "completed" && "border-primary/20 bg-primary/10 text-primary",
                d.status === "missed" && "border-destructive/20 bg-destructive/10 text-destructive",
                d.status === "today" && "border-primary/30 bg-primary/15 text-primary ring-2 ring-primary/20",
                d.status === "upcoming" && "border-border bg-muted text-subtle-foreground",
              )}
            >
              <span className="leading-none">{d.id}</span>
              {d.status === "completed" && (
                <CheckCircle2 aria-hidden className="absolute right-0.5 top-0.5 size-2.5 text-primary" />
              )}
              {d.status === "missed" && <X aria-hidden className="absolute right-0.5 top-0.5 size-2.5" />}
              {d.status === "today" && (
                <Flame aria-hidden className="absolute right-0.5 top-0.5 size-2.5 text-primary" />
              )}
              {d.status === "upcoming" && <Lock aria-hidden className="absolute right-0.5 top-0.5 size-2.5" />}
            </button>
          ))}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          <Legend icon={CheckCircle2} className="text-primary" label="Completed" />
          <Legend icon={X} className="text-destructive" label="Missed" />
          <Legend icon={Flame} className="text-primary" label="Today" />
          <Legend icon={Lock} className="text-subtle-foreground" label="Upcoming" />
        </ul>
      </section>

      <AnimatePresence>
        {selected && <DayPreview day={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </AppShell>
  );
}

function Legend({
  icon: Icon,
  label,
  className,
}: {
  icon: React.ElementType;
  label: string;
  className?: string;
}) {
  return (
    <li className="flex items-center gap-1">
      <Icon aria-hidden className={cn("size-3", className)} />
      {label}
    </li>
  );
}

function Banner({
  tone,
  icon: Icon,
  children,
}: {
  tone: "primary" | "warning" | "accent";
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-2 rounded-2xl border p-3 text-xs leading-relaxed",
        tone === "primary" && "border-primary/25 bg-primary/10 text-foreground",
        tone === "warning" && "border-highlight/30 bg-highlight/10 text-foreground",
        tone === "accent" && "border-accent/25 bg-accent/10 text-foreground",
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 size-4 shrink-0",
          tone === "primary" && "text-primary",
          tone === "warning" && "text-highlight",
          tone === "accent" && "text-accent",
        )}
      />
      <p>{children}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  icon: Icon,
  children,
}: {
  label: string;
  value: string;
  sub: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        {Icon && <Icon aria-hidden className="size-3.5 text-subtle-foreground" />}
      </div>
      <p className="mt-1 font-mono text-xl font-extrabold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[10px] text-subtle-foreground">{sub}</p>
      {children}
    </div>
  );
}

function DayPreview({ day, onClose }: { day: ChallengeDay; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button aria-label="Close preview" onClick={onClose} className="absolute inset-0 bg-foreground/50" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Day ${day.id} preview`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative m-3 w-full max-w-md rounded-3xl border border-border bg-surface p-5 shadow-elevated"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
              Day {day.id} · {day.track}
            </span>
            <h3 className="mt-1 text-sm font-bold">{day.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{day.summary}</p>

        {day.status === "upcoming" ? (
          <p className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface-raised p-3 text-xs text-muted-foreground">
            <Lock aria-hidden className="size-4 shrink-0" />
            Unlocks on day {day.id}. Stay on streak and it opens automatically.
          </p>
        ) : (
          <Link
            to="/day/$day"
            params={{ day: String(day.id) }}
            onClick={onClose}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl bg-momentum px-4 py-3 text-xs font-bold text-primary-foreground"
          >
            {day.status === "completed" ? "View submission" : "Open this day"}
            <ChevronRight aria-hidden className="size-3.5" />
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}