# Tender

**Let's spice things up.** Tender is a concept for a dating app built around food. Men share videos of their best dishes, women rate the cooking and choose who they match with, and every match is pointed at a real meal: a booked table, a cooked dinner, or a food adventure.

This repo is the product's landing page, with interactive iPhone screens showing what the app would look like. It's part of a series of product, design and technical portfolio prototypes.

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

- **Logo:** a T-bone steak cut in the shape of a heart. The bone forms the T for Tender (`assets/logo.svg`).
- **Tagline:** "Let's spice things up."
- **Palette:** chili red `#C8321F` → coral `#DC6449` → peach `#EBA47F` → cream `#F7E6C8`, with black step cards and a tiled food-icon pattern.
- **Type:** Bebas Neue for display, Bricolage Grotesque for text. Both are self-hosted under the SIL Open Font License (`assets/fonts`).

## Run it

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

To publish with GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Notes

- People, restaurants, coaches and pricing are fictional. Photos are hotlinked from Unsplash; if one fails to load, a warm gradient shows in its place.
- The waitlist form is a demo and doesn't send anything.
