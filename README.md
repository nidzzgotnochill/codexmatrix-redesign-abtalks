# ABTalkS

**ABTalkS** is a 60-day coding challenge platform designed to help Indian college students build consistent coding habits through daily challenges, streaks, progress tracking, and proof-of-work submissions.

**Live App:** https://codexmatrix-redesign-abtalks.lovable.app/

## Overview

ABTalkS turns a 60-day coding journey into a structured, visual experience. Students can:

- Start and track a 60-day coding challenge
- Complete daily coding challenges
- Track streaks, completion, and progress
- View locked, completed, current, and missed days
- Submit GitHub and LinkedIn proof of work
- Switch between dark and light themes
- Access responsive layouts on mobile and desktop
- Use keyboard shortcuts and an in-app information panel
- Recover gracefully from invalid routes and application errors

## Tech Stack

- **Framework:** Next.js 14+ / App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS variables
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** react-hook-form
- **Validation:** Zod
- **Deployment:** Lovable / Vercel-compatible Next.js deployment

## Design System — Velocity Core

ABTalkS uses a dark-first visual system built around a high-energy coding aesthetic.

### Colors

- Obsidian background: `#0A0A0C`
- Slate surfaces: `#121217`
- Emerald: `#10B981` — streaks and success states
- Indigo: `#6366F1` — interactive elements
- Amber: `#F59E0B` — highlights

A complete light-mode counterpart is also supported.

### Visual Language

- Glassmorphism
- Backdrop blur
- Subtle borders
- Glow accents in dark mode
- Soft neutral shadows in light mode
- Spring-based interactions
- Shared `layoutId` transitions
- Streak flame animation
- Success checkmark/confetti feedback
- `prefers-reduced-motion` support

## Core Routes

### Landing Page — `/`

Includes:

- Hero section
- Live student counter
- Indian college trust ticker
- Three-step "How It Works" section
- FAQ preview
- Dynamic challenge CTA
- Information panel
- Keyboard shortcuts
- Midnight deadline messaging

### Student Dashboard — `/dashboard`

Includes:

- Profile card
- Streak and statistics
- Today's challenge
- 60-day interactive progress matrix
- Day preview modal
- Completed / missed / current / locked states
- Edge-case state handling

Supported dashboard states include:

- Normal
- First Day
- Missed Yesterday
- Empty Profile

### Challenge Day — `/day/[day]`

Includes:

- Immersive day header
- Live countdown to local midnight
- Overview / Requirements / Resources tabs
- Framer Motion shared-layout tab animation
- GitHub proof-of-work URL
- LinkedIn proof-of-work URL
- Instant schema validation
- Success animation
- Streak-increment feedback
- Bottom navigation
- Challenge content loaded from shared mock data

## Project Data Architecture

The project uses a shared mock-data architecture for the frontend demo.

Challenge content is read from the existing challenges data rather than duplicated across pages.

Student progress and derived statistics are calculated from the same underlying data source.

For example, the Day 8 missed state is represented in the underlying data rather than being only a visual state.

The statistics pipeline derives:

- Current streak
- Longest streak
- Completed count
- Completion percentage
- Days remaining

This prevents different parts of the application from displaying contradictory progress information.

## 60-Day Challenge Logic

The verified demo state includes:

- Days 1–7: Completed
- Day 8: Missed
- Current day: Today
- Future days: Locked

The Day 8 state is stored in the underlying mock data and automatically propagates to pages that consume that data.

The verified derived statistics for this demo state are:

- **Current streak:** 3
- **Longest streak:** 7
- **Completed:** 10
- **Consistency:** 91%
- **Days left:** 49

## Dynamic User Experience

The landing-page challenge CTA is dynamic rather than hardcoded.

### New users

Shows:

> Start the challenge →

### Returning users

Shows:

> Open today's challenge →

The CTA is driven by the user's actual current challenge state.

Other Day-1-specific assumptions were also audited and corrected where they were stale.

## Countdown Logic

The challenge deadline is based on **local midnight** rather than a hardcoded `4:00 AM IST` deadline.

The countdown logic is shared across the application so the landing page, dashboard, and challenge-day page remain consistent.

A duration cap prevents confusing displays such as `25+ hours`.

The project was also searched for stale `4 AM` / `4:00 AM IST` references and the relevant copy was corrected.

## Security Hardening

A dedicated security audit covered six areas.

### 1. Rate Limiting

- Stricter limits for authentication-related routes
- Exponential backoff for repeated attempts
- Moderate limits for public endpoints
- Configurable thresholds

### 2. Input Validation

Inputs are validated against strict schemas.

The application follows a reject-invalid-input approach instead of relying only on sanitization.

Proof-of-work URLs are schema validated.

### 3. Secrets Management

The project was checked for:

- Hardcoded API keys
- Tokens
- Secrets
- Exposed credentials

No hardcoded secrets were found.

Environment variables are used for sensitive configuration.

### 4. Dependency Audit

Dependencies were reviewed for known vulnerabilities.

The audit reported no high or critical dependency vulnerabilities.

### 5. Error Handling

Users are not exposed to:

- Stack traces
- Raw database errors
- Internal implementation details

Client-facing errors use generic messages while detailed errors can be logged server-side.

An SSR error boundary was also reviewed as part of the security pass.

### 6. File Upload Safety

File-upload validation and storage isolation were reviewed.

The application currently has no file-upload functionality, so upload-specific checks were not applicable to the runtime.

## Accessibility & Motion

ABTalkS respects reduced-motion preferences using `prefers-reduced-motion`.

Animations are used for feedback and interaction rather than being required to understand the application's core information.

Interactive elements were audited so that buttons and controls either perform their intended function or are removed rather than remaining misleading dead buttons.

## Responsive Verification

The application was verified at a **390px mobile viewport**.

The final verification confirmed:

- No horizontal scrolling
- Clean rendering
- Responsive dashboard matrix
- Correct challenge-day layout
- Working navigation
- Working theme toggle
- No console errors

Verified routes:

- `/`
- `/dashboard`
- `/day/12`

An invalid challenge-day route also correctly returns a 404.

## Final QA Verification

The final verification pass covered:

- Landing page
- Dashboard
- Challenge day page
- Dark mode
- Light mode
- Theme hydration
- Active tab visibility
- Countdown
- Matrix states
- Dynamic CTA
- Invalid routes
- Responsive behavior
- Console errors
- Horizontal overflow
- Interactive dashboard controls

### Final status

- **390px rendering:** Verified
- **Console errors:** None observed
- **Horizontal scroll:** None observed
- **Dark/light toggle:** Working
- **Invalid day route:** Correct 404
- **Challenge content:** Loaded from shared data
- **Countdown:** Synced to local midnight
- **Day 8 missed state:** Stored in underlying data
- **Proof URLs:** Schema validated

## Build & Development Log

The following records the major prompts and implementation passes used to plan, design, build, polish, and verify ABTalkS with Lovable. It is maintained for hackathon authenticity and transparency.

### 1. Initial Project Specification

The first prompt established the application as a 60-day coding challenge platform for Indian college students and defined:

- Staff-level product engineering ownership
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Framer Motion
- Lucide React
- react-hook-form
- Zod
- Velocity Core design system
- Required routes
- Security requirements
- Responsive behavior
- Developer-friendly file structure

The initial implementation delivered the application shell, routing, theme tokens, dark/light mode, and core folder structure.

### 2. Finalization & Security Audit

A structured audit was used to verify:

- Auth UI field visibility
- Theme behavior
- Signup/login/logout flows
- Error states
- Session behavior
- Data consistency
- Interactive dashboard elements
- Content across `/day/1` through `/day/12`

The project was identified as a frontend mock-data demo rather than a live-backend production authentication system.

The audit confirmed:

- No hardcoded secrets
- No exposed endpoints
- Schema-validated proof URLs
- Consistent frontend behavior

### 3. UI/UX Redesign Pass

A focused redesign pass improved:

- The `AB TALKS` wordmark
- Hero copy
- 60-day matrix size and readability
- Countdown visual prominence

The existing component system, routes, and overall dark visual identity were preserved.

### 4. Dashboard Consistency Pass

The following inconsistencies were corrected:

- Removed the hardcoded `Cohort 07 · starts every Monday` message
- Replaced the incorrect streak icon
- Synchronized matrix status icons and colors
- Changed the countdown deadline from 4:00 AM IST to local midnight
- Added a cap to prevent confusing countdown durations

### 5. Streak Flame Icon Correction

The streak icon was refined so it clearly reads as a flame and remains consistent across all streak components.

### 6. Day 8 Missed State & Data Consistency Pass

This was the largest data-logic pass.

The implementation was instructed to:

- Inspect the existing project and data structure first
- Reuse existing components
- Avoid redesigning the application
- Avoid changing the theme
- Avoid changing routes
- Avoid changing the matrix layout
- Make Day 8 genuinely missed in underlying data
- Derive statistics from the same data
- Correct stale deadline copy
- Remove stray 4 AM references
- Make the Day 1 CTA dynamic
- Audit stale Day-1 assumptions
- Verify at 390px
- Check for console errors
- Avoid automatically committing or pushing

The resulting implementation made Day 8 a real mock-data state and introduced a shared `deriveStats` calculation path.

### 7. Security Hardening Pass

A dedicated pass covered:

- Rate limiting
- Authentication backoff
- Public endpoint limits
- Strict input validation
- Secret scanning
- Dependency auditing
- Generic client-side errors
- Server-side error logging
- File-upload review

The resulting audit reported no high/critical dependency issues and no hardcoded secrets.

### 8. Challenge Day Page Build

The `/day/[day]` page was implemented with:

- Day number
- Challenge title
- Live countdown
- Overview tab
- Requirements tab
- Resources tab
- Shared-layout Framer Motion transitions
- GitHub proof URL
- LinkedIn proof URL
- Instant validation
- Success animation
- Streak increment feedback
- Bottom navigation
- Shared challenge data

### 9. Bug Fixes & Final Verification

The final pass fixed:

- Theme hydration mismatch
- Invisible active-tab state

Final verification confirmed:

- `/` renders correctly
- `/dashboard` renders correctly
- `/day/12` renders correctly
- Dark/light mode works
- Invalid days return 404
- No console errors
- No horizontal scroll at 390px

## Final Polish Commits

The final polish work included commits such as:

- `Update site info for publish`
- `Polish ABTalks UI`
- `Polish dashboard and countdown UI`
- `Polish streak matrix and countdown`

## Team

| Member | Role | Responsibilities |
|---|---|---|
| **Nidhi** | Team Lead & Frontend Developer | Frontend development, application architecture, component implementation, and overall project coordination |
| **Iffa** | UI/UX Designer | User experience, interface design, visual system, responsive layouts, and design consistency |
| **Arati** | Deployment & QA | Git/GitHub workflow, deployment, testing, bug verification, documentation, and final quality checks |

## AI-Assisted Development

Lovable was used as an AI-assisted development environment during the project.

The prompts documented in `PROMPTS.md` represent the major instructions used to:

- Plan the product
- Establish the architecture
- Build UI components
- Implement interactions
- Improve UX
- Validate data consistency
- Perform security reviews
- Fix bugs
- Run final verification

The purpose of `PROMPTS.md` is to maintain a transparent chronological build record for hackathon authenticity review.

## Repository Structure

The codebase is organized to make the main application areas easy for a new engineer to locate.

A typical structure includes:

```text
app/
  dashboard/
  day/
    [day]/
  page.*
components/
data/
lib/
public/
styles/
```

The exact implementation may evolve as the project develops, but the structure is intentionally organized around routes, reusable components, shared data, utilities, and public assets.

## Project Goal

ABTalkS is built around one simple idea:

> **Make coding consistency visible, motivating, and achievable.**

Instead of treating a coding challenge as a list of disconnected tasks, ABTalkS turns it into a daily journey with visible progress, streaks, proof of work, and a clear 60-day finish line.

## Live Project

**ABTalkS:** https://codexmatrix-redesign-abtalks.lovable.app/

## Documentation

- `README.md` — Project overview, setup, architecture, team, and verification
- `PROMPTS.md` — Chronological record of the prompts used during the Lovable-assisted build
