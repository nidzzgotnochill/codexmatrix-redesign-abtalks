# ABTalkS — 60-Day Coding Challenge

ABTalkS is a 60-day accountability challenge for Indian college students. Students pick a track,
build one task every night, and keep a public streak alive by submitting a **GitHub commit** and a
**LinkedIn post** as proof of work. This repository is a mobile-first redesign of the student-facing
experience.

## Route map

```
/
/dashboard
/day/12
```

All three are designed for a **390px** viewport first; desktop is a secondary layout.

## Screens

| Route | What it does |
| --- | --- |
| `/` | Landing page for a student who has never heard of ABTalkS: what the challenge is, how it works in three steps, campus/recruiter trust signals, and FAQs including the "I code at 2 AM" case. |
| `/dashboard` | Current streak, today's task, completion %, consistency score, longest streak, days remaining, and the 60-day matrix with a tap-to-preview modal. |
| `/day/12` | A full challenge day: task briefing tabs (Overview / Requirements / Resources), a countdown to the local-midnight cut-off, and the proof-of-work form with live URL validation, loading, error and success states. Prev/next day navigation included; the route is dynamic (`/day/$day`, 1–60). |

## Edge cases handled

Switch between them live with the **Preview state** control on the dashboard:

- **Day 1, no streak** — flame reads 0, an onboarding banner replaces "keep it going" language.
- **Missed a day** — the missed cell is marked, the streak resets, and the copy points at the personal best instead of shaming.
- **Empty profile** — no college/branch; the dashboard prompts for it instead of rendering blank rows.
- **Locked future day** — `/day/40` renders a lock state, not a broken form.
- **Out-of-range day** — `/day/99` renders a friendly not-found instead of crashing.

## The thoughtful idea

**The midnight deadline, made visible.** Students code late, so the pressure is knowing exactly how
much of the day is left. Each challenge day closes at local midnight and the countdown on the day page
shows the remaining hours, minutes and seconds — submit before 12:00 AM and the day counts. Paired with it: an
**info button + keyboard shortcuts** in the header, because nobody reads the docs.

## Tech stack

- **TanStack Start** (React 19, file-based routing, SSR) on Vite 7
- **TypeScript**, strict mode
- **Tailwind CSS v4** — CSS-first config, all design tokens in `src/styles.css`
- **Motion** (Framer Motion) for spring physics, `layoutId` indicators, `AnimatePresence`
- **lucide-react** icons

## Design system — "Velocity Core"

Obsidian surfaces, emerald for momentum/streaks, indigo for interaction, amber for time pressure.
Light and dark are both first-class, driven by a `.dark` class on `<html>` with a pre-hydration
script so there is no flash of the wrong theme. Every color, radius, shadow and gradient is a token
in `src/styles.css` — components never hardcode hex values.

## Authentication & database

Out of scope for this brief. There is **no authentication, no user accounts and no database**, and
no fake client-side auth either — nothing writes a "user" to `localStorage`. The only browser
storage used is the theme preference. All challenge data comes from typed mocks in
`src/lib/mock-data.ts`, held in React context for the session.

## Run locally

```bash
bun install     # or: npm install
bun run dev     # http://localhost:8080
bun run build   # production build
bun run lint
```

## Environment variables

None are required — the app has no backend calls or secrets. If you later add a backend, keep real
values out of git and commit only an `.env.example` with placeholder keys.

## Project structure

```
src/
├── routes/
│   ├── __root.tsx        # html shell, theme + data providers, base metadata
│   ├── index.tsx         # /
│   ├── dashboard.tsx     # /dashboard
│   └── day.$day.tsx      # /day/12 (dynamic, 1–60)
├── components/
│   ├── AppShell.tsx      # header, bottom nav, shortcuts
│   ├── InfoPanel.tsx     # workflow + keyboard shortcuts dialog
│   └── StreakFlame.tsx
├── lib/
│   ├── types.ts          # DayStatus, ChallengeDay, UserProfile
│   ├── mock-data.ts      # four typed presets
│   ├── challenge-store.tsx
│   ├── validators.ts     # GitHub / LinkedIn URL validation
│   └── theme.tsx
└── styles.css            # Velocity Core tokens
```

## Accessibility

Semantic landmarks, one `<h1>` per route, labelled inputs with `aria-invalid` and inline errors,
`aria-pressed` on toggles, focus-visible rings, `Esc` to close dialogs, status never signalled by
colour alone (the matrix has a labelled legend), and a global `prefers-reduced-motion` fallback.

## AI-assisted development

This redesign was built with an AI coding agent. The prompts that shaped it are in
[`PROMPTS.md`](./PROMPTS.md).