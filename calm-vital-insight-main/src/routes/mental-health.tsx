import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionCard, Pill } from "@/components/cards";
import {
  Brain,
  Send,
  Sparkles,
  Wind,
  Heart,
  Phone,
  ShieldCheck,
  WifiOff,
  BookOpen,
  Headphones,
  Sun,
  Cloud,
  CloudRain,
  Zap,
  Lock,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_CONFIG,
  MENTAL_HEALTH_SYSTEM_PROMPT,
  loadConfig,
  pingLocalLLM,
  saveConfig,
  streamChat,
  type ChatMessage,
  type LocalLLMConfig,
} from "@/lib/local-llm";

export const Route = createFileRoute("/mental-health")({
  head: () => ({
    meta: [
      { title: "Mental Health — Mind Care" },
      {
        name: "description",
        content:
          "A private, on-device AI companion for your mental wellbeing. Mood check-ins, guided breathing, and supportive conversations — fully offline.",
      },
      { property: "og:title", content: "Mind Coach — Private mental wellness, offline" },
      {
        property: "og:description",
        content:
          "Talk privately with an on-device AI, track your mood, breathe, and learn — all without sending data anywhere.",
      },
    ],
  }),
  component: MentalHealthPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const moods = [
  { e: "🌞", l: "Joyful", icon: Sun, tone: "sunny" },
  { e: "🙂", l: "Calm", icon: Cloud, tone: "primary" },
  { e: "😐", l: "Neutral", icon: Cloud, tone: "neutral" },
  { e: "😔", l: "Low", icon: CloudRain, tone: "lavender" },
  { e: "😣", l: "Stressed", icon: Zap, tone: "coral" },
] as const;

const exercises = [
  {
    icon: Wind,
    title: "Box Breathing",
    desc: "4-4-4-4 cadence to calm your nervous system.",
    duration: "5 min",
    color: "bg-gradient-primary",
  },
  {
    icon: Heart,
    title: "Loving-kindness",
    desc: "Guided meditation to nurture self-compassion.",
    duration: "10 min",
    color: "bg-gradient-coral",
  },
  {
    icon: Headphones,
    title: "Body Scan",
    desc: "Release tension from head to toe.",
    duration: "8 min",
    color: "bg-gradient-lavender",
  },
  {
    icon: Sparkles,
    title: "Gratitude Reset",
    desc: "Quick reframe to lift your perspective.",
    duration: "3 min",
    color: "bg-gradient-mint",
  },
];

const articles = [
  { title: "Understanding anxiety: a gentle primer", read: "6 min read", topic: "Awareness" },
  { title: "How sleep shapes your mood", read: "4 min read", topic: "Sleep" },
  { title: "The science of breathwork", read: "5 min read", topic: "Practice" },
];

function MentalHealthPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-mind p-6 shadow-soft sm:p-8">
          <div className="absolute right-6 top-6 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-lavender/30" />
              <div className="relative flex h-20 w-20 animate-breathe items-center justify-center rounded-full bg-gradient-lavender shadow-glow">
                <Brain className="h-9 w-9 text-lavender-foreground" />
              </div>
            </div>
          </div>
          <div className="max-w-2xl">
            <Pill tone="lavender" className="bg-card/70">
              <Lock className="h-3 w-3" /> 100% private · on-device AI
            </Pill>
            <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              A safe space for your mind.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-foreground/70 sm:text-base">
              Talk to your Mind Coach, check in with how you feel, and explore exercises designed
              to help you breathe, focus, and rest. Nothing leaves your device.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="primary" className="bg-card/70">
                <WifiOff className="h-3 w-3" /> Works offline
              </Pill>
              <Pill tone="success" className="bg-card/70">
                <ShieldCheck className="h-3 w-3" /> End-to-end private
              </Pill>
            </div>
          </div>
        </section>

        {/* Mood + emergency */}
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard
            title="How are you feeling right now?"
            subtitle="Check in — there's no wrong answer"
            className="lg:col-span-2"
          >
            <MoodCheckin />
          </SectionCard>

          <EmergencyCard />
        </div>

        {/* Chat */}
        <MindCoachCard />

        {/* Exercises */}
        <SectionCard title="Guided exercises" subtitle="Short practices for everyday wellbeing">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exercises.map((ex) => {
              const Icon = ex.icon;
              return (
                <article
                  key={ex.title}
                  className="group cursor-pointer rounded-2xl border border-border/60 bg-background/50 p-5 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground shadow-soft ${ex.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                    {ex.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{ex.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Pill tone="primary">{ex.duration}</Pill>
                    <span className="text-xs font-semibold text-primary group-hover:underline">
                      Start →
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionCard>

        {/* Library */}
        <SectionCard
          title="Learn"
          subtitle="Bite-sized reads on mental health awareness"
          action={
            <button className="text-xs font-semibold text-primary hover:underline">
              Explore library
            </button>
          }
        >
          <div className="grid gap-3 md:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.title}
                className="rounded-2xl border border-border/60 bg-background/50 p-5 transition hover:bg-card hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <Pill tone="lavender">{a.topic}</Pill>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{a.read}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function MoodCheckin() {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {moods.map((m) => (
          <button
            key={m.l}
            onClick={() => setSelected(m.l)}
            className={cn(
              "group flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-4 text-xs font-semibold transition",
              selected === m.l
                ? "border-primary bg-primary-soft text-primary shadow-soft"
                : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-primary-soft/40",
            )}
          >
            <span className="text-3xl transition group-hover:scale-110">{m.e}</span>
            {m.l}
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Anything you'd like to add about how you're feeling? (optional)"
        className="mt-4 w-full resize-none rounded-2xl border border-border bg-background/60 p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {selected ? `Logged as: ${selected}` : "Pick how you're feeling above"}
        </p>
        <button
          disabled={!selected}
          className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-40"
        >
          Save check-in
        </button>
      </div>
    </div>
  );
}

function EmergencyCard() {
  return (
    <div className="flex flex-col rounded-3xl border border-coral/30 bg-coral/5 p-5 shadow-soft sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-coral text-coral-foreground shadow-soft">
        <Phone className="h-5 w-5" />
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">Need urgent help?</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">
        If you or someone you know is in crisis, support is available 24/7. You're not alone.
      </p>
      <div className="mt-4 space-y-2">
        <a
          href="tel:988"
          className="flex items-center justify-between rounded-xl bg-gradient-coral px-4 py-3 text-sm font-semibold text-coral-foreground transition hover:opacity-90"
        >
          Call crisis hotline
          <Phone className="h-4 w-4" />
        </a>
        <button className="w-full rounded-xl border border-coral/40 bg-card px-4 py-2.5 text-sm font-semibold text-coral hover:bg-coral/10">
          Text a counselor
        </button>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "I'm feeling overwhelmed today",
  "Help me wind down before bed",
  "I can't stop overthinking",
  "Suggest a 5-minute reset",
];

type ConnStatus = "checking" | "online" | "offline";

function MindCoachCard() {
  const [config, setConfig] = useState<LocalLLMConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<ConnStatus>("checking");
  const [showSettings, setShowSettings] = useState(false);

  // Hydrate config from localStorage on mount (avoids SSR mismatch).
  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const checkConnection = async (cfg: LocalLLMConfig) => {
    setStatus("checking");
    const ok = await pingLocalLLM(cfg);
    setStatus(ok ? "online" : "offline");
  };

  useEffect(() => {
    checkConnection(config);
  }, [config.baseUrl]);

  const onSaveConfig = (next: LocalLLMConfig) => {
    saveConfig(next);
    setConfig(next);
    setShowSettings(false);
  };

  return (
    <SectionCard
      title="Mind Coach"
      subtitle="Private conversation · powered by an on-device language model"
      action={
        <div className="flex items-center gap-2">
          <ConnectionBadge status={status} />
          <button
            onClick={() => checkConnection(config)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Refresh connection"
            title="Refresh connection"
          >
            <RefreshCw className={cn("h-4 w-4", status === "checking" && "animate-spin")} />
          </button>
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Model settings"
            title="Model settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      }
    >
      {showSettings && (
        <LocalLLMSettings
          initial={config}
          onCancel={() => setShowSettings(false)}
          onSave={onSaveConfig}
        />
      )}
      {status === "offline" && !showSettings && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-coral/30 bg-coral/5 p-4 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
          <div className="space-y-1">
            <p className="font-medium">Can't reach your local model at {config.baseUrl}.</p>
            <p className="text-muted-foreground">
              Start Ollama on your machine (<code className="rounded bg-muted px-1">ollama serve</code>),
              make sure the model <code className="rounded bg-muted px-1">{config.model}</code> is pulled,
              and that <code className="rounded bg-muted px-1">OLLAMA_ORIGINS="*"</code> is set so the
              browser can call it.
            </p>
          </div>
        </div>
      )}
      <MindCoach config={config} status={status} />
    </SectionCard>
  );
}

function ConnectionBadge({ status }: { status: ConnStatus }) {
  if (status === "checking") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" /> Connecting…
      </span>
    );
  }
  if (status === "online") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
        <CheckCircle2 className="h-3 w-3" /> Local model online
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral">
      <WifiOff className="h-3 w-3" /> Offline
    </span>
  );
}

function LocalLLMSettings({
  initial,
  onSave,
  onCancel,
}: {
  initial: LocalLLMConfig;
  onSave: (cfg: LocalLLMConfig) => void;
  onCancel: () => void;
}) {
  const [baseUrl, setBaseUrl] = useState(initial.baseUrl);
  const [model, setModel] = useState(initial.model);
  const [temperature, setTemperature] = useState(initial.temperature);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ baseUrl: baseUrl.trim(), model: model.trim(), temperature });
      }}
      className="mb-4 space-y-3 rounded-2xl border border-border bg-background/60 p-4"
    >
      <div>
        <label className="text-xs font-semibold text-foreground/80">Local server URL</label>
        <input
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="http://localhost:11434"
          className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <p className="mt-1 text-[11px] text-muted-foreground">
          Ollama default is <code>http://localhost:11434</code>. The app calls{" "}
          <code>POST /api/chat</code>.
        </p>
      </div>
      <div>
        <label className="text-xs font-semibold text-foreground/80">Model</label>
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="hadad/LFM2.5-1.2B:Q4_K_M"
          className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-foreground/80">
          Temperature: {temperature.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={1.2}
          step={0.05}
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="mt-1 w-full accent-primary"
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-foreground/70 hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-gradient-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-90"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function MindCoach({ config, status }: { config: LocalLLMConfig; status: ConnStatus }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi 🌿 I'm your Mind Coach. This conversation stays on your device — nothing is sent anywhere. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || streaming) return;

    setError(null);
    setInput("");
    const nextHistory: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(nextHistory);
    setStreaming(true);

    // Build messages payload for the LLM: system prompt + full conversation.
    const payload: ChatMessage[] = [
      { role: "system", content: MENTAL_HEALTH_SYSTEM_PROMPT },
      ...nextHistory.map((m) => ({ role: m.role, content: m.content }) as ChatMessage),
    ];

    // Insert an empty assistant bubble that we'll fill as tokens arrive.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      await streamChat({
        config,
        messages: payload,
        signal: ac.signal,
        onToken: (chunk) => {
          setMessages((m) => {
            const copy = m.slice();
            const last = copy[copy.length - 1];
            if (last && last.role === "assistant") {
              copy[copy.length - 1] = { ...last, content: last.content + chunk };
            }
            return copy;
          });
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      setMessages((m) => {
        // Remove the empty assistant bubble if nothing streamed.
        const copy = m.slice();
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant" && last.content === "") copy.pop();
        return copy;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  const lastMsg = messages[messages.length - 1];
  const waitingForFirstToken =
    streaming && lastMsg?.role === "assistant" && lastMsg.content === "";

  const canSend = input.trim().length > 0 && !streaming && status !== "offline";

  return (
    <div className="flex flex-col">
      <div
        ref={scrollRef}
        className="h-[420px] space-y-3 overflow-y-auto rounded-2xl bg-gradient-mind/40 p-4 sm:p-5"
      >
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} />
        ))}
        {waitingForFirstToken && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-lavender shadow-soft">
              <Brain className="h-4 w-4 text-lavender-foreground" />
            </div>
            <div className="flex gap-1 rounded-2xl bg-card px-4 py-3 shadow-soft">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-coral/30 bg-coral/5 px-3 py-2 text-xs text-coral">
          {error}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={streaming || status === "offline"}
            className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 ring-1 ring-border transition hover:bg-primary-soft hover:text-primary hover:ring-primary disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground/80"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            status === "offline"
              ? "Start your local model to begin…"
              : "Share what's on your mind…"
          }
          disabled={status === "offline"}
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
        />
        {streaming ? (
          <button
            type="button"
            onClick={stop}
            className="inline-flex h-10 items-center rounded-xl bg-muted px-3 text-xs font-semibold text-foreground shadow-soft transition hover:bg-muted/80"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSend}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </form>

      <p className="mt-2 px-1 text-[11px] leading-relaxed text-muted-foreground">
        Mind Coach offers supportive guidance but is not a substitute for professional care. If
        you're in crisis, please use the urgent help options above.
      </p>
    </div>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  if (role === "user") {
    return (
      <div className="flex justify-end animate-float-up">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-primary px-4 py-2.5 text-sm text-primary-foreground shadow-soft">
          {content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2 animate-float-up">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-lavender shadow-soft">
        <Brain className="h-4 w-4 text-lavender-foreground" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-sm leading-relaxed text-foreground shadow-soft">
        {content}
      </div>
    </div>
  );
}
