import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionCard, Pill } from "@/components/cards";
import {
  Bell,
  Watch,
  Smartphone,
  Mail,
  ShieldCheck,
  Moon,
  Globe,
  ChevronRight,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — Mind Care" },
      {
        name: "description",
        content:
          "Manage your Mind Care profile, connected devices, notifications and privacy preferences.",
      },
      { property: "og:title", content: "Profile & Settings — Mind Care" },
      {
        property: "og:description",
        content: "Personalize Mind Care to fit your life.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header card */}
        <section className="overflow-hidden rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-card sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-card text-2xl font-bold text-primary shadow-soft">
              AM
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
                Member since 2024
              </p>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">Alex Morgan</h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                alex.morgan@example.com · Pacific Time
              </p>
            </div>
            <button className="rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft hover:opacity-95">
              Edit profile
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Streak" value="42 days" />
            <Stat label="Workouts" value="186" />
            <Stat label="Avg sleep" value="7h 21m" />
            <Stat label="Wellness" value="A−" />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Connected devices */}
          <SectionCard
            title="Connected devices"
            subtitle="Wearables and apps syncing with Mind Care"
            action={
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                <Plus className="h-3 w-3" /> Add device
              </button>
            }
          >
            <ul className="space-y-3">
              <DeviceRow
                icon={<Watch className="h-5 w-5" />}
                name="MindBand 4"
                detail="Battery 82% · Synced 2 min ago"
                badge={<Pill tone="success">Active</Pill>}
              />
              <DeviceRow
                icon={<Smartphone className="h-5 w-5" />}
                name="iPhone 15 Pro"
                detail="Health data shared automatically"
                badge={<Pill tone="primary">Linked</Pill>}
              />
              <DeviceRow
                icon={<Watch className="h-5 w-5" />}
                name="Add chest strap"
                detail="Polar, Garmin, Wahoo and more"
                badge={<Pill tone="neutral">Available</Pill>}
                muted
              />
            </ul>
          </SectionCard>

          {/* Notifications */}
          <SectionCard title="Notifications" subtitle="Choose what you'd like to hear about">
            <ul className="divide-y divide-border/60">
              <ToggleRow
                icon={<Bell className="h-4 w-4" />}
                title="Daily summary"
                desc="A friendly recap each evening"
                on
              />
              <ToggleRow
                icon={<Moon className="h-4 w-4" />}
                title="Wind-down reminders"
                desc="Get nudged 30 min before your ideal bedtime"
                on
              />
              <ToggleRow
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Health alerts"
                desc="Early warnings on unusual biometric trends"
                on
              />
              <ToggleRow
                icon={<Mail className="h-4 w-4" />}
                title="Weekly newsletter"
                desc="Tips, science and stories"
                on={false}
              />
            </ul>
          </SectionCard>

          {/* Privacy */}
          <SectionCard
            title="Privacy & data"
            subtitle="You're in control of what you share"
            className="lg:col-span-2"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <PrivacyItem
                title="On-device AI"
                desc="Mind Coach runs entirely on your device. Conversations never leave your phone."
                pillTone="success"
                pillText="Always private"
              />
              <PrivacyItem
                title="Data sharing"
                desc="Choose what biometric data is included in research and product improvements."
                pillTone="primary"
                pillText="Customize"
              />
              <PrivacyItem
                title="Encryption"
                desc="All synced data is end-to-end encrypted in transit and at rest."
                pillTone="success"
                pillText="Enabled"
              />
              <PrivacyItem
                title="Export or delete"
                desc="Download a full copy of your health history, or delete it permanently."
                pillTone="neutral"
                pillText="Manage"
              />
            </div>
          </SectionCard>

          {/* Preferences */}
          <SectionCard title="Preferences" subtitle="Make Mind Care feel like yours" className="lg:col-span-2">
            <div className="grid gap-3 md:grid-cols-3">
              <PrefRow icon={<Moon className="h-4 w-4" />} title="Appearance" value="System" />
              <PrefRow icon={<Globe className="h-4 w-4" />} title="Units" value="Metric" />
              <PrefRow icon={<Bell className="h-4 w-4" />} title="Quiet hours" value="10 PM – 7 AM" />
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card/15 px-4 py-3 backdrop-blur">
      <p className="text-[11px] font-medium uppercase tracking-wider text-primary-foreground/70">
        {label}
      </p>
      <p className="font-display text-xl font-bold">{value}</p>
    </div>
  );
}

function DeviceRow({
  icon,
  name,
  detail,
  badge,
  muted,
}: {
  icon: React.ReactNode;
  name: string;
  detail: string;
  badge: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 ${
        muted ? "opacity-70 hover:opacity-100" : ""
      } transition hover:bg-card`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>
      {badge}
    </li>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  on,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  on: boolean;
}) {
  return (
    <li className="flex items-center gap-3 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground/70">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        type="button"
        aria-pressed={on}
        className={`relative h-6 w-11 rounded-full transition ${
          on ? "bg-gradient-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-soft transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </li>
  );
}

function PrivacyItem({
  title,
  desc,
  pillTone,
  pillText,
}: {
  title: string;
  desc: string;
  pillTone: "success" | "primary" | "neutral";
  pillText: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-foreground">{title}</p>
        <Pill tone={pillTone}>{pillText}</Pill>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function PrefRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <button className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 text-left transition hover:bg-card">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
