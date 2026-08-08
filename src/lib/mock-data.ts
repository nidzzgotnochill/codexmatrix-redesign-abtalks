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

const BASE = {
  name: "Nidhi Bhat",
  initials: "NB",
  college: "RV College of Engineering",
  branch: "CSE, 3rd Year",
  track: "Full-stack",
};

export const activeStreakUser: UserProfile = {
  ...BASE,
  currentStreak: 11,
  longestStreak: 11,
  challengeDay: TODAY,
  consistencyScore: 92,
  days: buildDays(TODAY),
};

export const brokenStreakUser: UserProfile = {
  ...BASE,
  currentStreak: 0,
  longestStreak: 10,
  challengeDay: TODAY,
  consistencyScore: 78,
  days: buildDays(TODAY, [TODAY - 1]),
};

export const firstDayUser: UserProfile = {
  ...BASE,
  currentStreak: 0,
  longestStreak: 0,
  challengeDay: 1,
  consistencyScore: 0,
  days: buildDays(1),
};

export const emptyProfileUser: UserProfile = {
  name: "New student",
  initials: "?",
  college: "",
  branch: "",
  track: "",
  currentStreak: 0,
  longestStreak: 0,
  challengeDay: 1,
  consistencyScore: 0,
  days: buildDays(1),
};

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
    a: "Yes. A day runs until 4:00 AM IST, so a late-night commit still lands on the right day. Most of our students ship between 11 PM and 2 AM.",
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