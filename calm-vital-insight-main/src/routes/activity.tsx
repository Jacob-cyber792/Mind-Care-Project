import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionCard, Pill, ProgressBar } from "@/components/cards";
import {
  Footprints,
  Bike,
  Dumbbell,
  Waves,
  PersonStanding,
  Play,
  Flame,
  Clock,
  Plus,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity — Mind Care" },
      {
        name: "description",
        content:
          "Track your workouts, follow personalized exercise plans and watch your fitness progress over time.",
      },
      { property: "og:title", content: "Activity — Mind Care" },
      {
        property: "og:description",
        content: "Personalized exercise plans built around your recovery and goals.",
      },
    ],
  }),
  component: ActivityPage,
});

const fitness = Array.from({ length: 30 }).map((_, i) => ({
  d: i + 1,
  vo2: 44 + Math.round(Math.sin(i / 4) * 2 + i / 8),
}));

const workouts = [
  { day: "Mon", title: "Zone 2 Run", dur: "30 min", kcal: 320, icon: Footprints, color: "bg-gradient-primary" },
  { day: "Tue", title: "Strength · Push", dur: "45 min", kcal: 280, icon: Dumbbell, color: "bg-gradient-coral" },
  { day: "Wed", title: "Recovery Walk", dur: "25 min", kcal: 140, icon: PersonStanding, color: "bg-gradient-mint" },
  { day: "Thu", title: "Cycling Intervals", dur: "40 min", kcal: 410, icon: Bike, color: "bg-gradient-lavender" },
  { day: "Fri", title: "Strength · Pull", dur: "45 min", kcal: 290, icon: Dumbbell, color: "bg-gradient-coral" },
  { day: "Sat", title: "Long Swim", dur: "50 min", kcal: 460, icon: Waves, color: "bg-gradient-primary" },
  { day: "Sun", title: "Yoga & Stretch", dur: "30 min", kcal: 120, icon: PersonStanding, color: "bg-gradient-mint" },
];

function ActivityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Activity</p>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Move with purpose
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Your weekly plan adapts to your recovery and goals — gentle when you need it, bold
              when you're ready.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            <Play className="h-4 w-4" /> Start workout
          </button>
        </header>

        {/* Plan grid */}
        <SectionCard
          title="This week's plan"
          subtitle="Tailored to your recovery score and last week's load"
          action={
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              <Plus className="h-3 w-3" /> Add workout
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
            {workouts.map((w) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.day}
                  className="group rounded-2xl border border-border/60 bg-background/50 p-4 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {w.day}
                  </p>
                  <div
                    className={`mt-2 flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow-soft ${w.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{w.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Pill tone="neutral">
                      <Clock className="h-3 w-3" /> {w.dur}
                    </Pill>
                    <Pill tone="coral">
                      <Flame className="h-3 w-3" /> {w.kcal}
                    </Pill>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionCard>

        {/* Goals + fitness */}
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard title="Weekly goals" subtitle="You're crushing it">
            <div className="space-y-5">
              <Goal label="Active minutes" value={210} max={300} unit="min" color="primary" />
              <Goal label="Workouts" value={5} max={6} unit="sessions" color="coral" />
              <Goal label="Calories burned" value={2120} max={3000} unit="kcal" color="mint" />
              <Goal label="Distance" value={28.4} max={40} unit="km" color="lavender" />
            </div>
          </SectionCard>

          <SectionCard
            title="Fitness trend"
            subtitle="VO₂ max · last 30 days"
            className="lg:col-span-2"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fitness} margin={{ left: -15, right: 8, top: 8 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="d"
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
                    domain={[40, 52]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="vo2"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, fill: "var(--primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}

function Goal({
  label,
  value,
  max,
  unit,
  color,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: "primary" | "coral" | "mint" | "lavender";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{value}</span> / {max} {unit}
        </span>
      </div>
      <ProgressBar value={value} max={max} color={color} />
    </div>
  );
}
