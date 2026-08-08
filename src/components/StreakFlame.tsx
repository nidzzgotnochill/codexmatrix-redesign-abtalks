import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakFlame({
  streak,
  size = "sm",
  className,
}: {
  streak: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const alive = streak > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-semibold shadow-sm",
        size === "sm" ? "px-2.5 py-1.5 text-[10px]" : "px-3 py-1.75 text-[11px]",
        alive
          ? "border-primary/25 bg-primary/10 text-primary"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <Flame
        aria-hidden
        className={cn(size === "sm" ? "size-3.5" : "size-4", alive && "animate-flame fill-current")}
      />
      <span className="font-mono font-bold tabular-nums">{streak}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
        {streak === 1 ? "day" : "days"}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">streak</span>
    </span>
  );
}