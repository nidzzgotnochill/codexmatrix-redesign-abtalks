import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  GitCommitHorizontal,
  Linkedin,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { faqs, recruiterQuotes, trustColleges } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalkS — 60 Days. One Task a Day. Public Proof." },
      {
        name: "description",
        content:
          "A 60-day coding challenge for Indian college students. Pick a track, build every night, and prove it with a GitHub commit and a LinkedIn post.",
      },
      { property: "og:title", content: "ABTalkS — 60 Days. One Task a Day. Public Proof." },
      {
        property: "og:description",
        content: "A 60-day coding challenge for Indian college students. Pick a track, build every night, and prove it with a GitHub commit and a LinkedIn post.",
      },
    ],
  }),
  component: Landing,
});

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

const STEPS = [
  { n: "01", title: "Pick your track", body: "DSA, full-stack, or AI/ML. The daily task scales to where you are today." },
  { n: "02", title: "Build tonight", body: "One focused task per day, sized for two hours after college." },
  { n: "03", title: "Ship the proof", body: "Drop your commit URL and LinkedIn post. Your streak updates instantly." },
];

function Landing() {
  const students = useCountUp(4218);

  return (
    <AppShell>
      <section className="pt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          <Sparkles aria-hidden className="size-3.5" />
          Cohort 07 · starts every Monday
        </span>

        <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          Code daily for 60 days.
          <br />
          <span className="text-momentum">Make it impossible to ignore.</span>
        </h1>

        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
          ABTalkS is a 60-day accountability challenge for Indian college students. One task a night, one public commit,
          one LinkedIn post — until your profile speaks louder than your resume.
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <motion.div whileTap={{ scale: 0.97 }} className="sm:w-auto">
            <Link
              to="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-momentum px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-glow"
            >
              Start the 60-day challenge
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </motion.div>
          <Link
            to="/day/$day"
            params={{ day: "12" }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            See a sample day
          </Link>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Users aria-hidden className="size-4 text-primary" />
          <span className="font-mono font-bold tabular-nums text-foreground">{students.toLocaleString("en-IN")}</span>
          students building right now
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface py-4">
        <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Students from 120+ campuses
        </p>
        <div className="mt-3 flex w-max animate-marquee gap-2 hover:[animation-play-state:paused]">
          {[...trustColleges, ...trustColleges].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap rounded-xl border border-border bg-surface-raised px-3 py-1.5 text-[11px] font-medium text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How it works</h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 26 }}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <span className="font-mono text-xs font-bold text-primary">{s.n}</span>
              <h3 className="mt-2 text-sm font-bold">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-2.5 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/10 p-4">
          <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-sm font-bold">Code at 2 AM? We've got you.</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              A challenge day stays open until 4:00 AM IST. Late-night commits still count for the day before.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-bold">Proof, not promises</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Every day is backed by a real commit and a public post — nothing self-reported.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What recruiters say</h2>
        <div className="mt-3 flex snap-x gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {recruiterQuotes.map((r) => (
            <figure
              key={r.name}
              className="w-[86%] shrink-0 snap-start rounded-2xl border border-border bg-surface p-4 sm:w-1/2"
            >
              <blockquote className="text-xs leading-relaxed text-foreground">“{r.quote}”</blockquote>
              <figcaption className="mt-3 text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{r.name}</span> · {r.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before you commit</h2>
        <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-border bg-surface p-5 text-center">
        <div className="flex justify-center gap-3 text-muted-foreground">
          <GitCommitHorizontal aria-hidden className="size-5" />
          <Linkedin aria-hidden className="size-5" />
          <RouteIcon aria-hidden className="size-5" />
        </div>
        <h2 className="mt-3 text-lg font-extrabold">Day 1 is a README and one commit.</h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
          That's it. The hardest part is starting tonight instead of next Monday.
        </p>
        <motion.div whileTap={{ scale: 0.97 }} className="mt-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl bg-momentum px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Open my dashboard
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </motion.div>
      </section>
    </AppShell>
  );
}