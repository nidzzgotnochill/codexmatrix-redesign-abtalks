export type DayStatus = "completed" | "missed" | "today" | "upcoming";

export interface ChallengeDay {
  id: number;
  status: DayStatus;
  title: string;
  track: string;
  summary: string;
  requirements: string[];
  resources: { label: string; url: string }[];
  githubUrl?: string;
  linkedinUrl?: string;
  completedAt?: string;
}

export interface UserProfile {
  name: string;
  initials: string;
  college: string;
  branch: string;
  track: string;
  currentStreak: number;
  longestStreak: number;
  challengeDay: number;
  consistencyScore: number;
  days: ChallengeDay[];
}

export type PresetKey = "activeStreak" | "firstDay" | "brokenStreak" | "emptyProfile";