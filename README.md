# MetaSearch — Upgraded (Standalone Web)

This is a polished, single-folder web project for a multi-engine search interface.
It includes:
- Modern, responsive UI (Tailwind CDN)
- Dark mode toggle
- Engine categories and selection
- Save/Load presets (localStorage)
- Export/Import presets (JSON)
- Aggregate search mode that builds Google `site:` filters
- Mobile-friendly layout and simple animations (CSS)

## How to run locally (recommended)

1. Open the `metasearch_upgraded` folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey (if you don't have it).
3. Right-click `index.html` and choose **Open with Live Server**.
4. The site will open in your browser and auto-reload when you save changes.

## Files

- `index.html` — main page
- `styles.css` — small custom styles
- `app.js` — application logic (vanilla JS)
- `metasearch_presets.json` — (if you export presets)

## Notes

- Dating engines use `site:` searches (public content only) to respect platform terms of service.
- The app opens multiple tabs for selected engines; allow popups if blocked by browser.

Enjoy! If you'd like, I can:
- Add SVG icons on each engine card.
- Convert to a React + Vite project structure.
- Add user accounts and cloud sync for presets (Firebase/Supabase).
