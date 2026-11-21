import { useState } from "react";
import { Check, Clock, Eye, EyeOff, Lock, Play, Sparkles, Target, TrendingUp, Trophy, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { BINGE_QUESTIONS, CORRECT, OPTIONS, POSTERS, type OptionId } from "./data";
import { Bar, Disclaimer, GhostButton, Pill, PrimaryButton, fmtDuration, useNow } from "./ui";
import type { Phase, RevealResult } from "./StoryApp";

type Props = {
  phase: Phase; selected: OptionId | null; onSelect: (o: OptionId) => void; onLock: () => void;
  onReveal: () => void; onRelease: () => void; result: RevealResult | null; unlocked: boolean;
  weeklyAccuracy: number; deadline: number; onContinue: () => void; onBingeResolve: (correct: boolean) => void;
  onLeaderboard: () => void;
};

export function Predict(p: Props) {
  const now = useNow();
  const left = now ? p.deadline - now : p.deadline;
  return (
    <div className="pb-28 animate-fade-up">
      <div className="relative">
        <img src={POSTERS.lastPromise} alt="Riya holding a mysterious photograph" width={768} height={1152} className="h-[340px] w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-poster" />
        <div className="absolute left-5 right-5 top-5 flex justify-between">
          <Pill className="bg-background/70 backdrop-blur"><Sparkles className="h-3 w-3 text-accent" />Story Predictor</Pill>
          <Pill className="bg-background/70 backdrop-blur">Daily release</Pill>
        </div>
        <div className="absolute inset-x-5 bottom-3">
          <p className="text-xs font-semibold text-primary-glow">THE LAST PROMISE · BEFORE EPISODE 16</p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-tight">Who do you think is hiding the biggest secret?</h1>
        </div>
      </div>

      <div className="px-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Riya finds a photograph in her husband's drawer. He says he knows nothing. Then a mysterious phone call hints that someone in the family is hiding a secret.
        </p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Meta icon={<Play className="h-3.5 w-3.5" />} v="Ep 16" l="episode" />
          <Meta icon={<Clock className="h-3.5 w-3.5" />} v={p.phase === "open" || p.phase === "locked" ? fmtDuration(left) : "Closed"} l="locks 9:00 PM" hot={p.phase === "open"} />
          <Meta icon={<Zap className="h-3.5 w-3.5" />} v="100" l="points" />
          <Meta icon={<Target className="h-3.5 w-3.5" />} v={`${p.weeklyAccuracy}%`} l="weekly acc." />
        </div>

        {(p.phase === "open" || p.phase === "locked") && <Choose {...p} />}
        {p.phase === "released" && <Released onReveal={p.onReveal} unlocked={p.unlocked} />}
        {p.phase === "revealed" && p.result && <Reveal r={p.result} unlocked={p.unlocked} selected={p.selected} onContinue={p.onContinue} onLeaderboard={p.onLeaderboard} />}

        <Binge onResolve={p.onBingeResolve} />
        <Disclaimer className="mt-6 text-center" />
      </div>
    </div>
  );
}

function Meta({ icon, v, l, hot }: { icon: React.ReactNode; v: string; l: string; hot?: boolean }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card px-2 py-2.5 text-center", hot && "border-primary/40")}>
      <p className={cn("flex items-center justify-center gap-1 text-[13px] font-bold tabular-nums", hot && "text-primary-glow")}>{icon}{v}</p>
      <p className="text-[10px] text-muted-foreground">{l}</p>
    </div>
  );
}

function Choose({ phase, selected, onSelect, onLock, onRelease }: Props) {
  const locked = phase === "locked";
  return (
    <div className="mt-5">
      <div className="space-y-2.5">
        {OPTIONS.map((o) => {
          const on = selected === o.id;
          return (
            <button key={o.id} disabled={locked} onClick={() => onSelect(o.id)}
              className={cn("flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                on ? "border-primary bg-primary/15 shadow-glow" : "border-border bg-card active:scale-[0.99]",
                locked && !on && "opacity-40")}>
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold", on ? "bg-gradient-primary text-primary-foreground" : "bg-secondary")}>{o.letter}</span>
              <span className="flex-1">
                <span className="block text-[15px] font-semibold">{o.label}</span>
                <span className="block text-xs text-muted-foreground">{o.sub}</span>
              </span>
              {on && (locked ? <Lock className="h-4 w-4 text-primary-glow" /> : <Check className="h-5 w-5 text-primary-glow animate-pop" />)}
            </button>
          );
        })}
      </div>
      {!locked ? (
        <div className="mt-4">
          <PrimaryButton disabled={!selected} onClick={onLock}><Lock className="h-4 w-4" />{selected ? "Lock Prediction" : "Select an answer"}</PrimaryButton>
          <p className="mt-2 text-center text-xs text-muted-foreground">You can change your answer until you lock it. Predictions close before Episode 16 releases.</p>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-success/30 bg-success/10 p-4 animate-pop">
          <p className="flex items-center gap-2 text-sm font-bold text-success"><Lock className="h-4 w-4" />Prediction locked</p>
          <p className="mt-1 text-xs text-muted-foreground">Your answer can't be changed now. The result unlocks when Episode 16 releases tonight at 9:30 PM.</p>
          <GhostButton onClick={onRelease} className="mt-3 text-xs">Demo: release Episode 16 now</GhostButton>
        </div>
      )}
    </div>
  );
}

function Released({ onReveal, unlocked }: { onReveal: () => void; unlocked: boolean }) {
  return (
    <div className="relative mt-5 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-challenge p-6 text-center">
      <div className="relative mx-auto grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ring" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-primary"><Eye className="h-6 w-6" /></span>
      </div>
      <p className="mt-4 text-[11px] font-bold tracking-[0.2em] text-primary-glow">EPISODE 16 IS OUT</p>
      <p className="mt-1 font-display text-2xl font-bold">THE REVEAL IS HERE</p>
      <p className="mt-2 text-sm text-muted-foreground">{unlocked ? "Your prediction has been resolved." : "See how you did — no spoilers, no scenes."}</p>
      <PrimaryButton onClick={onReveal} className="mt-5">Reveal my result</PrimaryButton>
    </div>
  );
}

function Reveal({ r, unlocked, selected, onContinue, onLeaderboard }: { r: RevealResult; unlocked: boolean; selected: OptionId | null; onContinue: () => void; onLeaderboard: () => void }) {
  const opt = OPTIONS.find((o) => o.id === selected);
  const ans = OPTIONS.find((o) => o.id === CORRECT)!;
  return (
    <div className="mt-5 animate-fade-up">
      <div className={cn("relative overflow-hidden rounded-3xl border p-6 text-center", r.correct ? "border-accent/40 bg-gradient-challenge" : "border-border bg-card")}>
        {r.correct && Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="pointer-events-none absolute bottom-6 text-sm font-bold text-accent animate-float-up" style={{ left: `${10 + i * 11}%`, animationDelay: `${i * 0.12}s` }}>✦</span>
        ))}
        <p className="text-[11px] font-bold tracking-[0.2em] text-primary-glow">THE REVEAL IS HERE</p>
        <div className="mx-auto mt-4 grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-accent-foreground animate-pop">
          {r.correct ? <Trophy className="h-9 w-9" /> : <Sparkles className="h-9 w-9" />}
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold">{r.correct ? "You called it!" : "So close!"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {r.correct ? "Your detective instincts were right." : "This twist fooled most viewers too. Your earned points are safe — the next prediction is waiting."}
        </p>
        {r.correct && <p className="mt-4 font-display text-4xl font-black text-accent animate-pop">+100 <span className="text-base font-bold">points</span></p>}
      </div>

      {!unlocked && (
        <div className="mt-3 flex gap-3 rounded-2xl border border-border bg-card p-4">
          <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">Spoiler-free result</p>
            <p className="text-xs text-muted-foreground">You picked <b className="text-foreground">{opt?.label}</b> and were {r.correct ? "right" : "not right this time"}. The scene and dialogue stay inside Episode 16.</p>
          </div>
        </div>
      )}
      {unlocked && (
        <div className="mt-3 rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">The answer</p>
          <p className="text-sm font-semibold">{ans.letter}. {ans.label} — Vikram had kept the photograph all along.</p>
        </div>
      )}

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Delta icon={<Users className="h-4 w-4" />} v={`${opt?.share ?? 0}%`} l="picked the same" />
        <Delta icon={<Target className="h-4 w-4" />} v={`${r.accBefore}→${r.accAfter}%`} l="weekly accuracy" />
        <Delta icon={<TrendingUp className="h-4 w-4" />} v={r.rankBefore === r.rankAfter ? `#${r.rankAfter}` : `#${r.rankBefore}→#${r.rankAfter}`} l={r.rankBefore > r.rankAfter ? `up ${r.rankBefore - r.rankAfter} places` : "rank held"} up={r.rankBefore > r.rankAfter} />
      </div>
      <div className="mt-4 space-y-2">
        <PrimaryButton onClick={onContinue}><Play className="h-4 w-4 fill-current" />Continue the story</PrimaryButton>
        <GhostButton onClick={onLeaderboard}><Trophy className="h-4 w-4" />See leaderboard</GhostButton>
      </div>
    </div>
  );
}

function Delta({ icon, v, l, up }: { icon: React.ReactNode; v: string; l: string; up?: boolean }) {
  return (
    <div className="rounded-2xl bg-card p-3 text-center">
      <div className={cn("mx-auto mb-1 w-fit", up ? "text-success" : "text-muted-foreground")}>{icon}</div>
      <p className={cn("text-sm font-bold tabular-nums", up && "text-success")}>{v}</p>
      <p className="text-[10px] text-muted-foreground">{l}</p>
    </div>
  );
}

/** Completed catalogue show: predict only the next unwatched episode; resolves after watching. No forced daily wait. */
function Binge({ onResolve }: { onResolve: (c: boolean) => void }) {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [last, setLast] = useState<boolean | null>(null);
  const q = BINGE_QUESTIONS[idx];
  const watchedThrough = 7 + idx;
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3">
        <img src={POSTERS.family} alt="Ghar Ki Lakshmi" loading="lazy" width={768} height={1152} className="h-16 w-12 rounded-lg object-cover" />
        <div className="flex-1">
          <p className="text-[11px] font-bold tracking-[0.15em] text-primary-glow">BINGE MODE · ALL 24 EPISODES OUT</p>
          <p className="font-display text-lg font-semibold">Ghar Ki Lakshmi</p>
          <p className="text-xs text-muted-foreground">Watched Ep 1–{watchedThrough} · predictions closed for those</p>
        </div>
      </div>
      {last !== null && <p className={cn("mt-3 rounded-xl px-3 py-2 text-xs font-semibold animate-pop", last ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground")}>{last ? "Correct! +100 points added." : "Not this time — your points are safe."}</p>}
      {q ? (
        <div className="mt-3 rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Before you watch Episode {q.ep}</p>
          <p className="mt-1 text-sm font-semibold">{q.q}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {q.options.map((o, i) => (
              <button key={o} disabled={locked} onClick={() => setPick(i)} className={cn("rounded-xl border px-3 py-2.5 text-xs font-semibold transition", pick === i ? "border-primary bg-primary/15" : "border-border bg-secondary", locked && pick !== i && "opacity-40")}>{o}</button>
            ))}
          </div>
          {!locked ? (
            <PrimaryButton disabled={pick === null} onClick={() => { setLocked(true); setLast(null); }} className="mt-3 py-3">Lock & watch Ep {q.ep}</PrimaryButton>
          ) : (
            <GhostButton className="mt-3" onClick={() => { const c = pick === q.correct; onResolve(c); setLast(c); setIdx(idx + 1); setPick(null); setLocked(false); }}>
              <Play className="h-4 w-4 fill-current" />Finish watching Ep {q.ep} → resolve
            </GhostButton>
          )}
        </div>
      ) : (
        <p className="mt-3 rounded-2xl bg-card p-4 text-sm text-muted-foreground">You're caught up on today's binge predictions. Keep watching — more open as you go.</p>
      )}
    </section>
  );
}
