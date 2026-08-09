import type { ChallengeDay, DayStatus, PresetKey, UserProfile } from "./types";

export const TOTAL_DAYS = 60;
export const TODAY = 12;

const TASKS: { title: string; track: string; summary: string }[] = [
  { title: "Setup & First Commit", track: "Foundations", summary: "Initialise your repo, add a README, and push your first meaningful commit." },
  { title: "Arrays & Two Pointers", track: "DSA", summary: "Solve three two-pointer problems and write up your approach." },
  { title: "Hashing Patterns", track: "DSA", summary: "Use maps and sets to turn O(n²) scans into O(n) passes." },
  { title: "Recursion Foundations", track: "DSA", summary: "Break a problem into base case and recursive step, then trace it." },
  { title: "Build: Responsive Card UI", track: "Frontend", summary: "Ship a mobile-first component with real states, not just a happy path." },
  { title: "Stacks & Queues", track: "DSA", summary: "Implement both from scratch, then use them on a real problem." },
  { title: "Linked List Operations", track: "DSA", summary: "Reverse, detect cycles, and merge — no library helpers." },
  { title: "Binary Search Mastery", track: "DSA", summary: "Search on answer space, not just sorted arrays." },
  { title: "Build: REST Client", track: "Backend", summary: "Consume a public API with retries, loading and error states." },
  { title: "Trees & Traversals", track: "DSA", summary: "DFS and BFS on a binary tree, iteratively and recursively." },
  { title: "Dynamic Programming I", track: "DSA", summary: "Memoise a recursive solution and measure the difference." },
  { title: "Build: Auth API", track: "Backend", summary: "Ship a minimal auth API: signup, login and a protected /me route." },
];

const REQUIREMENTS: Record<number, string[]> = {
  12: [
    "Hash passwords with bcrypt or argon2 — never store plaintext.",
    "Issue a signed JWT on login with a short expiry.",
    "Protect /me with middleware that verifies the token.",
    "Write at least 3 tests: signup, login, and a rejected request.",
    "Push a clean commit and post your learning on LinkedIn with #ABTalks60.",
  ],
};

const DEFAULT_REQUIREMENTS = [
  "Build the task end to end — no half-finished screens.",
  "Commit with a clear message describing what you shipped.",
  "Write 3 lines on what you learned and post it on LinkedIn with #ABTalks60.",
];

const RESOURCES = [
  { label: "Reference repo structure", url: "https://github.com/topics/rest-api" },
  { label: "JWT best practices", url: "https://github.com/topics/jwt" },
  { label: "Writing a good commit message", url: "https://github.com/topics/git" },
];

function makeDay(id: number, status: DayStatus): ChallengeDay {
  const task = TASKS[(id - 1) % TASKS.length]!;
  return {
    id,
    status,
    title: task.title,
    track: task.track,
    summary: task.summary,
    requirements: REQUIREMENTS[id] ?? DEFAULT_REQUIREMENTS,
    resources: RESOURCES,
    ...(status === "completed"
      ? {
          githubUrl: `https://github.com/nidhi-bhat/abtalks-60/commit/day-${id}`,
          linkedinUrl: `https://linkedin.com/posts/nidhi-bhat-day-${id}`,
          completedAt: `2026-06-${String(id).padStart(2, "0")}T21:40:00.000Z`,
        }
      : {}),
  };
}

function buildDays(today: number, missed: number[] = []): ChallengeDay[] {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const id = i + 1;
    if (id < today) return makeDay(id, missed.includes(id) ? "missed" : "completed");
    if (id === today) return makeDay(id, "today");
    return makeDay(id, "upcoming");
  });
}

/** All progress stats are derived from the day list so the UI can never contradict itself. */
function deriveStats(days: ChallengeDay[], challengeDay: number) {
  const completed = days.filter((d) => d.status === "completed").length;

  let currentStreak = 0;
  for (let id = challengeDay - 1; id >= 1; id--) {
    if (days[id - 1]?.status === "completed") currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let run = 0;
  for (const d of days) {
    if (d.id >= challengeDay) break;
    if (d.status === "completed") {
      run++;
      longestStreak = Math.max(longestStreak, run);
    } else run = 0;
  }

  const elapsed = Math.max(challengeDay - 1, 0);
  return {
    currentStreak,
    longestStreak,
    consistencyScore: elapsed ? Math.round((completed / elapsed) * 100) : 0,
  };
}

const BASE = {
  name: "Nidhi Bhat",
  initials: "NB",
  college: "RV College of Engineering",
  branch: "CSE, 3rd Year",
  track: "Full-stack",
};

function makeProfile(base: Omit<UserProfile, "currentStreak" | "longestStreak" | "consistencyScore" | "days" | "challengeDay">, challengeDay: number, missed: number[] = []): UserProfile {
  const days = buildDays(challengeDay, missed);
  return { ...base, challengeDay, days, ...deriveStats(days, challengeDay) };
}

/** Realistic history: days 1–7 completed, day 8 missed, days 9–11 completed, day 12 today. */
export const activeStreakUser: UserProfile = makeProfile(BASE, TODAY, [8]);

export const brokenStreakUser: UserProfile = makeProfile(BASE, TODAY, [8, TODAY - 1]);

export const firstDayUser: UserProfile = makeProfile(BASE, 1);

export const emptyProfileUser: UserProfile = makeProfile(
  { name: "New student", initials: "?", college: "", branch: "", track: "" },
  1,
);

export const PRESETS: Record<PresetKey, { label: string; profile: UserProfile }> = {
  activeStreak: { label: "On streak", profile: activeStreakUser },
  firstDay: { label: "Day 1", profile: firstDayUser },
  brokenStreak: { label: "Missed a day", profile: brokenStreakUser },
  emptyProfile: { label: "Empty profile", profile: emptyProfileUser },
};

export const trustColleges = [
  "VTU", "IIT Bombay", "NIT Trichy", "BITS Pilani", "IIIT Hyderabad",
  "VIT Vellore", "Anna University", "MIT Manipal", "PES University", "IIT Delhi",
];

export const recruiterQuotes = [
  { name: "Ananya R.", role: "SDE Recruiter, fintech", quote: "Students who finish this challenge show up interview-ready." },
  { name: "Karthik M.", role: "Engineering Manager", quote: "The GitHub history tells me more than a resume does." },
  { name: "Priya S.", role: "Campus Hiring Lead", quote: "60 days of consistency is the strongest signal we screen for." },
];

export const faqs = [
  {
    q: "I code at 2 AM after college. Does that count?",
    a: "Yes. A challenge day runs until local midnight, so a late-night commit still counts as long as you submit it before 12:00 AM. Most of our students ship between 9 PM and midnight.",
  },
  {
    q: "What if I miss a day?",
    a: "Your streak resets, but your progress does not. You keep every completed day, and one recovery day per month restores a single miss.",
  },
  {
    q: "Do I need to be good already?",
    a: "No. Day 1 is a README and a first commit. Tasks scale with the track you pick, so a first-year and a final-year both have a real day's work.",
  },
  {
    q: "Why post on LinkedIn?",
    a: "Public proof is what recruiters can actually find. The commit shows the work; the post shows you can explain it.",
  },
];