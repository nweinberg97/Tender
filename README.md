# Tender

**Let's spice things up.** Tender is a concept for a dating app built around food. Men share videos of their best dishes, women rate the cooking and choose who they match with, and every match is pointed at a real meal: a booked table, a cooked dinner, or a food adventure.

This repo is Tender's landing page, with interactive iPhone screens showing what the app looks like.

## How it works

1. **Share your cooking.** He uploads videos of his best dishes, his cooking level and his signature plate.
2. **Find your match.** She rates his dishes and swipes on the best cooks. A playful food-compatibility score gives them a reason to talk.
3. **Eat good food.** Matching opens with food conversation starters, then a planner: go out, cook together, coffee, or a food adventure. Restaurant picks, booking and shared shopping lists turn the match into a date.

## What's on the page

- **A working discovery deck in the hero phone.** Rate a dish with stars (4–5 likes him, 1–2 passes), drag the card, or use the buttons. Liking Marcus or Theo triggers the match moment with tap-to-send openers. Arrow keys work when the phone has focus.
- **Step screens** for posting a dish, compatibility and rating, and booking a table.
- **After-the-match screens:** the match, the conversation with quick actions, the date planner, and Cook Together with a split shopping list.
- **Extras:** cooking coaches and classes (solo or with a match), plus curated restaurant picks and food experiences.
- **Why it matters for dating:** where swipe apps break down and Tender's bets, with match-to-date rate as the north-star metric.
- **Business model:** restaurant partnerships and a Tender Premium tier (meal prep, cooking tutorials, dining discounts, coach credits).

## Brand

- **Logo:** a black T-bone steak shaped like a heart, with a white sticker outline and a white T for Tender (`assets/logo.svg`).
- **Tagline:** "Let's spice things up."
- **Look:** a chili red to cream gradient with smoke and flame, a coral (`#DD6750`) food-pattern background, black step cards, and a classic notched iPhone that opens on the coral splash screen.
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
