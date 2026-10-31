# Quote Generator

Random quote generator with personalization, built with plain HTML, CSS and JavaScript (ES modules).

## Features

- Random quotes from the [QuoteSlate API](https://github.com/musheer360/QuoteSlate), filtered by the selected categories (Motivation, Love, Wisdom)
- No repeats: shown quotes are tracked in `localStorage`; the history resets only after every available quote has been shown
- Preferences (categories, theme, history) persist between sessions
- Share on X, Facebook, WhatsApp, Telegram and LinkedIn, plus the native share sheet where supported
- Copy to clipboard
- Add your own quotes (stored locally and mixed into the rotation)
- Light / dark theme, responsive layout, fade transitions
- Built-in fallback quotes when the API is unreachable

## Run

ES modules need a server (not `file://`):

    python3 -m http.server 8000

Then open http://localhost:8000.

Note: Facebook and LinkedIn share only the page link, so they work once the app is deployed (e.g. GitHub Pages).

Quotes powered by the QuoteSlate API.
