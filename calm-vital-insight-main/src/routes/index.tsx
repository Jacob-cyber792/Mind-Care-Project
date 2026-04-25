import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard, SectionCard, ProgressBar, Pill } from "@/components/cards";
import {
  Heart,
  Footprints,
  Moon,
  Flame,
  Droplets,
  Zap,
  TrendingUp,
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Wind,
  Leaf,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Mind Care" },
      {
        name: "description",
        content:
          "Today's overview from Mind Care: mental wellbeing first, plus heart rate, steps, sleep and personalized insights.",
      },
      { property: "og:title", content: "Dashboard — Mind Care" },
      {
        property: "og:description",
        content: "Your mind and body, in one calm place.",
      },
    ],
  }),
  component: DashboardPage,
});

const heartData = Array.from({ length: 24 }).map((_, i) => ({
  t: `${i}:00`,
  bpm: 60 + Math.round(15 * Math.sin(i / 2.5) + Math.random() * 8),
}));

const activityData = [
  { day: "Mon", steps: 8420, cal: 420 },
  { day: "Tue", steps: 10120, cal: 510 },
  { day: "Wed", steps: 6340, cal: 320 },
  { day: "Thu", steps: 11240, cal: 560 },
  { day: "Fri", steps: 9580, cal: 478 },
  { day: "Sat", steps: 13420, cal: 680 },
  { day: "Sun", steps: 7820, cal: 390 },
];

const sleepData = [
  { day: "M", deep: 1.4, rem: 1.6, light: 4.2 },
  { day: "T", deep: 1.2, rem: 1.4, light: 4.6 },
  { day: "W", deep: 1.8, rem: 1.7, light: 4.0 },
  { day: "T", deep: 1.6, rem: 2.0, light: 4.4 },
  { day: "F", deep: 1.3, rem: 1.5, light: 3.8 },
  { day: "S", deep: 2.1, rem: 2.2, light: 4.5 },
  { day: "S", deep: 1.9, rem: 1.8, light: 4.7 },
];

function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}

function DashboardContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Good morning, Alex</p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Take care of your mind, today.
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Mind Care puts your mental wellbeing first. Start with a check-in below — your body
            metrics are tracking well.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Pill tone="success">
            <CheckCircle2 className="h-3 w-3" /> All vitals normal
          </Pill>
          <Pill tone="primary">Synced 2m ago</Pill>
        </div>
      </div>

      {/* Mental Health priority hero — most prominent block on the dashboard */}
      <MentalHealthHero />

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Heart Rate"
          value="72"
          unit="bpm"
          trend={{ dir: "flat", text: "Resting steady" }}
          icon={<Heart className="h-5 w-5" />}
          accent="coral"
        />
        <StatCard
          label="Steps Today"
          value="8,420"
          unit="/ 10k"
          trend={{ dir: "up", text: "+12% vs avg" }}
          icon={<Footprints className="h-5 w-5" />}
          accent="primary"
        >
          <ProgressBar value={8420} max={10000} color="primary" />
        </StatCard>
        <StatCard
          label="Sleep"
          value="7h 24m"
          trend={{ dir: "up", text: "Quality 86%" }}
          icon={<Moon className="h-5 w-5" />}
          accent="lavender"
        />
        <StatCard
          label="Calories"
          value="1,840"
          unit="kcal"
          trend={{ dir: "down", text: "-8% vs goal" }}
          icon={<Flame className="h-5 w-5" />}
          accent="sunny"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Heart rate trend */}
        <SectionCard
          title="Heart Rate"
          subtitle="Last 24 hours · resting avg 68 bpm"
          className="lg:col-span-2"
          action={
            <div className="flex gap-1.5 text-xs font-medium">
              <button className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                24h
              </button>
              <button className="rounded-full bg-muted px-3 py-1 text-muted-foreground">7d</button>
              <button className="rounded-full bg-muted px-3 py-1 text-muted-foreground">30d</button>
            </div>
          }
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--coral)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--coral)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="t"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[40, 110]}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bpm"
                  stroke="var(--coral)"
                  strokeWidth={2.5}
                  fill="url(#hr)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Today's rings */}
        <SectionCard title="Today's Goals" subtitle="Move · Exercise · Stand">
          <div className="flex items-center justify-center py-2">
            <RingStack />
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <GoalRow color="bg-gradient-coral" label="Move" value="420 / 600 kcal" pct={70} />
            <GoalRow color="bg-gradient-mint" label="Exercise" value="38 / 45 min" pct={84} />
            <GoalRow color="bg-gradient-primary" label="Stand" value="9 / 12 hr" pct={75} />
          </div>
        </SectionCard>

        {/* Activity */}
        <SectionCard
          title="Weekly Activity"
          subtitle="Steps and active calories"
          className="lg:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ left: -15, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="steps" fill="var(--primary)" radius={[8, 8, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Sleep */}
        <SectionCard title="Sleep Stages" subtitle="Last 7 nights">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData} margin={{ left: -15, right: 0, top: 4 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="deep" stackId="s" fill="var(--lavender)" radius={[0, 0, 6, 6]} />
                <Bar dataKey="rem" stackId="s" fill="var(--primary)" />
                <Bar dataKey="light" stackId="s" fill="var(--mint)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <Legend dot="bg-lavender" label="Deep" />
            <Legend dot="bg-primary" label="REM" />
            <Legend dot="bg-mint" label="Light" />
          </div>
        </SectionCard>

        {/* Insights teaser */}
        <SectionCard
          title="Today's Insights"
          subtitle="Personalized for you"
          className="lg:col-span-2"
          action={
            <Link
              to="/insights"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <InsightItem
              icon={<TrendingUp className="h-4 w-4" />}
              tone="success"
              title="Your VO₂ max improved"
              body="Up 4% this month — your cardio fitness is in the top 25% for your age."
            />
            <InsightItem
              icon={<Droplets className="h-4 w-4" />}
              tone="warning"
              title="Hydration low"
              body="You're 600ml below daily target. A glass of water now will help."
            />
            <InsightItem
              icon={<Brain className="h-4 w-4" />}
              tone="lavender"
              title="Stress trending up"
              body="HRV suggests elevated stress. Try a 5-min breathing session."
            />
            <InsightItem
              icon={<Zap className="h-4 w-4" />}
              tone="primary"
              title="Recovery: 82%"
              body="You're well-recovered. A moderate workout is recommended today."
            />
          </div>
        </SectionCard>

        {/* Quick mind */}
        <SectionCard title="Mind Check-in" subtitle="How are you feeling?">
          <div className="flex justify-between gap-2 py-2">
            {[
              { e: "😄", l: "Great" },
              { e: "🙂", l: "Good" },
              { e: "😐", l: "Okay" },
              { e: "😔", l: "Low" },
              { e: "😣", l: "Bad" },
            ].map((m) => (
              <button
                key={m.l}
                className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-border bg-card px-2 py-3 text-xs font-medium text-foreground/70 transition hover:border-primary hover:bg-primary-soft hover:text-primary"
              >
                <span className="text-2xl">{m.e}</span>
                {m.l}
              </button>
            ))}
          </div>
          <Link
            to="/mental-health"
            className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-mind px-4 py-3 text-sm font-semibold text-foreground hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-lavender" />
              Talk to Mind Coach
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionCard>
      </div>
    </div>
  );
}

function GoalRow({ color, label, value, pct }: { color: string; label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {label}
    </div>
  );
}

function InsightItem({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: "success" | "warning" | "primary" | "lavender";
  title: string;
  body: string;
}) {
  const toneMap = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    primary: "bg-primary-soft text-primary",
    lavender: "bg-lavender/15 text-lavender",
  } as const;
  return (
    <div className="flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 transition hover:bg-muted/50">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneMap[tone]}`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function RingStack() {
  const rings = [
    { r: 70, pct: 70, color: "var(--coral)" },
    { r: 56, pct: 84, color: "var(--mint)" },
    { r: 42, pct: 75, color: "var(--primary)" },
  ];
  return (
    <svg viewBox="0 0 180 180" className="h-44 w-44">
      {rings.map((r, i) => {
        const c = 2 * Math.PI * r.r;
        const off = c * (1 - r.pct / 100);
        return (
          <g key={i} transform="rotate(-90 90 90)">
            <circle
              cx="90"
              cy="90"
              r={r.r}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="11"
              opacity="0.5"
            />
            <circle
              cx="90"
              cy="90"
              r={r.r}
              fill="none"
              stroke={r.color}
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={off}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </g>
        );
      })}
      <text
        x="90"
        y="92"
        textAnchor="middle"
        className="fill-foreground font-display"
        fontSize="22"
        fontWeight="700"
      >
        76%
      </text>
      <text
        x="90"
        y="110"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="10"
      >
        of daily goals
      </text>
    </svg>
  );
}

function MentalHealthHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-mind p-6 shadow-card sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 hidden h-56 w-56 sm:block">
        <div className="absolute inset-0 animate-pulse-ring rounded-full bg-lavender/30" />
        <div className="absolute inset-6 animate-breathe rounded-full bg-gradient-lavender opacity-80 blur-sm" />
        <div className="absolute inset-14 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-md">
          <Brain className="h-10 w-10 text-lavender" strokeWidth={2.2} />
        </div>
      </div>

      <div className="relative max-w-2xl">
        <Pill tone="lavender" className="bg-card/70">
          <Sparkles className="h-3 w-3" /> Featured · Mental wellbeing
        </Pill>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Your mind comes first.
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
          A 2-minute check-in, a guided breath, or a private chat with your Mind Coach — pick what
          feels right today. Everything stays on your device.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/mental-health"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            <Brain className="h-4 w-4" /> Open Mind Coach
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/wellness"
            className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2.5 text-sm font-semibold text-foreground ring-1 ring-border transition hover:bg-card"
          >
            <Leaf className="h-4 w-4 text-mint" /> Wellness Library
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-card/60 px-3 py-2 text-xs font-medium text-muted-foreground ring-1 ring-border">
            <Lock className="h-3 w-3" /> Private · works offline
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground/70">Quick check-in:</span>
          <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
            {["😄", "🙂", "😐", "😔", "😣"].map((e) => (
              <Link
                key={e}
                to="/mental-health"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card/80 text-lg shadow-soft ring-1 ring-border transition hover:scale-110 hover:bg-card"
                aria-label={`Log mood ${e}`}
              >
                {e}
              </Link>
            ))}
          </div>
          <Link
            to="/mental-health"
            className="hidden items-center gap-1 text-xs font-semibold text-primary hover:underline sm:inline-flex"
          >
            <Wind className="h-3.5 w-3.5" /> Breathe
          </Link>
        </div>
      </div>
    </section>
  );
}
