import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

const STORAGE_KEY = "mc-splash-shown";

/**
 * SplashScreen
 * Shown on first app launch (per browser session). Animated Mind Care logo
 * with a gentle pulse, soft fade-in/out, and a smooth handoff to the app.
 */
export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show once per session for a non-intrusive feel
    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (shown) return;
    setMounted(true);
    sessionStorage.setItem(STORAGE_KEY, "1");

    const leaveTimer = window.setTimeout(() => setLeaving(true), 1900);
    const removeTimer = window.setTimeout(() => setMounted(false), 2500);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-mind transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft background bloom */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/25 blur-3xl animate-breathe" />
        <div className="absolute left-[20%] top-[30%] h-40 w-40 rounded-full bg-primary-soft blur-3xl animate-pulse-ring" />
        <div className="absolute right-[20%] bottom-[25%] h-40 w-40 rounded-full bg-mint/30 blur-3xl animate-pulse-ring [animation-delay:-1s]" />
      </div>

      <div className="relative flex flex-col items-center gap-5 animate-float-up">
        {/* Logo with concentric pulse rings */}
        <div className="relative">
          <span className="absolute inset-0 -m-6 animate-pulse-ring rounded-full bg-lavender/30" />
          <span className="absolute inset-0 -m-3 animate-pulse-ring rounded-full bg-primary/20 [animation-delay:-0.7s]" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow animate-breathe">
            <Brain className="h-12 w-12 text-primary-foreground" strokeWidth={2.2} />
          </div>
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Mind <span className="text-primary">Care</span>
          </h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Body · Mind · Balance
          </p>
        </div>

        {/* Progress shimmer */}
        <div className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-card/60">
          <div className="h-full w-1/2 animate-splash-bar rounded-full bg-gradient-primary" />
        </div>
      </div>
    </div>
  );
}
