# Story Predictor

Build: Story Predictor — An Interactive Retention Feature for Story TV
Build a polished, high-fidelity, mobile-first interactive prototype for Story TV, an Indian short-form episodic drama streaming platform.
This is a product case prototype for Gameberry Labs. The objective is to demonstrate how a free-to-play gaming-inspired feature can increase daily active users (DAU) by giving viewers a reason to return to stories every day.
Do not build a generic gaming app. This must feel like a real feature integrated into an Indian OTT/microdrama application.

1. Product context
Story TV offers short, vertical Indian dramas across genres such as:
* Family drama
* Romance
* Revenge
* Mystery and suspense
* Crime and thriller
Users frequently binge-watch multiple episodes in one session. The retention challenge is getting them to return on subsequent days.
The proposed solution is called Story Predictor.
Users predict what will happen next in a story, earn non-monetary points for accurate predictions, track their performance and compete in weekly leaderboards.
A secondary feature called Story Comeback helps lapsed viewers return through personalised story reminders and short recaps.
The core product thesis:
"Don't just watch the twist. Predict it."

2. Visual design
Create a premium, entertainment-focused Indian OTT interface.
Design requirements:
* Mobile-first layout, optimised for a 390 × 844 mobile viewport.
* Dark charcoal/black background.
* Story TV-inspired deep red accent colour.
* White typography with muted grey secondary text.
* Bold cinematic drama posters.
* Rounded cards and subtle gradients.
* Strong visual hierarchy.
* Minimal, premium gaming elements.
* Smooth transitions and micro-interactions.
* Use a bottom navigation bar.
Avoid:
* A dashboard-style layout.
* Excessive gamification badges.
* Childish cartoon visuals.
* Bright casino-style colours.
* Real-money gaming aesthetics.
* Generic admin panels.
Use fictional Indian characters and fictional drama titles. Do not use copyrighted show footage or actual actors.

3. Main navigation
Create four bottom navigation tabs:
1. Home
2. Predict
3. Leaderboard
4. Profile
Every navigation element must work.

4. Screen 1: Home
Create an OTT-style homepage.
Top section:
* Story TV logo.
* Greeting: "Good evening!"
* User's current prediction level.
* Notification icon.
Main content:
* Featured drama: "The Last Promise"
* Genre: Mystery / Family Drama
* Episode count: 18
* Cinematic vertical poster.
* Continue Watching section.
* Trending Indian dramas.
* Daily releases section.
Add a visually prominent card:
"YOUR NEXT STORY CHALLENGE"
"Will Riya discover who has been hiding the truth?"
Button: "Make your prediction"
Include a small points summary:
* 1,240 prediction points
* Level 4: Story Detective
* Current weekly rank: #128
Tapping the challenge should open the prediction flow.

5. Screen 2: Prediction experience
This is the most important screen.
Create a fictional show called "The Last Promise".
Story context:
Riya discovers a photograph in her husband's drawer. Her husband claims he knows nothing about it. A mysterious phone call suggests someone in the family is hiding a secret.
Show a cinematic poster or scene illustration.
Question:
"Who do you think is hiding the biggest secret?"
Provide three selectable answers:
A. Riya's husband
B. Her brother
C. The neighbour
Each option should be a clickable card.
After selection:
* Highlight the selected answer.
* Show a "Lock Prediction" button.
* Allow users to change their answer before locking.
* Once locked, prevent further changes.
* Display a prediction-locked confirmation.
Add:
* Episode number.
* Prediction deadline.
* Points available: 100.
* Current weekly accuracy.
The interface should clearly communicate that predictions must be locked before the episode outcome is revealed.

6. Screen 3: Prediction reveal
Create a second state for when the next episode has released.
Display:
"THE REVEAL IS HERE"
If the user's prediction is correct:
* Show a tasteful success animation.
* Award 100 points.
* Display "You called it!"
* Show their updated accuracy.
* Show their leaderboard position change.
If incorrect:
* Display a friendly result.
* Do not punish the user by removing previously earned points.
* Encourage them to try the next prediction.
For users who haven't unlocked the episode, create a spoiler-conscious result card:
* Reveal whether their prediction was correct.
* Show the percentage of viewers who selected the same answer.
* Award the prediction points.
* Do not show the actual scene, dialogue or episode footage.
* Keep the paid episode locked.
Include a button: "Continue the story" that takes the user to the locked episode screen.
Make it clear that prediction points are free, non-monetary and cannot be exchanged for cash, coins, subscriptions or paid content.

7. Screen 4: Weekly leaderboard
Create a competitive but friendly leaderboard.
Title: "This Week's Story Detectives"
Show:
* Rank
* Username
* Prediction points
* Accuracy percentage
Include fictional users and the current user.
Example:
1. DramaQueen — 2,450 points
2. PlotTwister — 2,310 points
3. MysteryGirl — 2,120 points
4. You — 1,240 points
Include:
* Current rank.
* Points needed to reach the next rank.
* Weekly reset countdown.
* Progress bar towards the next level.
Provide a separate filter for:
* Overall
* Friends (demonstration data only)
* Show-specific leaderboard
The leaderboard should reset weekly, while lifetime experience and accuracy remain on the user's profile.
No money, betting, entry fees or cash prizes.

8. Screen 5: Profile and progression
Create a user profile containing:
* Username.
* Current level.
* Lifetime prediction points.
* Overall prediction accuracy.
* Total predictions.
* Correct predictions.
* Favourite genres.
* Favourite shows.
Create five progression levels:
Level 1: Curious Viewer
Level 2: Plot Follower
Level 3: Twist Tracker
Level 4: Story Detective
Level 5: Master Predictor
Show a progression bar and the next milestone.
Make progression based on participation and prediction accuracy, not spending.

9. Supporting feature: Story Comeback
Create a separate interactive flow for lapsed users.
Simulate a user who hasn't opened Story TV for seven days.
Show a notification preview:
"You never found out who betrayed Riya."
On opening it, show:
"Welcome back. Here's what happened in your story."
Display a short personalised recap:
* Riya discovered a photograph in her husband's drawer.
* Her brother denied knowing anything about it.
* An unknown caller revealed a new clue.
* The mystery remains unresolved.
Include a cinematic poster and a prominent button:
"Continue from Episode 15"
The recap should be spoiler-free and based only on episodes the user has previously watched.

10. Important product logic
Implement these scenarios:
A. Daily-release shows:
* Predictions are available before the scheduled episode release.
* Predictions lock at the defined deadline.
* Once the episode releases, results can be resolved.
* Users can see prediction accuracy without necessarily watching the paid episode.
* Paid episode footage and detailed story content remain locked.
B. Completed catalogue shows:
* Predictions are available only before the user watches the next eligible episode.
* Predictions resolve after the episode is watched.
* Do not allow predictions for episodes the user has already watched.
C. Binge-watchers:
* Allow users to participate in successive episode predictions during a binge.
* Do not artificially force a daily wait for content that is already available.
* Use weekly progression and leaderboard competition as additional engagement mechanics.
D. User progression:
* Points are non-monetary.
* No conversion to cash, coins or paid unlocks.
* Weekly leaderboard points reset.
* Lifetime experience does not reset.

11. Demo interactions
Make the prototype fully clickable.
Include:
* Selecting a prediction.
* Locking a prediction.
* Viewing a prediction result.
* Awarding points.
* Updating prediction accuracy.
* Updating leaderboard rank.
* Switching between navigation tabs.
* Opening the Story Comeback notification.
* Viewing the recap.
* Continuing to an episode.
* Simulating a new daily episode release.
Add a discreet "Demo Controls" panel that lets the evaluator switch between:
1. Active user before prediction.
2. User who has locked a prediction.
3. User returning the next day.
4. Lapsed user returning after seven days.
5. Free user at a paid episode cliffhanger.
This should allow the complete user journey to be demonstrated without waiting for real time.
Use React state and realistic mock data. No external APIs, authentication, payment integrations or backend are required.
All displayed metrics and user data should be clearly treated as fictional prototype data.

12. Quality requirements
The final result should look like a real, launch-ready mobile product concept, not a wireframe.
Prioritise the following screens:
1. Prediction card.
2. Prediction reveal.
3. Weekly leaderboard.
4. Story Comeback.
The evaluator should be able to understand the feature in less than two minutes.
Make every important button functional. Avoid dead buttons and placeholder interactions.
The finished experience should communicate one simple idea:
Story TV already gives users stories worth watching. Story Predictor gives them another reason to return tomorrow.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://story-predictor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/003afd85-6bc0-487d-863b-f1a16555db59).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
