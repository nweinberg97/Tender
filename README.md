# Tender

**Let's spice things up.** Tender is a concept for a dating app built around food. Men post videos of the dishes they cook. Women rate the cooking instead of swiping on photos, and only women can make the first move. Every match is pointed at a real meal: a booked table, a cooked dinner, or a food adventure.

This repo is Tender's landing page, with interactive iPhone screens showing what the app looks like.

## How it works

1. **Share your cooking.** He posts videos of his best dishes. His cooking is his profile.
2. **Find your match.** She rates his dishes. A great rating is how she shows interest, and she makes the move by sending her rating with a first line. He can only reply.
3. **Eat good food.** The match opens with food openers, then a planner built from her favourite restaurants and his cooking: go out, he cooks, coffee, or a food adventure.

## Two sides of the table

- **Her profile** is her taste: profile photo, favourite foods, favourite restaurants and go-to meals.
- **His profile** is his cooking: profile photo, dish videos, signature dish, cooking level and what he's learning.
- **He gets better.** Every rating comes with feedback, and coaches and classes help him level up, so men use Tender to learn to cook, not only to date.

## What's on the page

- **A working demo in the hero phone**, with a "Try it yourself" guide beside it. You're Sarah: rate a cook's dish with the stars, tap **Make the move**, and pick a first line. **Skip** shows the next cook. The steps tick off as you go.
- **Her profile and his kitchen:** what he sees when she makes the move, and his ratings, feedback and skill path.
- **Step screens** for posting a dish, rating and compatibility, and booking a table.
- **After-the-match screens:** the match, the conversation, the date planner, and a cook-at-home plan with a split shopping list.
- **Extras:** cooking coaches and classes, plus curated restaurant picks and food experiences.
- **Why it matters for dating:** where swipe apps break down and Tender's bets, with match-to-date rate as the north-star metric.
- **Business model:** restaurant partnerships and a Tender Premium tier (meal prep, cooking tutorials, dining discounts, coach credits).

## Brand

- **Logo:** a black T-bone steak shaped like a heart, with a white sticker outline and a white T for Tender (`assets/logo.svg`).
- **Tagline:** "Let's spice things up."
- **Look:** a chili red to cream gradient with the smoke and flame from the original promo art, a coral (`#DD6750`) food-pattern background, black step cards, and a classic notched iPhone that opens on the coral splash screen.
- **Type:** Bebas Neue for the wordmark and headlines, Lora for step-card subtitles, Bricolage Grotesque for body text. All self-hosted under the SIL Open Font License (`assets/fonts`).

## Run it

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

To publish with GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Notes

- People, restaurants, coaches and pricing are fictional. Photos are hotlinked from Unsplash; if one fails to load, a warm gradient shows in its place.
- The waitlist form is a demo and doesn't send anything.
