# PROMPTS.md

The major prompts that drove this build, in order. Only prompts actually used are listed.

## 1. Product & scope brief

> ABTalks runs a 60-day coding challenge for Indian college students. Students pick a track,
> build something every day, and maintain a public learning streak by submitting a GitHub commit
> and a LinkedIn post. Most students use the platform on their phones, late at night after college.
> The product works — it has never been designed. Redesign and ship three screens:
> `/` (landing), `/dashboard` (student dashboard), `/day/12` (a single challenge day).
> Mobile-first at 390px, desktop secondary. Handle edge cases: first day with no streak, a missed
> day, an empty profile. Add at least one thoughtful idea that improves the student experience.
> Auth, real accounts and a production database are out of scope — use mocked data.

## 2. Design system prompt ("Velocity Core", professionalised)

> Build a design system named Velocity Core: obsidian dark surfaces (#0A0A0C base, #121217 surface),
> emerald as the momentum/streak accent, indigo for interaction, amber for highlights. Light mode is
> first-class, not an afterthought — deepen accents for WCAG AA on white. Everything as CSS custom
> properties consumed through Tailwind tokens; never hardcode hex in components. Keep it professional:
> restrained glassmorphism, no neon glow spam.

## 3. Motion prompt

> Use Framer Motion (`motion`): `whileTap={{ scale: 0.96 }}` on buttons, shared `layoutId` for the
> bottom-nav and tab indicators with spring `stiffness: 400, damping: 30`, `AnimatePresence` for
> modals and tab content, a pulsing streak flame, and a spring pop on submission success.
> Every animation must have a `prefers-reduced-motion` fallback.

## 4. Data contract prompt

> Define `DayStatus = "completed" | "missed" | "today" | "upcoming"`, `ChallengeDay` and `UserProfile`
> in one types module so dashboard, matrix and day detail can never disagree. Export four mock presets —
> active streak, first day, broken streak, empty profile — so the edge-case states are real typed
> objects, not conditional hacks.

## 5. Developer-experience prompt

> Add an info button in the header that explains the workflow and lists keyboard shortcuts, because
> most people never read the README. Shortcuts: `?` info, `T` theme, `G H` home, `G D` dashboard,
> `G T` today's day, `Esc` close.

## 6. Verification prompt

> Audit every interactive element: nothing should be a dead button. Check light and dark mode for
> invisible text, inputs and borders. Test at 390px. Give a feature-by-feature PASS/FAIL report
> instead of just saying the build passed.