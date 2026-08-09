# PROMPTS.md — ABTalkS Build Log

This document records, in order, the prompts used with Lovable to plan, design, and build the ABTalkS project. It is maintained for hackathon authenticity review.

**Live App:** https://codexmatrix-redesign-abtalks.lovable.app/

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion

---

## 1. Initial Project Specification Prompt

This was the master specification provided to Lovable to kick off the entire build. It defined the technology stack, design system, routes, security requirements, and file structure.

### Prompt

**Role & Goal:**  
You are a Staff-level Product Engineer who owns UI/UX, frontend architecture, and application security end-to-end. Build **ABTalkS** — a 60-day coding challenge platform for Indian college students.

### Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS + CSS variables for theming
- **Animation:** Framer Motion (spring physics, layout animations, AnimatePresence)
- **Icons:** Lucide React
- **Forms/Validation:** react-hook-form + zod, validated on both client and server side

### Design System — "Velocity Core"

- Dark mode first
- Obsidian background: `#0A0A0C`
- Slate surfaces: `#121217`
- Neon accents:
  - Emerald `#10B981` for streaks
  - Indigo `#6366F1` for interactive elements
  - Amber `#F59E0B` for highlights
- Full light-mode counterpart
- Glassmorphism with backdrop blur, subtle borders, and glow accents in dark mode
- Soft neutral shadows in light mode
- Motion language:
  - Buttons scale on tap
  - Tabs use shared `layoutId` transitions
  - Streak flame pulses
  - Success states trigger checkmark/confetti animations
- All motion must respect `prefers-reduced-motion`

### Required Routes

#### Landing Page `/`

- Hero section
- Live student counter
- Trust ticker featuring Indian colleges
- "How It Works" 3-step guide
- FAQ preview addressing late-night coding:
  - "Code at 2 AM? We've got you."

#### Student Dashboard `/dashboard`

- Profile card
- Streak/stats grid
- Today's challenge card
- 60-day interactive matrix
- Day-preview modal
- Edge-case state toggle:
  - Normal
  - First Day
  - Missed Yesterday
  - Empty Profile

#### Challenge Day `/day/[day]`

- Immersive header
- Countdown timer
- Overview / Requirements / Resources tabs
- GitHub + LinkedIn proof-submission form
- Form validation
- Success animation
- Bottom navigation

### Additional Requirements

- Mandatory info `(i)` button covering:
  - How-it-works information
  - Keyboard shortcuts
- Security layer:
  - Auth-guarded routes
  - Rate limiting
  - CSP headers
- Dev-friendly file structure so a new engineer can understand the codebase from folder paths alone.

### Lovable Response

Lovable delivered the initial application shell, including routing, theme tokens, dark/light mode, and the core folder structure. This provided the foundation for building the remaining pages and application logic.

---

## 2. Finalization & Security Audit Checklist Prompt

A structured end-to-end checklist was used to verify the build.

### Audit Areas

- Auth UI field visibility and styling in both themes
- Complete signup/login/logout/error-state testing
- Session behavior on logout
- Database consistency across:
  - Refresh
  - Logout
  - Login
- Audit every interactive element on the dashboard
- Implement intended functionality or remove misleading interactions
- Ensure there are no dead buttons
- Content checks across `/day/1` through `/day/12`

### Key Audit Instruction

> Audit every interactive element on the dashboard and either implement its intended functionality or remove the misleading interaction. Nothing should be a dead button.

### Lovable Response

ABTalkS ships as a frontend mock-data demo without a live backend, so this checklist served as a consistency and security audit rather than a live-authentication build.

The audit confirmed:

- No hardcoded secrets
- No exposed endpoints
- Schema-validated proof-submission URLs
- Consistent frontend behavior

---

## 3. UI/UX Redesign Pass — Landing Page, Matrix & Countdown

A focused visual polish pass was requested for three major areas without redesigning the entire application.

### Prompt

- Replace the plain-text "AB TALKS" wordmark with a more distinctive hand-drawn/brush-style treatment.
- Rewrite the hero copy to make it more polished and engaging.
- Make the 60-day matrix visually larger and easier to scan.
- Improve:
  - Cell size
  - Spacing
  - Visual hierarchy
  - Responsiveness
- Give the countdown timer stronger visual prominence.
- Reuse existing components.
- Do not redesign the entire application.
- Do not break existing routes.

### Lovable Response

Lovable:

- Updated the AB TALKS wordmark treatment
- Rewrote the hero copy
- Enlarged and restyled the 60-day matrix
- Increased the visual weight of the countdown
- Preserved the existing dark visual identity

---

## 4. Dashboard Consistency Pass

### Prompt

Make the following consistency corrections:

1. Remove the hardcoded:
   - `"Cohort 07 · starts every Monday"`
2. Replace the streak icon because the existing icon did not clearly communicate a flame.
3. Synchronize the 60-day matrix status icons and colors with the rest of the application's icon language.
4. Correct the countdown deadline from **4:00 AM IST** to **local midnight**.
5. Add a cap so the timer never displays confusing durations such as 25+ hours.

### Lovable Response

All four requested changes were applied without altering the overall matrix layout or visual identity.

---

## 5. Streak Flame Icon Correction

### Prompt

The streak icon still did not read clearly as an actual fire/flame icon.

Replace it with a proper flame icon while maintaining:

- The same sizing
- The same placement
- Consistency across every instance of the streak component

### Lovable Response

The streak icon was replaced with a proper flame icon across all instances of the streak component.

---

## 6. Day 8 Missed State + Full Data Consistency Pass

This was the largest and most detailed prompt in the project. It was a strict **smallest safe change** data-logic pass.

### Prompt

Inspect the existing project and data structure before editing.

Reuse the existing components and mock-data architecture.

**Do NOT:**

- Redesign the application
- Change the color theme
- Change routes
- Change the matrix layout

### Data Requirements

Make **Day 8** a genuinely missed day in the underlying mock data rather than only changing its visual appearance.

The expected state is:

- Days 1–7 = Completed
- Day 8 = Missed
- Current day = Today
- Future days = Locked

### Statistics

Recalculate every dependent statistic from the same underlying data so the UI can never contradict itself.

The following must be derived from the shared data:

- Current streak
- Longest streak
- Completed count
- Completion percentage
- Days remaining

### Copy & Dynamic Behavior

- Fix FAQ deadline copy from `"4:00 AM IST"` to **local midnight**.
- Search the entire project for stray `"4 AM"` references.
- Make the "Day 1 is a README" CTA dynamic:
  - New users → `"Start the challenge →"`
  - Returning users → `"Open today's challenge →"`
- Determine the CTA from the user's actual current day.
- Nothing should be hardcoded.

### Additional Audit

Audit the:

- Landing page
- Dashboard
- `/day/12`

Look for other Day-1-assuming copy and correct only content that is genuinely stale.

### Verification

Before finishing:

- Verify the app at **390px**
- Ensure there are **zero console errors**
- Do not commit automatically
- Do not push automatically

### Lovable Response

Lovable confirmed that:

- Day 8 is genuinely marked as missed in `mock-data.ts`.
- Statistics are derived live through a single `deriveStats` function.
- Current streak = **3**
- Longest streak = **7**
- Completed = **10**
- Consistency = **91%**
- Days remaining = **49**
- FAQ, info panel, and countdown label were corrected to local midnight.
- Landing hero and CTA now switch dynamically based on the user's current day.
- No console errors were found.
- No horizontal scrolling was found at 390px.

---

## 7. Security Hardening — Six Must-Have Checks

A dedicated security pass was performed covering six major areas.

### 1. Rate Limiting

- Stricter limits on authentication routes
- Exponential backoff for authentication attempts
- Moderate limits on public endpoints
- Configurable thresholds

### 2. Input Validation

- Strict schema validation for every input
- Reject invalid input rather than only sanitizing it

### 3. Secrets Scan

- Search for hardcoded API keys
- Search for hardcoded tokens
- Confirm environment-variable usage

### 4. Dependency Audit

- Scan dependencies for known vulnerabilities
- Check for high and critical severity issues

### 5. Error Handling

Users must never see:

- Stack traces
- Raw database errors
- Internal implementation details

Instead:

- Generic error messages are shown client-side.
- Detailed errors are logged server-side.

### 6. File Upload Safety

- Review upload validation
- Review storage isolation
- Ensure uploaded content cannot compromise the application

### Lovable Response

The security audit came back clean:

- No high/critical dependency vulnerabilities
- No hardcoded secrets
- Proof-submission URLs are schema-validated
- SSR error boundary returns generic error messages
- Detailed errors are logged server-side
- File-upload checks were not applicable because the application has no upload functionality

---

## 8. Challenge Day Page — `/day/12`

### Prompt

Build the Challenge Day page with the following requirements:

- Immersive header
- Day number
- Challenge title
- Live countdown synchronized with the application-wide midnight deadline logic
- Overview / Requirements / Resources tabs
- Existing Framer Motion shared `layoutId` pill transition
- Proof-of-work submission form
- GitHub repository/commit URL
- LinkedIn post URL
- Instant validation
- Success checkmark animation
- Streak-increment animation after submission
- Reuse the existing `BottomNav` component
- Pull all challenge content from the existing mock data
- Do not hardcode challenge content

### Lovable Response

Lovable delivered:

- `app/day/12/page.js`
- Direct data reading from the existing `challenges` array
- Direct data reading from the existing student object
- Working tabs
- Form validation
- Proof submission
- Countdown
- Navigation
- Animations

The page was verified with no console errors.

---

## 9. Bug Fixes & Final Verification

### Fixes Applied

- Fixed a theme hydration mismatch.
- Fixed an invisible active-tab bug on the Challenge Day page.
- Verified responsive behavior at 390px.
- Verified clean rendering on:
  - `/`
  - `/dashboard`
  - `/day/12`
- Verified working dark/light mode toggle.
- Verified correct 404 behavior for an invalid day.
- Verified no console errors.
- Verified no horizontal scrolling.

### Final Polish Commits

The final polish commits pushed to the project were:

- `Update site info for publish`
- `Polish ABTalks UI`
- `Polish dashboard and countdown UI`
- `Polish streak matrix and countdown`

---

## Final Project Status

The ABTalkS redesign was developed through iterative Lovable prompts covering:

1. Initial architecture and product specification
2. UI/UX design system
3. Landing page and dashboard refinement
4. Data consistency and dynamic state handling
5. Security hardening
6. Challenge Day functionality
7. Responsive and accessibility-oriented verification
8. Final bug fixing and visual polish

The final build preserves the intended **60-day coding challenge experience** while providing a polished, mobile-first interface with consistent data-driven states, interactive challenge tracking, proof-of-work submission, animations, and security-conscious frontend practices.
