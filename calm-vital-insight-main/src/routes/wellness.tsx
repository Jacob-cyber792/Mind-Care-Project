import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SectionCard, Pill } from "@/components/cards";
import {
  Wind,
  Heart,
  Brain,
  Sparkles,
  BookOpen,
  WifiOff,
  ShieldCheck,
  Leaf,
  Sunrise,
  CloudRain,
  Flame,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness Library — Mind Care" },
      {
        name: "description",
        content:
          "Offline-friendly mental wellness library: stress management, breathing techniques, mindfulness, emotional regulation and mental health education.",
      },
      { property: "og:title", content: "Wellness Library — Mind Care" },
      {
        property: "og:description",
        content:
          "Practical, offline mental wellness guidance — breathing, mindfulness, emotion regulation and education in one calm place.",
      },
    ],
  }),
  component: WellnessPage,
});

/* -------------------- OFFLINE CONTENT (bundled with the app) -------------------- */

const STRESS_TIPS = [
  {
    title: "Name what you feel",
    body: "Labelling an emotion (\"I notice anxiety\") activates the brain's regulation centers and softens its grip within minutes.",
  },
  {
    title: "The 2-minute rule",
    body: "If a worry can be addressed in under two minutes, do it now. Otherwise, write it down and schedule a time to return to it.",
  },
  {
    title: "Move for 5 minutes",
    body: "A short walk, stretching or shaking out your hands releases muscle tension and lowers cortisol almost immediately.",
  },
  {
    title: "Lengthen your exhale",
    body: "Make your exhale longer than your inhale (e.g. 4 in, 6 out). This signals safety to your nervous system.",
  },
];

const BREATHING_PRACTICES = [
  {
    name: "Box Breathing (4-4-4-4)",
    icon: Wind,
    color: "bg-gradient-primary",
    steps: [
      "Inhale through the nose for 4 counts",
      "Hold gently for 4 counts",
      "Exhale slowly for 4 counts",
      "Hold empty for 4 counts — repeat 4 cycles",
    ],
    benefit: "Calms anxiety, sharpens focus.",
  },
  {
    name: "4-7-8 Relaxing Breath",
    icon: Leaf,
    color: "bg-gradient-mint",
    steps: [
      "Inhale through the nose for 4",
      "Hold the breath for 7",
      "Exhale through the mouth for 8",
      "Repeat 3–4 cycles before sleep",
    ],
    benefit: "Eases the body into rest and sleep.",
  },
  {
    name: "Coherent Breathing (5-5)",
    icon: Sunrise,
    color: "bg-gradient-lavender",
    steps: [
      "Inhale gently for 5 seconds",
      "Exhale gently for 5 seconds",
      "Continue for 3–10 minutes",
      "Keep the breath light and even",
    ],
    benefit: "Balances heart rate variability and mood.",
  },
];

const EMOTION_TIPS = [
  {
    icon: Brain,
    title: "RAIN method",
    body: "Recognize the feeling · Allow it to be there · Investigate it with kindness · Nurture yourself in response.",
  },
  {
    icon: Heart,
    title: "Self-compassion break",
    body: "Place a hand on your chest and say: \"This is hard. Hard is part of being human. May I be kind to myself right now.\"",
  },
  {
    icon: CloudRain,
    title: "Riding the wave",
    body: "Strong emotions usually peak within 90 seconds. Notice the sensation, breathe slowly, and let it crest and pass.",
  },
  {
    icon: Flame,
    title: "Reframe, don't suppress",
    body: "Ask: \"What's another way to see this?\" Reframing reduces emotional intensity without denying your experience.",
  },
];

const MINDFULNESS = [
  {
    title: "5-4-3-2-1 Grounding",
    summary:
      "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. A 60-second reset for racing thoughts.",
  },
  {
    title: "Mindful sip",
    summary:
      "Hold your cup with both hands. Notice the warmth, the smell, the first taste. One mindful sip is a real meditation.",
  },
  {
    title: "Body scan",
    summary:
      "Starting from the toes, slowly move attention up the body. At each region, notice and let go of any tension.",
  },
  {
    title: "Three breaths",
    summary:
      "Three slow, deliberate breaths between tasks. Tiny pauses prevent stress from accumulating across the day.",
  },
];

const EDUCATION = [
  {
    q: "What is mental health?",
    a: "Mental health is your emotional, psychological and social wellbeing. It shapes how you think, feel, relate and cope. Like physical health, it sits on a spectrum and changes over time — caring for it is normal and lifelong.",
  },
  {
    q: "How is stress different from anxiety?",
    a: "Stress is a response to a clear external pressure and tends to ease when the pressure does. Anxiety is more persistent, often without an obvious trigger, and can show up as worry, restlessness or physical tension.",
  },
  {
    q: "What helps prevent burnout?",
    a: "Regular rest, clear boundaries, social connection, movement, and meaningful breaks. Notice early signs — cynicism, exhaustion, reduced effectiveness — and respond with smaller daily recovery, not just big vacations.",
  },
  {
    q: "When should I seek professional support?",
    a: "If symptoms last more than two weeks, interfere with daily life, or feel overwhelming, reach out to a qualified professional. Talking to someone is a strength, not a weakness.",
  },
  {
    q: "Does sleep really affect mood?",
    a: "Yes — sleep regulates the brain regions that process emotion. Even one night of poor sleep can amplify negative feelings the next day. A consistent wind-down is one of the highest-leverage habits for mental health.",
  },
];

/* ----------------------------------- PAGE ----------------------------------- */

function WellnessPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-mind p-6 shadow-soft sm:p-8">
          <div className="max-w-2xl">
            <Pill tone="lavender" className="bg-card/70">
              <WifiOff className="h-3 w-3" /> Available offline
            </Pill>
            <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Wellness Library
            </h1>
            <p className="mt-2 max-w-xl text-sm text-foreground/70 sm:text-base">
              A calm reference for the mind. Practical techniques, gentle exercises and clear
              education — bundled with Mind Care so you always have it, even without a connection.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="primary" className="bg-card/70">
                <ShieldCheck className="h-3 w-3" /> Evidence-informed
              </Pill>
              <Pill tone="success" className="bg-card/70">
                <Sparkles className="h-3 w-3" /> Stored on-device
              </Pill>
            </div>
          </div>
        </section>

        {/* Stress management */}
        <SectionCard
          title="Stress Management"
          subtitle="Quick, science-backed ways to soften pressure in the moment"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {STRESS_TIPS.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border/60 bg-background/50 p-4 transition hover:bg-card hover:shadow-soft"
              >
                <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        {/* Breathing & mindfulness */}
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard
            title="Breathing Techniques"
            subtitle="Step-by-step practices you can run anytime"
            className="lg:col-span-2"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {BREATHING_PRACTICES.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.name}
                    className="flex flex-col rounded-2xl border border-border/60 bg-background/50 p-5 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground shadow-soft",
                        p.color,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                      {p.name}
                    </h3>
                    <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {p.steps.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-bold text-primary">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 text-xs font-medium text-primary">{p.benefit}</p>
                  </article>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Mindfulness Moments" subtitle="Tiny practices, big effect">
            <ul className="space-y-3">
              {MINDFULNESS.map((m) => (
                <li
                  key={m.title}
                  className="rounded-2xl border border-border/60 bg-background/50 p-4 transition hover:bg-card"
                >
                  <p className="font-display text-sm font-semibold text-foreground">{m.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.summary}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* Emotional regulation */}
        <SectionCard
          title="Emotional Regulation"
          subtitle="Tools to meet difficult feelings with steadiness"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EMOTION_TIPS.map((e) => {
              const Icon = e.icon;
              return (
                <article
                  key={e.title}
                  className="rounded-2xl border border-border/60 bg-background/50 p-5 transition hover:bg-card hover:shadow-soft"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/15 text-lavender">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                </article>
              );
            })}
          </div>
        </SectionCard>

        {/* Education / FAQ */}
        <SectionCard
          title="Mental Health Education"
          subtitle="Clear, compassionate answers to common questions"
          action={
            <Pill tone="primary">
              <BookOpen className="h-3 w-3" /> Offline
            </Pill>
          }
        >
          <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-background/40">
            {EDUCATION.map((item, i) => (
              <FaqRow key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function FaqRow({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-card sm:px-5"
        aria-expanded={open}
      >
        <span className="font-display text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5 animate-float-up">
          {a}
        </div>
      )}
    </div>
  );
}
