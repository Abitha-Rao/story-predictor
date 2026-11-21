import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ListOrdered, MousePointerClick, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GuideStep = {
  title: string;
  /** One-line summary (mobile card) */
  blurb: string;
  /** What is happening and why it matters (desktop panel) */
  detail: string;
  /** What the viewer should do on the phone */
  doIt: string;
  /** Matches [data-guide="..."] in the app; that element pulses */
  target: string;
};

export const STEPS: GuideStep[] = [
  {
    title: "Home: a reason to come back tonight",
    blurb: "Story TV already gives viewers stories. This card gives them tonight's twist to predict.",
    detail: "The Home screen looks like any OTT app. The new part is the red 'Your next story challenge' card: one question about tomorrow's episode, +100 free points, and the viewer's level and weekly rank.",
    doIt: "Tap 'Make your prediction'.",
    target: "challenge",
  },
  {
    title: "Pick an answer and lock it",
    blurb: "Choose who is hiding the secret. Change your mind freely until you lock.",
    detail: "Daily-release show: predictions are open before Episode 16 drops and close at 9:00 PM. The viewer can switch answers as often as they like. Nothing counts until they lock.",
    doIt: "Tap an answer, tap a different one, then tap 'Lock Prediction'.",
    target: "options",
  },
  {
    title: "Locked: no changes after this",
    blurb: "The answer is sealed before the outcome. That's what keeps it fair.",
    detail: "Once locked, the options are disabled and the viewer sees when the result unlocks. A locked prediction is a promise to come back, and that return visit is the retention hook.",
    doIt: "Tap 'Demo: release Episode 16 now' to skip the wait.",
    target: "locked",
  },
  {
    title: "The new episode releases",
    blurb: "'The reveal is here' is the notification-worthy moment that pulls viewers back.",
    detail: "Episode 16 is out. The prediction can now be resolved, even if the viewer hasn't unlocked the paid episode. No scene, dialogue or footage is shown here.",
    doIt: "Tap 'Reveal my result'.",
    target: "reveal-btn",
  },
  {
    title: "You called it: points, accuracy, rank",
    blurb: "+100 points, accuracy 67% → 68%, and rank #128 → #114.",
    detail: "A correct call earns 100 free points and updates weekly accuracy and leaderboard rank instantly. A wrong call (try picking another answer) is friendly: nothing is taken away, and the next prediction is waiting.",
    doIt: "Look at the three result tiles. Rank and accuracy have just moved.",
    target: "result",
  },
  {
    title: "Free user: the result without paying",
    blurb: "A free viewer still learns if they were right, but the episode stays locked.",
    detail: "For someone who hasn't unlocked Episode 16, the card shows whether they were right and what % of viewers picked the same answer. The story stays behind the paywall, so the feature drives curiosity without giving away paid content.",
    doIt: "Tap 'Continue the story' to see the locked episode screen.",
    target: "continue",
  },
  {
    title: "Binge mode: no forced daily wait",
    blurb: "For finished shows, predict before each next episode, back to back.",
    detail: "Ghar Ki Lakshmi has all 24 episodes out. Predictions open only for the next unwatched episode and resolve after watching. Episodes already watched can't be predicted, and binge-watchers never have to wait a day.",
    doIt: "Pick an answer, 'Lock & watch Ep 8', then 'Finish watching' to resolve it.",
    target: "binge",
  },
  {
    title: "Weekly leaderboard: friendly competition",
    blurb: "'This Week's Story Detectives' resets weekly. Points are free, never money.",
    detail: "Rank, points and accuracy against other viewers. Weekly points reset, but lifetime XP and accuracy stay on the profile. There are no entry fees, bets or cash prizes.",
    doIt: "Try the Overall, Friends and 'The Last Promise' tabs.",
    target: "board",
  },
  {
    title: "Profile: levels from playing, not paying",
    blurb: "Five levels, earned by taking part and being right, never by spending.",
    detail: "Curious Viewer → Plot Follower → Twist Tracker → Story Detective → Master Predictor. +20 XP for every prediction and +100 for every correct one. Lifetime progress never resets.",
    doIt: "Scroll the progression ladder and the stats.",
    target: "level",
  },
  {
    title: "Story Comeback: win back lapsed viewers",
    blurb: "A viewer gone for 7 days gets a nudge and a spoiler-free recap.",
    detail: "The notification 'You never found out who betrayed Riya.' opens a short recap built only from episodes the viewer has already watched, then a single button that continues from Episode 15.",
    doIt: "Tap the notification, then 'Continue from Episode 15'.",
    target: "notif",
  },
];

type Props = {
  open: boolean;
  step: number;
  onStep: (i: number) => void;
  onOpen: () => void;
  onClose: () => void;
  onDemo: () => void;
};

export function GuidePanel({ open, step, onStep, onOpen, onClose, onDemo }: Props) {
  const [list, setList] = useState(false);
  if (!open) return null;
  const s = STEPS[step]!;
  const last = step === STEPS.length - 1;
  void onOpen;

  const nav = (
    <div className="flex gap-2">
      <button onClick={() => onStep(step - 1)} disabled={step === 0} className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-semibold transition disabled:opacity-30"><ArrowLeft className="h-3.5 w-3.5" />Back</button>
      {last ? (
        <button onClick={() => onStep(0)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-3.5 py-2 text-xs font-bold text-primary-foreground">Restart the tour</button>
      ) : (
        <button onClick={() => onStep(step + 1)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition active:scale-[0.98]">Next step<ArrowRight className="h-3.5 w-3.5" /></button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: full step list beside the phone */}
      <aside className="fixed bottom-6 top-6 z-40 hidden w-[340px] flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-card backdrop-blur min-[1180px]:flex" style={{ left: "calc(50% + 215px)" }}>
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary-glow">GUIDED DEMO</p>
            <p className="mt-0.5 font-display text-lg font-bold leading-tight">Story Predictor in {STEPS.length} steps</p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-secondary">Free play</button>
        </div>
        <ol className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {STEPS.map((st, i) => {
            const on = i === step;
            return (
              <li key={st.title}>
                <button onClick={() => onStep(i)} className={cn("flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition", on ? "bg-primary/10" : "hover:bg-secondary")}>
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold", on ? "bg-gradient-primary text-primary-foreground" : i < step ? "bg-success/20 text-success" : "bg-secondary text-muted-foreground")}>{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
                  <span className={cn("text-[13px] font-semibold leading-snug", !on && "text-muted-foreground")}>{st.title}</span>
                </button>
                {on && (
                  <div className="animate-fade-up px-3 pb-2 pl-12 pt-1">
                    <p className="text-xs leading-relaxed text-muted-foreground">{st.detail}</p>
                    <p className="mt-3 flex gap-2 rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-xs font-semibold"><MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" />{st.doIt}</p>
                    <div className="mt-3">{nav}</div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="border-t border-border px-5 py-3">
          <button onClick={onDemo} className="text-[11px] font-semibold text-muted-foreground underline-offset-2 hover:underline">Open demo controls</button>
          <p className="mt-1 text-[10px] leading-snug text-muted-foreground">Prototype with fictional data. Points are free and non-monetary.</p>
        </div>
      </aside>

      {/* Mobile / narrow: compact card above the bottom nav */}
      <div className="fixed inset-x-0 bottom-[76px] z-50 mx-auto w-full max-w-[390px] px-3 min-[1180px]:hidden">
        {list && (
          <ol className="no-scrollbar mb-2 max-h-[46vh] space-y-1 overflow-y-auto rounded-2xl border border-border bg-card/98 p-2 shadow-card backdrop-blur animate-fade-up">
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <button onClick={() => { onStep(i); setList(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left", i === step && "bg-primary/10")}>
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold", i === step ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>{i + 1}</span>
                  <span className="text-xs font-semibold">{st.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
        <div className="rounded-2xl border border-border bg-card/98 p-3 shadow-card backdrop-blur">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-primary text-[11px] font-bold text-primary-foreground">{step + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold leading-snug">{s.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{s.blurb}</p>
              <p className="mt-1.5 flex gap-1.5 text-[11px] font-semibold text-primary-glow"><MousePointerClick className="mt-px h-3 w-3 shrink-0" />{s.doIt}</p>
            </div>
            <button aria-label="Close guide" onClick={onClose} className="shrink-0 rounded-lg p-1 text-muted-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <button aria-label="All steps" onClick={() => setList((v) => !v)} className="grid h-8 w-9 shrink-0 place-items-center rounded-xl border border-border bg-secondary">{list ? <ChevronDown className="h-4 w-4" /> : <ListOrdered className="h-4 w-4" />}</button>
            <div className="min-w-0 flex-1">{nav}</div>
          </div>
        </div>
      </div>
    </>
  );
}
