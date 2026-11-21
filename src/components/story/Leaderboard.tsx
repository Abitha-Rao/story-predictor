import { useState } from "react";
import { Crown, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FRIENDS, OVERALL_OTHERS, SHOW_BOARD, levelFor, pointsToNextRank, rankIn, type Player } from "@/lib/predictor";
import { Bar, Pill, fmtDuration, useNow } from "./ui";

type Props = { weeklyPoints: number; accuracy: number; showPoints: number; lifetimeXp: number };
type Tab = "overall" | "friends" | "show";

function nextMonday(now: number) {
  const d = new Date(now); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + (((8 - d.getDay()) % 7) || 7));
  return d.getTime();
}

export function Leaderboard({ weeklyPoints, accuracy, showPoints, lifetimeXp }: Props) {
  const [tab, setTab] = useState<Tab>("overall");
  const now = useNow(30000);
  const others = tab === "overall" ? OVERALL_OTHERS : tab === "friends" ? FRIENDS : SHOW_BOARD;
  const myPts = tab === "show" ? showPoints : weeklyPoints;
  const rank = rankIn(others, myPts);
  const toNext = pointsToNextRank(others, myPts);
  const me: Player = { name: "You", points: myPts, accuracy };
  const lvl = levelFor(lifetimeXp);

  const sorted = [...others].sort((a, b) => b.points - a.points);
  const withMe = [...sorted.slice(0, rank - 1), me, ...sorted.slice(rank - 1)];
  const top = withMe.slice(0, 3);
  const visible = tab === "overall" && rank > 8
    ? { list: withMe.slice(3, 5).map((p, i) => ({ p, r: i + 4 })), near: withMe.slice(rank - 3, rank + 2).map((p, i) => ({ p, r: rank - 2 + i })) }
    : { list: withMe.slice(3).map((p, i) => ({ p, r: i + 4 })), near: [] };

  return (
    <div className="px-5 pb-28 pt-6 animate-fade-up">
      <p className="text-[11px] font-bold tracking-[0.2em] text-primary-glow">WEEKLY LEADERBOARD</p>
      <h1 data-guide="board" className="mt-1 font-display text-3xl font-bold leading-tight">This Week's Story Detectives</h1>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><RotateCcw className="h-3.5 w-3.5" />Resets in <b className="tabular-nums text-foreground">{now ? fmtDuration(nextMonday(now) - now, true) : "—"}</b> · lifetime XP never resets</p>

      <div className="mt-4 grid grid-cols-3 rounded-2xl bg-card p-1">
        {([["overall", "Overall"], ["friends", "Friends"], ["show", "The Last Promise"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={cn("truncate rounded-xl px-2 py-2 text-xs font-semibold transition", tab === k ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground")}>{l}</button>
        ))}
      </div>
      {tab === "friends" && <p className="mt-2 text-center text-[10px] text-muted-foreground">Demonstration data only</p>}

      <div className="mt-5 flex items-end justify-center gap-3">
        {[1, 0, 2].map((i) => { const p = top[i]; if (!p) return null; return (
          <div key={p.name} className={cn("flex w-24 flex-col items-center", i === 0 && "-mt-4")}>
            {i === 0 && <Crown className="mb-1 h-5 w-5 text-accent" />}
            <div className={cn("grid place-items-center rounded-full font-display font-bold", i === 0 ? "h-16 w-16 bg-gradient-gold text-xl text-accent-foreground" : "h-12 w-12 bg-secondary", p.name === "You" && "ring-2 ring-primary")}>{p.name[0]}</div>
            <p className="mt-2 w-full truncate text-center text-xs font-semibold">{p.name}</p>
            <p className="text-[11px] text-muted-foreground tabular-nums">{p.points.toLocaleString("en-IN")}</p>
            <div className={cn("mt-2 w-full rounded-t-xl bg-card text-center font-display text-lg font-bold", i === 0 ? "h-16 pt-3 text-accent" : i === 1 ? "h-12 pt-2" : "h-9 pt-1")}>{i + 1}</div>
          </div>
        ); })}
      </div>

      <div className="space-y-1.5">
        {visible.list.map(({ p, r }) => <Row key={p.name + r} p={p} r={r} />)}
        {visible.near.length > 0 && <p className="py-1 text-center text-muted-foreground">···</p>}
        {visible.near.map(({ p, r }) => <Row key={p.name + r} p={p} r={r} />)}
      </div>

      <div className="mt-5 rounded-3xl border border-primary/30 bg-gradient-challenge p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Your rank</p>
            <p className="font-display text-3xl font-bold">#{rank}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">To reach #{Math.max(1, rank - 1)}</p>
            <p className="text-lg font-bold text-primary-glow">{toNext > 0 ? `${toNext} pts` : "You're on top!"}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs"><span>Level {lvl.level} · {lvl.name}</span><span className="text-muted-foreground">{lvl.next ? `${lvl.toNext.toLocaleString("en-IN")} XP to ${lvl.next.name}` : "Max level"}</span></div>
          <Bar value={lvl.progress} />
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />Just for bragging rights. No money, betting, entry fees or cash prizes — points are free and non-monetary.</p>
    </div>
  );
}

function Row({ p, r }: { p: Player; r: number }) {
  const me = p.name === "You";
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl px-4 py-3", me ? "border border-primary bg-primary/15" : "bg-card")}>
      <span className="w-8 text-sm font-bold tabular-nums text-muted-foreground">#{r}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-bold">{p.name[0]}</span>
      <span className="flex-1 truncate text-sm font-semibold">{p.name}{me && <Pill className="ml-2 bg-primary text-primary-foreground">You</Pill>}</span>
      <span className="text-right">
        <span className="block text-sm font-bold tabular-nums">{p.points.toLocaleString("en-IN")}</span>
        <span className="block text-[10px] text-muted-foreground">{p.accuracy}% acc.</span>
      </span>
    </div>
  );
}
