import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionCard, Pill } from "@/components/cards";
import {
  AlertTriangle,
  TrendingUp,
  Heart,
  Moon,
  Droplets,
  Activity,
  Brain,
  Sparkles,
  CheckCircle2,
  Apple,
  Wind,
} from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Mind Care" },
      {
        name: "description",
        content:
          "Personalized health insights, early warnings and lifestyle recommendations powered by your biometric data.",
      },
      { property: "og:title", content: "Insights — Mind Care" },
      {
        property: "og:description",
        content: "Smart, preventive guidance tailored to your body's signals.",
      },
    ],
  }),
  component: InsightsPage,
});

const alerts = [
  {
    severity: "warning",
    icon: AlertTriangle,
    title: "Elevated resting heart rate",
    detail:
      "Your resting HR averaged 78 bpm last night — 9 bpm above your baseline. This often signals incomplete recovery, dehydration or stress.",
    actions: ["Hydrate", "Sleep earlier", "Reduce caffeine"],
  },
  {
    severity: "info",
    icon: Moon,
    title: "Sleep consistency improving",
    detail:
      "You've gone to bed within a 30-minute window for 5 nights in a row — your body's circadian rhythm is stabilizing.",
    actions: ["Keep it up"],
  },
  {
    severity: "success",
    icon: TrendingUp,
    title: "Cardio fitness milestone",
    detail:
      "Your VO₂ max reached 48 ml/kg/min — placing you in the top 25% for your age and gender.",
    actions: ["View report"],
  },
];

const recs = [
  {
    icon: Activity,
    color: "bg-gradient-primary",
    title: "30-min Zone 2 cardio",
    body: "Easy-paced jog or cycle. Builds aerobic base and aids recovery.",
    time: "Best at 6:30 PM",
  },
  {
    icon: Wind,
    color: "bg-gradient-lavender",
    title: "Box-breathing session",
    body: "5 minutes of 4-4-4-4 breath to lower your evening HRV stress signal.",
    time: "Anytime today",
  },
  {
    icon: Apple,
    color: "bg-gradient-mint",
    title: "Add iron-rich foods",
    body: "Spinach, lentils, lean beef. Your ferritin trend has been declining.",
    time: "This week",
  },
  {
    icon: Moon,
    color: "bg-gradient-coral",
    title: "Wind-down at 10:30 PM",
    body: "Dim lights, no screens. Aim for 7h45m to fully recover for tomorrow.",
    time: "Tonight",
  },
];

function InsightsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-primary">Insights</p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            What your data is telling you
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Mind Care analyzes your biometric trends to surface early warnings, celebrate
            progress, and recommend gentle next steps.
          </p>
        </header>

        {/* Alerts */}
        <SectionCard
          title="Early warnings & highlights"
          subtitle="Updated continuously from your biometric streams"
        >
          <div className="space-y-3">
            {alerts.map((a) => {
              const Icon = a.icon;
              const tone =
                a.severity === "warning"
                  ? {
                      bar: "bg-warning",
                      iconBg: "bg-warning/15 text-warning-foreground",
                      pill: "warning" as const,
                      label: "Watch",
                    }
                  : a.severity === "success"
                  ? {
                      bar: "bg-success",
                      iconBg: "bg-success/15 text-success",
                      pill: "success" as const,
                      label: "Great",
                    }
                  : {
                      bar: "bg-primary",
                      iconBg: "bg-primary-soft text-primary",
                      pill: "primary" as const,
                      label: "Info",
                    };
              return (
                <article
                  key={a.title}
                  className="relative flex gap-4 overflow-hidden rounded-2xl border border-border/60 bg-background/50 p-4 sm:p-5"
                >
                  <span className={`absolute inset-y-0 left-0 w-1 ${tone.bar}`} />
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{a.title}</h3>
                      <Pill tone={tone.pill}>{tone.label}</Pill>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.actions.map((act) => (
                        <button
                          key={act}
                          className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground/80 ring-1 ring-border transition hover:bg-primary hover:text-primary-foreground hover:ring-primary"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionCard>

        {/* Weekly summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryStat
            icon={<Heart className="h-5 w-5" />}
            label="Cardio"
            value="A-"
            note="VO₂ max ↑ 4%"
            color="bg-gradient-coral"
          />
          <SummaryStat
            icon={<Moon className="h-5 w-5" />}
            label="Sleep"
            value="B+"
            note="Avg 7h 18m"
            color="bg-gradient-lavender"
          />
          <SummaryStat
            icon={<Brain className="h-5 w-5" />}
            label="Stress"
            value="B"
            note="HRV variable"
            color="bg-gradient-mind"
          />
        </div>

        {/* Recommendations */}
        <SectionCard
          title="Today's recommendations"
          subtitle="Small steps, big impact"
          action={
            <Pill tone="primary">
              <Sparkles className="h-3 w-3" /> AI curated
            </Pill>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {recs.map((r) => {
              const Icon = r.icon;
              return (
                <article
                  key={r.title}
                  className="group rounded-2xl border border-border/60 bg-background/50 p-5 transition hover:bg-card hover:shadow-soft"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-soft ${r.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Pill tone="neutral">{r.time}</Pill>
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      Add to plan <CheckCircle2 className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionCard>

        {/* Hydration mini */}
        <SectionCard title="Daily wellness pulse" subtitle="A snapshot of how today is going">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <MiniMetric icon={<Droplets className="h-4 w-4" />} label="Hydration" value="62%" tone="warning" />
            <MiniMetric icon={<Activity className="h-4 w-4" />} label="Active mins" value="38" tone="success" />
            <MiniMetric icon={<Heart className="h-4 w-4" />} label="HRV" value="48 ms" tone="primary" />
            <MiniMetric icon={<Brain className="h-4 w-4" />} label="Mood" value="Calm" tone="lavender" />
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function SummaryStat({
  icon,
  label,
  value,
  note,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-soft ${color}`}
        >
          {icon}
        </div>
        <span className="font-display text-3xl font-bold text-foreground">{value}</span>
      </div>
      <p className="mt-3 font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function MiniMetric({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "warning" | "primary" | "lavender";
}) {
  const toneMap = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    primary: "bg-primary-soft text-primary",
    lavender: "bg-lavender/15 text-lavender",
  } as const;
  return (
    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
      <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${toneMap[tone]}`}>
        {icon}
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}
