import lastPromise from "@/assets/last-promise.jpg";
import romance from "@/assets/poster-romance.jpg";
import revenge from "@/assets/poster-revenge.jpg";
import family from "@/assets/poster-family.jpg";

export const POSTERS = { lastPromise, romance, revenge, family };

export type Show = { id: string; title: string; genre: string; poster: string; eps: number; badge?: string };

export const SHOWS: Show[] = [
  { id: "tlp", title: "The Last Promise", genre: "Mystery · Family Drama", poster: lastPromise, eps: 18, badge: "Daily" },
  { id: "bk", title: "Baarish Ke Vaade", genre: "Romance", poster: romance, eps: 32 },
  { id: "ib", title: "Intaqam", genre: "Revenge · Thriller", poster: revenge, eps: 40, badge: "New" },
  { id: "gkl", title: "Ghar Ki Lakshmi", genre: "Family Drama", poster: family, eps: 24 },
];

export const OPTIONS = [
  { id: "husband", letter: "A", label: "Riya's husband", sub: "Aditya swears he's never seen the photo", share: 46 },
  { id: "brother", letter: "B", label: "Her brother", sub: "Vikram changed the topic too quickly", share: 31 },
  { id: "neighbour", letter: "C", label: "The neighbour", sub: "Mrs. Kapoor is always at the window", share: 23 },
] as const;
export type OptionId = (typeof OPTIONS)[number]["id"];
export const CORRECT: OptionId = "brother";

export const BINGE_QUESTIONS = [
  { ep: 8, q: "Will Dadi approve Meera's job in Pune?", options: ["Yes, reluctantly", "No, she forbids it"], correct: 0 },
  { ep: 9, q: "Who took the family jewellery box?", options: ["Chhoti Bahu", "The new cook"], correct: 1 },
  { ep: 10, q: "Will Rohan return for Diwali?", options: ["He comes home", "He stays away"], correct: 0 },
];
