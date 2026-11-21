# Story Predictor

**Don't just watch the twist. Predict it.**

A product concept for **Story TV**, a short-form Indian drama streaming app: a free, gaming-inspired feature that gives viewers a reason to come back every day.

**Try it:** https://story-predictor.lovable.app (open it and follow the guided 10-step tour)

> This is a clickable prototype. All users, scores and shows are fictional.

## The problem

Viewers of short episodic dramas binge many episodes in one sitting, then leave. The hard part isn't getting them to watch. It's getting them to **come back tomorrow**.

## The solution

**Story Predictor** turns the gap between episodes into something to look forward to.

1. Before the next episode, the viewer gets one question about the story, such as *"Who is hiding the biggest secret?"*
2. They pick an answer and **lock** it. It can't be changed afterwards.
3. When the episode releases, the result is revealed: **+100 free points** for a correct call, a friendly message for a miss (points are never taken away).
4. Points feed a **weekly leaderboard**, and taking part builds a lifetime **level** (Curious Viewer → Plot Follower → Twist Tracker → Story Detective → Master Predictor).

A locked prediction is a promise to return, so each prediction creates a reason to open the app tomorrow.

**Story Comeback** is the companion feature for lapsed viewers. After about a week away, a notification such as *"You never found out who betrayed Riya."* opens a short, spoiler-free recap built only from episodes they've already watched, with one button to continue.

## How it works

| Situation | Behaviour |
|---|---|
| **Daily-release show** | Predictions open before the episode, lock at a deadline, and resolve when it releases. A free viewer still sees whether they were right and what share of viewers agreed, without seeing any of the paid episode. |
| **Completed show (binge)** | Predictions open only for the next unwatched episode and resolve after watching. Watched episodes can't be predicted, and there's no forced daily wait. |
| **Points & levels** | Free and non-monetary: no cash, coins, subscriptions or paid unlocks, and nothing is bought. Levels come from participation (+20 XP) and accuracy (+100 XP per correct call). |
| **Weekly reset** | Leaderboard points reset every week. Lifetime XP and accuracy stay on the profile. |
| **Lapsed viewer** | Personalised nudge plus recap, limited to episodes already watched. |

## What the prototype shows

Home with the story challenge, the prediction and lock flow, the reveal, the weekly leaderboard, the profile and levels, and Story Comeback. A built-in step-by-step guide explains each screen, and Demo Controls switch between user situations (before predicting, locked, next day, lapsed for 7 days, free user at a paid episode).

## Run locally

```sh
npm install
npm run dev
```
