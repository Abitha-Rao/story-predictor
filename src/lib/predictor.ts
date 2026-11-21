// Story Predictor prototype logic. All data is fictional prototype data.
export const POINTS_PER_PREDICTION = 100;
export const XP_PER_PARTICIPATION = 20;

export const LEVELS = [
  { level: 1, name: "Curious Viewer", minXp: 0 },
  { level: 2, name: "Plot Follower", minXp: 1000 },
  { level: 3, name: "Twist Tracker", minXp: 3000 },
  { level: 4, name: "Story Detective", minXp: 6000 },
  { level: 5, name: "Master Predictor", minXp: 10000 },
] as const;

export type Stats = {
  weeklyPoints: number;
  lifetimeXp: number;
  totalPredictions: number;
  correctPredictions: number;
  weeklyTotal: number;
  weeklyCorrect: number;
};

export const INITIAL_STATS: Stats = {
  weeklyPoints: 1240,
  lifetimeXp: 7420,
  totalPredictions: 46,
  correctPredictions: 31,
  weeklyTotal: 18,
  weeklyCorrect: 12,
};

/** Resolve a locked prediction. Wrong answers never remove points; participation always earns XP. */
export function resolvePrediction(s: Stats, correct: boolean): Stats {
  const pts = correct ? POINTS_PER_PREDICTION : 0;
  return {
    weeklyPoints: s.weeklyPoints + pts,
    lifetimeXp: s.lifetimeXp + pts + XP_PER_PARTICIPATION,
    totalPredictions: s.totalPredictions + 1,
    correctPredictions: s.correctPredictions + (correct ? 1 : 0),
    weeklyTotal: s.weeklyTotal + 1,
    weeklyCorrect: s.weeklyCorrect + (correct ? 1 : 0),
  };
}

/** Weekly reset clears leaderboard points only; lifetime XP and accuracy stay. */
export function weeklyReset(s: Stats): Stats {
  return { ...s, weeklyPoints: 0, weeklyTotal: 0, weeklyCorrect: 0 };
}

export const pct = (c: number, t: number) => (t === 0 ? 0 : Math.round((c / t) * 100));

export function levelFor(xp: number) {
  let idx = 0;
  LEVELS.forEach((l, i) => { if (xp >= l.minXp) idx = i; });
  const cur = LEVELS[idx]!;
  const next = LEVELS[idx + 1];
  const progress = next ? (xp - cur.minXp) / (next.minXp - cur.minXp) : 1;
  return { ...cur, next, progress, toNext: next ? next.minXp - xp : 0 };
}

export type Player = { name: string; points: number; accuracy: number };

const TOP: Player[] = [
  { name: "DramaQueen", points: 2450, accuracy: 82 },
  { name: "PlotTwister", points: 2310, accuracy: 79 },
  { name: "MysteryGirl", points: 2120, accuracy: 76 },
];
const PREFIXES = ["Filmy", "Chai", "Twist", "Drama", "Kahaani", "Plot", "Dil", "Saas", "Bahu", "Suspense", "Clue", "Mystery", "Cliff", "Binge", "Raaz", "Sherlock", "Thriller", "Masala", "Episode", "Story"];
const SUFFIXES = ["Guru", "Fan", "Detective", "Queen", "King", "Watcher", "Wali", "Wala", "Hunter", "Ninja", "Master", "Lover", "Spotter", "Buff", "Scout", "Sleuth", "Rani", "Raja", "Junkie", "Pro"];
// 20 x 20 unique, deterministic, number-free names
const fillerName = (i: number) => `${PREFIXES[i % 20]}${SUFFIXES[Math.floor(i / 20) % 20]}`;

/** Overall weekly board: other players only (current user is inserted by rank). */
export const OVERALL_OTHERS: Player[] = [
  ...TOP,
  ...Array.from({ length: 400 }, (_, i) => {
    const r = i + 4;
    return {
      name: fillerName(i),
      points: Math.round(2100 - (r - 4) * 6.95),
      accuracy: 74 - Math.floor(r / 12),
    };
  }),
];

export const FRIENDS: Player[] = [
  { name: "Meera_K", points: 1890, accuracy: 72 },
  { name: "ArjunWatches", points: 1520, accuracy: 68 },
  { name: "Tanvi.S", points: 1310, accuracy: 70 },
  { name: "KabirBinge", points: 980, accuracy: 61 },
  { name: "Nisha_R", points: 640, accuracy: 58 },
];

export const SHOW_BOARD: Player[] = [
  { name: "MysteryGirl", points: 900, accuracy: 90 },
  { name: "RiyaKiFan", points: 800, accuracy: 84 },
  { name: "DramaQueen", points: 700, accuracy: 78 },
  { name: "SherlockSharma", points: 500, accuracy: 70 },
  { name: "ChaiAndTwists", points: 400, accuracy: 66 },
];

export function rankIn(others: Player[], points: number) {
  return 1 + others.filter((p) => p.points > points).length;
}

export function pointsToNextRank(others: Player[], points: number) {
  const above = others.filter((p) => p.points > points).sort((a, b) => a.points - b.points)[0];
  return above ? above.points - points + 1 : 0;
}
