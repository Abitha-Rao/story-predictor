import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Overlay({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("guide-pad fixed inset-y-0 left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 overflow-y-auto no-scrollbar bg-background animate-fade-up", className)}>
      {children}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground", className)}>{children}</span>;
}

export function PrimaryButton({ children, onClick, className, disabled }: { children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={onClick} className={cn("flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition active:scale-[0.98] disabled:opacity-40 disabled:shadow-none", className)}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={cn("flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition active:scale-[0.98]", className)}>
      {children}
    </button>
  );
}

export function Bar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-gradient-primary transition-all duration-700" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between px-5">
      <h2 className="font-display text-lg font-semibold">{children}</h2>
      {action}
    </div>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-muted-foreground", className)}>
      Prediction points are free and non-monetary. They can't be exchanged for cash, coins, subscriptions or paid episodes.
    </p>
  );
}

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function fmtDuration(ms: number, withDays = false) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return withDays ? `${d}d ${p(h)}h ${p(m)}m` : `${p(h + d * 24)}:${p(m)}:${p(sec)}`;
}
