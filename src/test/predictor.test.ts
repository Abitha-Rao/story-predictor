import { describe, expect, it } from "vitest";
import { INITIAL_STATS, OVERALL_OTHERS, levelFor, rankIn, resolvePrediction, weeklyReset } from "@/lib/predictor";

describe("Story Predictor rules", () => {
  it("correct prediction awards 100 points", () => {
    expect(resolvePrediction(INITIAL_STATS, true).weeklyPoints).toBe(1340);
  });
  it("wrong prediction never removes earned points", () => {
    expect(resolvePrediction(INITIAL_STATS, false).weeklyPoints).toBe(1240);
  });
  it("weekly reset keeps lifetime XP and accuracy", () => {
    const r = weeklyReset(INITIAL_STATS);
    expect(r.weeklyPoints).toBe(0);
    expect(r.lifetimeXp).toBe(7420);
    expect(r.correctPredictions).toBe(31);
  });
  it("starting user is Level 4 Story Detective at weekly rank #128", () => {
    expect(levelFor(INITIAL_STATS.lifetimeXp).name).toBe("Story Detective");
    expect(rankIn(OVERALL_OTHERS, 1240)).toBe(128);
  });
});
