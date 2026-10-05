# Tender

**Date someone with taste.** Tender is a concept for a dating app built around food. Men post videos of the dishes they cook and use Tender to get better at cooking. Women rate the food, not the face. Every day, Tender suggests one dinner plan, at a restaurant or a cooking class, with someone compatible, and she makes the call.

This repo is Tender's landing page, with interactive iPhone screens showing what the app looks like.

## How it works

1. **Share your cooking.** He posts videos of his best dishes. His cooking is his profile.
2. **Rate the food.** Every woman rates every man's dishes. Every man can see who's rating him and look at her food profile.
3. **One plan a day.** At 5pm each day, Tender pairs people on her rating of his cooking plus their shared food interests, and suggests a plan: a restaurant or a cooking class with a time and a table. He can say he's in. Only she can book it.
4. **Eat good food.** First dates are always out, somewhere public. Cooking at someone's home only unlocks after you've met.

## Profiles

Everyone has a short bio and a few photos. The rest is food:

- **Hers:** favourite foods, favourite restaurants, go-to meals and food she'd travel for.
- **His:** dish videos, signature dish, cooking level, what he's learning and food he'd travel for, plus his ratings and feedback.

## What's on the page

- **Hero:** "Date someone with taste." next to two phones labelled **The cook** and **The critic**.
- **Take a bite (the prototype):** switch between **Be Sarah** and **Be Marcus**.
  - *Sarah:* rate four cooks' dishes, open tonight's plan (picked from your best rating plus shared tastes), then book it or pass.
  - *Marcus:* see who's rating you and open each woman's food profile, open tonight's plan with Sarah, and tap "I'm in". She makes the final call.
  - The steps beside the phone tick off as you go.
- **Two sides of the table:** her profile as he sees it, and his kitchen (ratings, feedback, skill path, lessons).
- **One plan a day:** how plans are chosen (her rating + shared food interests) and the first-date safety rule.
- **Step, booking and second-date screens**, cooking coaches and classes, curated restaurants and experiences, why it matters for dating, and the business model.

## Brand

- **Logo:** a black T-bone steak shaped like a heart, with a white sticker outline and a white T for Tender (`assets/logo.svg`).
- **Positioning line:** "Date someone with taste."
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
