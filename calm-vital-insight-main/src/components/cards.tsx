import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  unit,
  trend,
  icon,
  accent = "primary",
  children,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  trend?: { dir: "up" | "down" | "flat"; text: string };
  icon: ReactNode;
  accent?: "primary" | "coral" | "mint" | "lavender" | "sunny";
  children?: ReactNode;
  className?: string;
}) {
  const accentMap = {
    primary: "bg-gradient-primary text-primary-foreground",
    coral: "bg-gradient-coral text-coral-foreground",
    mint: "bg-gradient-mint text-mint-foreground",
    lavender: "bg-gradient-lavender text-lavender-foreground",
    sunny: "bg-sunny text-sunny-foreground",
  } as const;

  const trendColor =
    trend?.dir === "up"
      ? "text-success"
      : trend?.dir === "down"
      ? "text-coral"
      : "text-muted-foreground";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition hover:shadow-card animate-float-up",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <p className={cn("mt-1 text-xs font-medium", trendColor)}>
              {trend.dir === "up" ? "▲" : trend.dir === "down" ? "▼" : "▬"} {trend.text}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft",
            accentMap[accent],
          )}
        >
          {icon}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6",
        className,
      )}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = "primary",
  className,
}: {
  value: number;
  max?: number;
  color?: "primary" | "coral" | "mint" | "lavender" | "sunny";
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colorMap = {
    primary: "bg-gradient-primary",
    coral: "bg-gradient-coral",
    mint: "bg-gradient-mint",
    lavender: "bg-gradient-lavender",
    sunny: "bg-sunny",
  } as const;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", colorMap[color])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "coral" | "primary" | "lavender";
  className?: string;
}) {
  const tones = {
    neutral: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    coral: "bg-coral/15 text-coral",
    primary: "bg-primary-soft text-primary",
    lavender: "bg-lavender/15 text-lavender",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
