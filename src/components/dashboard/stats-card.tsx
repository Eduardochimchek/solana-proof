import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
