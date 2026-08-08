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
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-semibold",
        size === "sm" ? "text-xs" : "text-sm",
        alive
          ? "border-primary/25 bg-primary/10 text-primary"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <Flame
        aria-hidden
        className={cn(size === "sm" ? "size-4" : "size-5", alive && "animate-flame fill-current")}
      />
      <span className="font-mono tabular-nums">{streak}</span>
      <span>day{streak === 1 ? "" : "s"}</span>
    </span>
  );
}