import { useMemo, useState } from "react";
import { Home as HomeIcon, Sparkles, Trophy, User, X, Play, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { INITIAL_STATS, OVERALL_OTHERS, levelFor, pct, rankIn, resolvePrediction, weeklyReset } from "@/lib/predictor";
import { CORRECT, POSTERS, type OptionId } from "./data";
import { Home } from "./Home";
import { Predict } from "./Predict";
import { Leaderboard } from "./Leaderboard";
import { Profile } from "./Profile";
import { Overlay, PrimaryButton, GhostButton, Disclaimer } from "./ui";

export type Phase = "open" | "locked" | "released" | "revealed";
export type RevealResult = { correct: boolean; accBefore: number; accAfter: number; rankBefore: number; rankAfter: number };
type Tab = "home" | "predict" | "leaderboard" | "profile";
type Ov = null | "notif" | "comeback" | { ep: number };

export function StoryApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [stats, setStats] = useState(INITIAL_STATS);
  const [phase, setPhase] = useState<Phase>("open");
  const [selected, setSelected] = useState<OptionId | null>(null);
  const [unlocked, setUnlocked] = useState(true);
  const [result, setResult] = useState<RevealResult | null>(null);
  const [ov, setOv] = useState<Ov>(null);
  const [demo, setDemo] = useState(false);
  const [showPts, setShowPts] = useState(300);
  const deadline = useMemo(() => Date.now() + (2 * 3600 + 14 * 60) * 1000, []);
  const lvl = levelFor(stats.lifetimeXp);
  const rank = rankIn(OVERALL_OTHERS, stats.weeklyPoints);
  const acc = pct(stats.weeklyCorrect, stats.weeklyTotal);

  const reveal = () => {
    const correct = selected === CORRECT;
    const n = resolvePrediction(stats, correct);
    setResult({ correct, accBefore: acc, accAfter: pct(n.weeklyCorrect, n.weeklyTotal), rankBefore: rank, rankAfter: rankIn(OVERALL_OTHERS, n.weeklyPoints) });
    setStats(n); if (correct) setShowPts((p) => p + 100); setPhase("revealed");
  };
  const scenario = (s: number) => {
    setStats(INITIAL_STATS); setResult(null); setOv(null); setDemo(false); setUnlocked(true); setShowPts(300);
    if (s === 1) { setPhase("open"); setSelected(null); setTab("home"); }
    if (s === 2) { setPhase("locked"); setSelected("brother"); setTab("predict"); }
    if (s === 3) { setPhase("released"); setSelected("brother"); setTab("predict"); }
    if (s === 4) { setPhase("open"); setSelected(null); setTab("home"); setOv("notif"); }
    if (s === 5) { setPhase("released"); setSelected("brother"); setUnlocked(false); setTab("predict"); }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[390px] bg-background">
        {tab === "home" && <Home levelName={lvl.name} level={lvl.level} weeklyPoints={stats.weeklyPoints} rank={rank} phase={phase} hasNotif onChallenge={() => setTab("predict")} onBell={() => setOv("notif")} onPlay={(ep) => setOv({ ep })} />}
        {tab === "predict" && <Predict phase={phase} selected={selected} onSelect={setSelected} onLock={() => setPhase("locked")} onReveal={reveal} onRelease={() => setPhase("released")} result={result} unlocked={unlocked} weeklyAccuracy={acc} deadline={deadline} onContinue={() => setOv({ ep: 16 })} onLeaderboard={() => setTab("leaderboard")} onBingeResolve={(c) => setStats((s) => resolvePrediction(s, c))} />}
        {tab === "leaderboard" && <Leaderboard weeklyPoints={stats.weeklyPoints} accuracy={acc} showPoints={showPts} lifetimeXp={stats.lifetimeXp} />}
        {tab === "profile" && <Profile stats={stats} />}

        <button onClick={() => setDemo(true)} className="fixed bottom-24 z-30 ml-[310px] rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">Demo</button>
        <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[390px] -translate-x-1/2 grid-cols-4 border-t border-border bg-background/95 pb-4 pt-2 backdrop-blur">
          {([["home", "Home", HomeIcon], ["predict", "Predict", Sparkles], ["leaderboard", "Leaderboard", Trophy], ["profile", "Profile", User]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => { setTab(k); window.scrollTo(0, 0); }} className={cn("flex flex-col items-center gap-1 text-[11px] font-semibold", tab === k ? "text-primary" : "text-muted-foreground")}><I className="h-5 w-5" />{l}</button>
          ))}
        </nav>

        {demo && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70" onClick={() => setDemo(false)}>
            <div className="w-full max-w-[390px] rounded-t-3xl bg-card p-5 animate-fade-up" onClick={(e) => e.stopPropagation()}>
              <p className="font-display text-lg font-bold">Demo Controls</p>
              <div className="mt-3 space-y-2">
                {["Active user before prediction", "User who has locked a prediction", "User returning the next day", "Lapsed user returning after 7 days", "Free user at a paid episode cliffhanger"].map((l, i) => (
                  <GhostButton key={l} onClick={() => scenario(i + 1)} className="justify-start text-xs">{i + 1}. {l}</GhostButton>
                ))}
                <GhostButton onClick={() => { setPhase("released"); setSelected((s) => s ?? "husband"); setTab("predict"); setDemo(false); }} className="text-xs">Simulate new daily episode release</GhostButton>
                <GhostButton onClick={() => { setStats(weeklyReset); setDemo(false); setTab("leaderboard"); }} className="text-xs">Simulate weekly leaderboard reset</GhostButton>
              </div>
            </div>
          </div>
        )}

        {ov === "notif" && (
          <Overlay className="flex flex-col items-center justify-center bg-gradient-challenge px-5">
            <p className="font-display text-6xl font-light">9:12</p><p className="text-sm text-muted-foreground">7 days since your last visit</p>
            <button onClick={() => setOv("comeback")} className="mt-10 w-full rounded-2xl bg-card/90 p-4 text-left shadow-card animate-pop">
              <p className="text-[11px] font-bold text-primary-glow">STORY TV · now</p>
              <p className="mt-1 text-sm font-semibold">You never found out who betrayed Riya.</p>
              <p className="text-xs text-muted-foreground">Tap for your 30-second recap of The Last Promise</p>
            </button>
          </Overlay>
        )}
        {ov === "comeback" && (
          <Overlay>
            <div className="relative"><img src={POSTERS.lastPromise} alt="The Last Promise" width={768} height={1152} className="h-[360px] w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-poster" />
              <button aria-label="Close" onClick={() => setOv(null)} className="absolute right-4 top-4 rounded-full bg-background/70 p-2"><X className="h-4 w-4" /></button></div>
            <div className="px-5 pb-10">
              <h1 className="font-display text-2xl font-bold">Welcome back. Here's what happened in your story.</h1>
              <p className="mt-1 text-xs text-muted-foreground">Spoiler-free · based only on Episodes 1–14 you watched</p>
              <ol className="mt-4 space-y-3">{["Riya discovered a photograph in her husband's drawer.", "Her brother denied knowing anything about it.", "An unknown caller revealed a new clue.", "The mystery remains unresolved."].map((t, i) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-card p-3 text-sm"><span className="font-bold text-primary">{i + 1}</span>{t}</li>))}</ol>
              <PrimaryButton className="mt-5" onClick={() => setOv({ ep: 15 })}><Play className="h-4 w-4 fill-current" />Continue from Episode 15</PrimaryButton>
            </div>
          </Overlay>
        )}
        {ov && typeof ov === "object" && (
          <Overlay className="flex flex-col">
            <div className="relative flex-1"><img src={POSTERS.lastPromise} alt="" width={768} height={1152} className={cn("h-full max-h-[600px] w-full object-cover", ov.ep >= 16 && !unlocked && "blur-md")} /><div className="absolute inset-0 bg-gradient-poster" />
              <button aria-label="Close" onClick={() => setOv(null)} className="absolute right-4 top-4 rounded-full bg-background/70 p-2"><X className="h-4 w-4" /></button></div>
            <div className="px-5 pb-10">
              <p className="text-xs text-primary-glow">The Last Promise · Episode {ov.ep}</p>
              {ov.ep >= 16 && !unlocked ? (<>
                <h2 className="mt-1 flex items-center gap-2 font-display text-2xl font-bold"><Lock className="h-5 w-5" />This episode is locked</h2>
                <p className="mt-2 text-sm text-muted-foreground">Unlock with a Story TV subscription to watch. Payments aren't part of this prototype.</p>
                <Disclaimer className="mt-3" />
              </>) : (<>
                <h2 className="mt-1 font-display text-2xl font-bold">Now playing</h2>
                <div className="mt-3 h-1 rounded-full bg-muted"><div className="h-full w-1/4 rounded-full bg-primary" /></div>
                <p className="mt-2 text-xs text-muted-foreground">Prototype player · no real footage</p>
              </>)}
              <GhostButton className="mt-4" onClick={() => { setOv(null); setTab("predict"); }}>Back to Story Predictor</GhostButton>
            </div>
          </Overlay>
        )}
      </div>
    </div>
  );
}
