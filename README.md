# 7B timetable (PWA)

A small installable web app showing the 7B class timetable. Each user picks their
own groups in Settings; the choice is stored only on their device.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell |
| `app.js` | App logic (day view, week view, settings, swipe, orientation) |
| `style.css` | Styles |
| `timetable.json` | **The timetable data – the only file to edit when the timetable changes** |
| `manifest.webmanifest`, `sw.js`, `icons/` | PWA (install + offline) |

## Publishing on GitHub Pages

1. Upload all files (keep the `icons` folder) to a repository.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open the Pages URL on the phone and install:
   - Android (Chrome): menu → *Install app* / *Add to Home screen*
   - iPhone (Safari): Share → *Add to Home Screen*

## Updating the timetable (new school period)

Edit `timetable.json`:

- `validFrom`, `validTo` – the period's dates (a warning appears after `validTo`).
- `lunch` – per day (`E` `T` `K` `N` `R`): lunch time and the lesson it shifts
  (`lesson`, `lessonStart`, `lessonEnd`).
- `days` – per day, 9 slots (periods 1–9). Each slot is a list of lessons:
  - `s` subject code, `r` room
  - `t` teacher (shown only for group lessons)
  - `g` group: `"b:SK"`, `"ik:Leibur"`, `"k6:CON"`, `"k7:TE"`, or `"lak"` (optional).
    No `g` = everyone has this lesson.
- New subject code → add its colour and icon under `subjects`.

After editing, also change `CACHE` in `sw.js` (e.g. `v1` → `v2`) so installed apps
refresh their offline copy reliably.
