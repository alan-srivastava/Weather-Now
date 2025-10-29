# Weather Now

A small React + Vite single-page app that displays current weather information for a searched city using the public Open‑Meteo APIs (no API key required).

This project was created as a take-home assessment and follows the constraints: React (JSX), plain CSS, and public weather APIs only.

---

## Features

- City search with typeahead suggestions (geocoding via Open‑Meteo).
- Current weather details including temperature, human-friendly condition, humidity, precipitation, wind (speed & direction), sunrise/sunset, and observed timestamp.
- Responsive, plain-CSS UI and accessible color contrasts.
- Single API utility: `src/utils/weatherApi.js` (used by the app).

---

## Quick start (development)

Make sure you have Node.js (>=16) and npm installed.

From the project root (`weather-now`):

```powershell
npm install
npm run dev
```

- Vite dev server will start and print a local URL. Depending on environment it may serve on port 3000 or 5173 — check the terminal output.
- Open the printed Local URL in your browser and search for a city.

---

## Build / Preview

```powershell
npm run build
npm run preview
```

`npm run build` produces a production-ready `dist/` folder.

---

## Project structure (important files)

- `index.html` — HTML entry.
- `src/main.jsx` — React bootstrapping.
- `src/App.jsx` — App container; calls API util and wires components.
- `src/components/WeatherForm.jsx` — Search input + suggestions UI.
- `src/components/WeatherCard.jsx` — Displays the weather details.
- `src/utils/weatherApi.js` — Single API utility file used by the app (geocoding + forecast).
- `src/styles/styles.css` — Global and component styles.

---

## API details

This project uses Open‑Meteo (no API key required):

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`

The API utility requests `current_weather`, `hourly` fields (e.g. `relativehumidity_2m`, `precipitation`), and `daily` fields (sunrise, sunset) and returns a consolidated object consumed by `WeatherCard`.

Note: The geocoding endpoint is used for the suggestion dropdown and for resolving a city to latitude/longitude.

---

## Notes & decisions

- No external weather SDKs are used — the app uses fetch (or axios if present) wrapped in `src/utils/weatherApi.js`.
- Styling is plain CSS to match the assessment constraints.
- The app intentionally uses only public, unauthenticated APIs.

---

## Troubleshooting

- "Dev server not starting / page can't be reached": check the terminal for the Vite URL (port may be `3000` or `5173`) and ensure no other process is using that port.
- If suggestions or weather aren't loading, open DevTools Console to see network errors. Verify requests to `api.open-meteo.com` are not blocked.
- If you changed the API utility file name, ensure imports use `src/utils/weatherApi.js`. If you kept the older shim (`weather.Api.js`), it should re-export the canonical file.

---

## Git / GitHub push notes (safe guidance)

If you push this repository to GitHub and encounter authentication or history conflicts:

- To ensure you authenticate as the correct user, remove cached credentials from Windows Credential Manager or configure SSH keys.
- If the remote already has commits and you intend to replace them, prefer `--force-with-lease` (safer than `--force`):

```powershell
git remote set-url origin git@github.com:<your-username>/Weather-Now.git  # if using SSH
# or for HTTPS:
# git remote set-url origin https://github.com/<your-username>/Weather-Now.git

# Then push (this replaces the remote branch only if it hasn't changed since you last fetched):
git push --force-with-lease origin main
```

Only force-push if you're sure you won't overwrite collaborators' work.

---

## Deployment suggestions

- The app is a static SPA and can be deployed to Vercel, Netlify, GitHub Pages (with a small adapter), or any static hosting provider.
- For Vercel/Netlify: connect your repo and use the `build` command `npm run build` and publish the `dist/` directory.

---

## Tests (manual)

No automated tests are included. For a quick manual check:

1. Run `npm run dev`.
2. Search for a city, e.g. `London` or `San Francisco`.
3. Verify the weather card shows temperature, humidity, precipitation, wind, sunrise/sunset, and that times are in the correct local timezone.

---

## Next steps / Enhancements (optional)

- Add unit tests for `weatherApi.js` (mock fetch) and components (React Testing Library).
- Add icons for weather conditions and a small chart for hourly precipitation/temperature.
- Add caching and offline fallback for repeated requests.

