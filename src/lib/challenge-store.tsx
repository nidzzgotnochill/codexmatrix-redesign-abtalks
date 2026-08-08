import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { PRESETS, TOTAL_DAYS } from "./mock-data";
import type { ChallengeDay, PresetKey, UserProfile } from "./types";

interface ChallengeContextValue {
  preset: PresetKey;
  setPreset: (p: PresetKey) => void;
  profile: UserProfile;
  getDay: (id: number) => ChallengeDay | undefined;
  submitProof: (id: number, githubUrl: string, linkedinUrl: string) => void;
  completedCount: number;
  missedCount: number;
  totalDays: number;
}

const ChallengeContext = createContext<ChallengeContextValue | null>(null);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [preset, setPresetState] = useState<PresetKey>("activeStreak");
  const [profiles, setProfiles] = useState<Record<PresetKey, UserProfile>>(() => ({
    activeStreak: PRESETS.activeStreak.profile,
    firstDay: PRESETS.firstDay.profile,
    brokenStreak: PRESETS.brokenStreak.profile,
    emptyProfile: PRESETS.emptyProfile.profile,
  }));

  const profile = profiles[preset];

  const submitProof = useCallback(
    (id: number, githubUrl: string, linkedinUrl: string) => {
      setProfiles((prev) => {
        const current = prev[preset];
        const days = current.days.map((d) =>
          d.id === id
            ? {
                ...d,
                status: "completed" as const,
                githubUrl,
                linkedinUrl,
                completedAt: new Date().toISOString(),
              }
            : d,
        );
        const wasToday = current.days.find((d) => d.id === id)?.status !== "completed";
        const currentStreak = wasToday ? current.currentStreak + 1 : current.currentStreak;
        return {
          ...prev,
          [preset]: {
            ...current,
            days,
            currentStreak,
            longestStreak: Math.max(current.longestStreak, currentStreak),
            consistencyScore: Math.round(
              (days.filter((d) => d.status === "completed").length / Math.max(current.challengeDay, 1)) * 100,
            ),
          },
        };
      });
    },
    [preset],
  );

  const value = useMemo<ChallengeContextValue>(
    () => ({
      preset,
      setPreset: setPresetState,
      profile,
      getDay: (id: number) => profile.days.find((d) => d.id === id),
      submitProof,
      completedCount: profile.days.filter((d) => d.status === "completed").length,
      missedCount: profile.days.filter((d) => d.status === "missed").length,
      totalDays: TOTAL_DAYS,
    }),
    [preset, profile, submitProof],
  );

  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>;
}

export function useChallenge() {
  const ctx = useContext(ChallengeContext);
  if (!ctx) throw new Error("useChallenge must be used inside ChallengeProvider");
  return ctx;
}