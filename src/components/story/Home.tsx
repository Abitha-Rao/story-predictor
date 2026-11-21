import { Bell, ChevronRight, Play, Sparkles, Trophy } from "lucide-react";
import { POSTERS, SHOWS } from "./data";
import { Pill, SectionTitle } from "./ui";
import type { Phase } from "./StoryApp";

type Props = {
  levelName: string; level: number; weeklyPoints: number; rank: number; phase: Phase;
  onChallenge: () => void; onBell: () => void; onPlay: (ep: number) => void; hasNotif: boolean;
};

export function Home({ levelName, level, weeklyPoints, rank, phase, onChallenge, onBell, onPlay, hasNotif }: Props) {
  const cta = phase === "open" ? "Make your prediction" : phase === "locked" ? "View locked prediction" : phase === "released" ? "See the reveal" : "View your result";
  return (
    <div className="pb-28 animate-fade-up">
      <header className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary font-display text-sm font-black text-primary-foreground">S</div>
          <span className="font-display text-lg font-bold tracking-tight">Story<span className="text-primary">TV</span></span>
        </div>
        <button aria-label="Notifications" onClick={onBell} className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary">
          <Bell className="h-5 w-5" />
          {hasNotif && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />}
        </button>
      </header>
      <div className="px-5 pt-4">
        <p className="text-sm text-muted-foreground">Good evening!</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold"><Sparkles className="h-4 w-4 text-accent" />Level {level} · {levelName}</p>
      </div>

      {/* Featured */}
      <section className="relative mx-5 mt-4 overflow-hidden rounded-3xl shadow-card">
        <img src={POSTERS.lastPromise} alt="The Last Promise poster" width={768} height={1152} className="h-[430px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-poster" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Pill className="bg-primary text-primary-foreground">Story TV Original</Pill>
          <h1 className="mt-2 font-display text-4xl font-bold leading-none">The Last Promise</h1>
          <p className="mt-2 text-xs text-muted-foreground">Mystery / Family Drama · 18 Episodes · New episode daily</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => onPlay(15)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-bold text-background"><Play className="h-4 w-4 fill-current" />Watch Ep 15</button>
            <button onClick={onChallenge} className="flex items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold">Predict</button>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="mx-5 mt-5 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-challenge p-5 shadow-glow">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary-glow">YOUR NEXT STORY CHALLENGE</span>
          <Pill>Ep 16 · +100</Pill>
        </div>
        <p className="mt-3 font-display text-xl font-semibold leading-snug">Will Riya discover who has been hiding the truth?</p>
        <button data-guide="challenge" onClick={onChallenge} className="mt-4 flex w-full items-center justify-between rounded-2xl bg-gradient-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]">
          {cta}<ChevronRight className="h-4 w-4" />
        </button>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat v={weeklyPoints.toLocaleString("en-IN")} l="prediction points" />
          <Stat v={`Lvl ${level}`} l={levelName} />
          <Stat v={`#${rank}`} l="weekly rank" icon />
        </div>
      </section>

      <Row title="Continue Watching">
        {[{ s: SHOWS[0]!, ep: 15, p: 0.6 }, { s: SHOWS[1]!, ep: 21, p: 0.3 }, { s: SHOWS[3]!, ep: 7, p: 0.85 }].map(({ s, ep, p }) => (
          <button key={s.id} onClick={() => onPlay(ep)} className="w-40 shrink-0 text-left">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={s.poster} alt={s.title} loading="lazy" width={768} height={1152} className="aspect-video w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-background/30"><Play className="h-7 w-7 fill-current" /></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-muted"><div className="h-full bg-primary" style={{ width: `${p * 100}%` }} /></div>
            </div>
            <p className="mt-2 truncate text-sm font-semibold">{s.title}</p>
            <p className="text-xs text-muted-foreground">Episode {ep}</p>
          </button>
        ))}
      </Row>

      <Row title="Trending in India">
        {[SHOWS[2]!, SHOWS[0]!, SHOWS[3]!, SHOWS[1]!].map((s, i) => (
          <button key={s.id + i} onClick={() => (s.id === "tlp" ? onChallenge() : onPlay(1))} className="relative w-32 shrink-0 text-left">
            <img src={s.poster} alt={s.title} loading="lazy" width={768} height={1152} className="aspect-[2/3] w-full rounded-2xl object-cover" />
            <span className="absolute -left-1 bottom-8 font-display text-5xl font-black text-foreground/90 drop-shadow-lg">{i + 1}</span>
            <p className="mt-2 truncate text-xs font-semibold">{s.title}</p>
          </button>
        ))}
      </Row>

      <Row title="Daily Releases">
        {SHOWS.map((s, i) => (
          <button key={s.id} onClick={() => (s.id === "tlp" ? onChallenge() : onPlay(1))} className="w-28 shrink-0 text-left">
            <div className="relative">
              <img src={s.poster} alt={s.title} loading="lazy" width={768} height={1152} className="aspect-[2/3] w-full rounded-2xl object-cover" />
              <Pill className="absolute left-2 top-2 bg-background/80">{["9:30 PM", "8 PM", "7 PM", "6 PM"][i]}</Pill>
            </div>
            <p className="mt-2 truncate text-xs font-semibold">{s.title}</p>
            <p className="text-[11px] text-muted-foreground">{s.genre}</p>
          </button>
        ))}
      </Row>
      <p className="px-5 pt-2 text-center text-[10px] text-muted-foreground">Prototype · all shows, characters and metrics are fictional</p>
    </div>
  );
}

function Stat({ v, l, icon }: { v: string; l: string; icon?: boolean }) {
  return (
    <div className="rounded-xl bg-background/40 px-2 py-2.5">
      <p className="flex items-center justify-center gap-1 text-sm font-bold">{icon && <Trophy className="h-3.5 w-3.5 text-accent" />}{v}</p>
      <p className="truncate text-[10px] text-muted-foreground">{l}</p>
    </div>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex gap-3 overflow-x-auto px-5 no-scrollbar">{children}</div>
    </section>
  );
}
