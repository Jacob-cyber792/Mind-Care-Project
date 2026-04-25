import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Activity,
  Brain,
  User,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  Watch,
  Search,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SplashScreen } from "@/components/SplashScreen";

// Mental Health is intentionally listed first — it's the primary feature of Mind Care.
const navItems = [
  { to: "/mental-health", label: "Mental Health", icon: Brain, highlight: true },
  { to: "/wellness", label: "Wellness Library", icon: Leaf },
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/insights", label: "Insights", icon: Sparkles },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("mc-theme")) as
      | "light"
      | "dark"
      | null;
    const initial = saved ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("mc-theme", next);
  };
  return { theme, toggle };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-gradient-calm">
      <SplashScreen />
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl lg:flex">
        <SidebarContent currentPath={location.pathname} />
      </aside>

      {/* Sidebar — mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-72 bg-sidebar shadow-card transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent currentPath={location.pathname} />
        </aside>
      </div>

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden flex-1 md:flex">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search insights, workouts…"
                  className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                className="hidden h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground/80 hover:bg-muted sm:inline-flex"
                aria-label="Connected device"
              >
                <Watch className="h-4 w-4 text-primary" />
                <span>MindBand 4</span>
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-ring" />
              </button>
              <button
                type="button"
                onClick={toggle}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
              </button>
              <Link
                to="/profile"
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-soft"
                aria-label="Profile"
              >
                AM
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ currentPath }: { currentPath: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 px-6">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
          <Brain className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
          <span className="absolute -inset-1 rounded-xl ring-2 ring-primary/20 animate-pulse-ring" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-lg font-bold text-sidebar-foreground">Mind Care</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Body · Mind · Balance
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/"
              ? currentPath === "/"
              : currentPath === item.to || currentPath.startsWith(item.to + "/");
          const highlight = "highlight" in item && item.highlight;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                  : highlight
                    ? "bg-gradient-mind text-sidebar-foreground shadow-soft hover:opacity-90"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  active || highlight
                    ? "text-primary"
                    : "text-sidebar-foreground/60 group-hover:text-primary",
                )}
              />
              {item.label}
              {highlight && !active && (
                <span className="ml-auto rounded-full bg-primary-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                  Priority
                </span>
              )}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-mind p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/70">
            <Brain className="h-4 w-4 text-lavender" />
          </div>
          <p className="font-display text-sm font-semibold text-sidebar-foreground">Mind Coach</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/70">
          Private, on-device AI for mental wellness — anytime, offline.
        </p>
        <Link
          to="/mental-health"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-sidebar-foreground hover:bg-card/80"
        >
          Start a session
        </Link>
      </div>

      <button
        type="button"
        className="mx-3 mb-3 inline-flex items-center justify-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-xs font-semibold text-coral hover:bg-coral/20 lg:hidden"
      >
        <X className="h-3.5 w-3.5" />
        Close menu
      </button>
    </div>
  );
}
