import { createFileRoute } from "@tanstack/react-router";
import { StoryApp } from "@/components/story/StoryApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Story Predictor — Story TV" },
      { name: "description", content: "Predict the next twist in Story TV dramas, earn free points and climb the weekly leaderboard." },
      { property: "og:title", content: "Story Predictor — Story TV" },
      { property: "og:description", content: "Don't just watch the twist. Predict it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;900&family=Manrope:wght@400;600;700;800&display=swap" },
    ],
  }),
  component: StoryApp,
});
