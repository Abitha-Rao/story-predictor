import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEVELS, levelFor, pct, type Stats } from "@/lib/predictor";
import { SHOWS } from "./data";
import { Bar, Disclaimer, Pill } from "./ui";

export function Profile({ stats }: { stats: Stats }) {
  const lvl = levelFor(stats.lifetimeXp);
  return (
    <div className="px-5 pb-28 pt-6 animate-fade-up">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-primary font-display text-2xl font-bold text-primary-foreground shadow-glow">A</div>
        <div>
          <h1 className="font-display text-2xl font-bold">abitha_watches</h1>
          <p className="text-sm text-muted-foreground">Level {lvl.level} · {lvl.name}</p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-card p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl font-bold tabular-nums">{stats.lifetimeXp.toLocaleString("en-IN")}<span className="ml-1 text-sm font-semibold text-muted-foreground">lifetime XP</span></p>
        </div>
        <Bar value={lvl.progress} className="mt-3 h-2" />
        <p className="mt-2 text-xs text-muted-foreground">{lvl.next ? <>Next milestone: <b className="text-foreground">{lvl.next.name}</b> in {lvl.toNext.toLocaleString("en-IN")} XP</> : "You've reached the top level."}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">XP comes from taking part (+20 per prediction) and being right (+100). Never from spending.</p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[[`${pct(stats.correctPredictions, stats.totalPredictions)}%`, "accuracy"], [stats.totalPredictions, "predictions"], [stats.correctPredictions, "correct"]].map(([v, l]) => (
          <div key={String(l)} className="rounded-2xl bg-card p-3 text-center"><p className="text-lg font-bold tabular-nums">{v}</p><p className="text-[10px] text-muted-foreground">{l}</p></div>
        ))}
      </div>

      <h2 className="mt-7 font-display text-lg font-semibold">Progression</h2>
      <div className="mt-3 space-y-2">
        {LEVELS.map((l) => {
          const done = stats.lifetimeXp >= l.minXp; const cur = l.level === lvl.level;
          return (
            <div key={l.level} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3", cur ? "border border-primary bg-primary/10" : "bg-card", !done && "opacity-60")}>
              <span className={cn("grid h-8 w-8 place-items-center rounded-full text-xs font-bold", done ? "bg-gradient-gold text-accent-foreground" : "bg-secondary")}>{done ? <Check className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}</span>
              <span className="flex-1"><span className="block text-sm font-semibold">Level {l.level}: {l.name}</span><span className="block text-[11px] text-muted-foreground">{l.minXp.toLocaleString("en-IN")} XP</span></span>
              {cur && <Pill className="bg-primary text-primary-foreground">Current</Pill>}
            </div>
          );
        })}
      </div>

      <h2 className="mt-7 font-display text-lg font-semibold">Favourite genres</h2>
      <div className="mt-3 flex flex-wrap gap-2">{["Mystery", "Family drama", "Revenge", "Romance"].map((g) => <Pill key={g} className="px-3 py-1.5 text-xs">{g}</Pill>)}</div>

      <h2 className="mt-7 font-display text-lg font-semibold">Favourite shows</h2>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {SHOWS.slice(0, 3).map((s) => (
          <div key={s.id}><img src={s.poster} alt={s.title} loading="lazy" width={768} height={1152} className="aspect-[2/3] w-full rounded-xl object-cover" /><p className="mt-1 truncate text-xs font-semibold">{s.title}</p></div>
        ))}
      </div>
      <Disclaimer className="mt-6" />
      <p className="mt-2 text-[10px] text-muted-foreground">Prototype · fictional user data</p>
    </div>
  );
}
