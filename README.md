# ABTalkS — 60-Day Coding Challenge

ABTalkS is a **60-day accountability challenge for Indian college students**. Students pick a track, build one task every night, and keep a public streak alive by submitting a **GitHub commit** and a **LinkedIn post** as proof of work.

This repository is a **mobile-first redesign of the student-facing ABTalkS experience**, focused on consistency, visibility, and a clear late-night coding workflow.

## Route Map

```text
/
├── /dashboard
└── /day/12
```

All three primary screens are designed for a **390px viewport first**. Desktop is treated as a secondary responsive layout.

---

## Screens

| Route | What it does |
|---|---|
| `/` | Landing page for students who have never heard of ABTalkS. Explains the challenge, how it works in three steps, campus/recruiter trust signals, and FAQs including the "I code at 2 AM" case. |
| `/dashboard` | Shows the current streak, today's task, completion percentage, consistency score, longest streak, days remaining, and the 60-day challenge matrix with a tap-to-preview modal. |
| `/day/12` | Full challenge-day experience with Overview / Requirements / Resources tabs, a countdown to the local-midnight cut-off, proof-of-work submission, live URL validation, loading/error/success states, and previous/next day navigation. The route is dynamic: `/day/[day]`, supporting days 1–60. |

---

## Edge Cases Handled

Edge cases can be switched live using the **Preview State** control on the dashboard.

### Day 1 — No Streak

- Flame displays `0`
- An onboarding banner replaces "keep it going" language
- The experience focuses on helping a new student start the challenge

### Missed a Day

- The missed day is clearly marked in the matrix
- The current streak resets
- Copy points toward the student's personal best instead of using negative/shaming language

### Empty Profile

- No college or branch information is assumed
- The dashboard prompts the student to complete their profile instead of rendering blank rows

### Locked Future Day

- `/day/40` renders a locked state
- A locked challenge does not display a broken or unusable submission form

### Out-of-Range Day

- `/day/99` renders a friendly not-found state
- The application does not crash on invalid challenge-day routes

---

## The Thoughtful Idea

### The Midnight Deadline, Made Visible

Students often code late at night, so one of the biggest sources of pressure is simply knowing **exactly how much time is left**.

Each challenge day closes at **local midnight**. The Challenge Day page displays a live countdown showing the remaining:

- Hours
- Minutes
- Seconds

Submit before **12:00 AM** and the day counts toward the student's challenge progress.

The experience is paired with an **info button and keyboard shortcuts** in the header, making important workflow information available without forcing students to search through documentation.

---

## Tech Stack

- **TanStack Start** — React 19, file-based routing, SSR
- **Vite 7**
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-first configuration
- **Motion / Framer Motion** — spring physics, `layoutId` indicators, `AnimatePresence`
- **lucide-react** — interface icons

---

## Design System — "Velocity Core"

The visual system is built around three primary ideas:

- **Obsidian** surfaces for the core interface
- **Emerald** for momentum and streaks
- **Indigo** for interaction
- **Amber** for time pressure and important highlights

Both light and dark themes are first-class experiences.

Theme switching is driven by a `.dark` class on `<html>` with a pre-hydration script to prevent a flash of the wrong theme.

All major visual tokens are centralized in:

```text
src/styles.css
```

This includes:

- Colors
- Radii
- Shadows
- Gradients
- Theme values

Components avoid hardcoded color values wherever possible and consume the design tokens instead.

---

## Authentication & Database

Authentication and database functionality are **out of scope for this redesign brief**.

There is currently:

- No authentication
- No user accounts
- No database
- No fake client-side authentication
- No `"user"` object written to `localStorage`

The only browser storage used is for the **theme preference**.

Challenge and student data come from typed mock data in:

```text
src/lib/mock-data.ts
```

The mock data is held in React context for the current session.

---

## Run Locally

Install dependencies:

```bash
bun install
```

Or with npm:

```bash
npm install
```

Start the development server:

```bash
bun run dev
```

The application will be available at:

```text
http://localhost:8080
```

Build for production:

```bash
bun run build
```

Run linting:

```bash
bun run lint
```

---

## Environment Variables

No environment variables are required.

The application currently has:

- No backend API calls
- No external database
- No authentication service
- No application secrets

If a backend is added later, real environment values should **never be committed to Git**. Only an `.env.example` containing placeholder keys should be tracked.

---

## Project Structure

```text
src/
├── routes/
│   ├── __root.tsx        # HTML shell, theme + data providers, base metadata
│   ├── index.tsx         # /
│   ├── dashboard.tsx     # /dashboard
│   └── day.$day.tsx      # /day/[day], dynamic 1–60
│
├── components/
│   ├── AppShell.tsx      # Header, bottom navigation, shortcuts
│   ├── InfoPanel.tsx     # Workflow + keyboard shortcuts dialog
│   └── StreakFlame.tsx   # Streak flame component
│
├── lib/
│   ├── types.ts          # DayStatus, ChallengeDay, UserProfile
│   ├── mock-data.ts      # Four typed preview presets
│   ├── challenge-store.tsx
│   ├── validators.ts     # GitHub / LinkedIn URL validation
│   └── theme.tsx
│
└── styles.css            # Velocity Core design tokens
```

---

## Accessibility

Accessibility is considered throughout the interface.

Implemented considerations include:

- Semantic landmarks
- One `<h1>` per route
- Properly labelled form inputs
- `aria-invalid` on invalid inputs
- Inline validation messages
- `aria-pressed` on toggle controls
- Visible `focus-visible` rings
- `Esc` key support for closing dialogs
- Status information is not communicated through colour alone
- A labelled legend explains the challenge matrix states
- Global `prefers-reduced-motion` fallback

---

## Responsive Design

The redesign follows a **mobile-first approach** because the target users are college students who are likely to use the platform from their phones, including late at night.

The primary verification viewport is:

```text
390px
```

The interface is also designed to adapt to larger desktop layouts without changing the core challenge workflow.

---

## AI-Assisted Development

This redesign was built with the assistance of an **AI coding agent**.

The prompts used to plan, design, refine, debug, and verify the project are documented separately for transparency and hackathon authenticity:

**[View the complete ABTalkS build prompts →](./PROMPTS.md)**

The prompt log includes:

- Initial product and architecture specification
- Design-system instructions
- Landing-page and dashboard refinements
- Countdown and streak improvements
- Data consistency changes
- Edge-case handling
- Challenge Day page implementation
- Security checks
- Bug fixes
- Final responsive verification

---

## Project Goal

The goal of this redesign is not simply to make ABTalkS look better.

It is designed to make the **daily proof-of-work habit easier to understand and harder to break**.

The experience emphasizes:

1. **Know what to build**
2. **Know how much time is left**
3. **Submit proof of work**
4. **See your progress**
5. **Keep the streak alive**
