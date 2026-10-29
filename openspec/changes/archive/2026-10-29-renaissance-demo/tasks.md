## 1. README

- [x] 1.1 Rewrite section 1 as five present-tense sentences on `renaissance/index.html` (atelier on one screen with Flora as the model, Match me, re-spin the shoes, the daily muse and the stylist's note, wear it and the calendar); verify by counting the sentences and checking each against the page
- [x] 1.2 Add "Why a second look" under section 1: a completely new appearance because the first never felt like mine, painting and an elegant style motivate me to keep using it, and the daily quote and stylist's note give each day something new; verify it reads as my own reasons
- [x] 1.3 Update section 3's polaroid bullet and add the renaissance additions (framed board, painted models, re-spin one piece, daily muse); verify no bullet describes only the original look
- [x] 1.4 Update section 4's two polaroid checks so they hold for polaroids and framed pieces; verify against both pages
- [x] 1.5 Add `renaissance/index.html` to "Running it", with `python -m http.server 8000` as the way I serve it; verify the command opens the page

## 2. Check and ship

- [x] 2.1 Run `node --test` and verify all 8 tests pass
- [x] 2.2 Validate the change with `openspec validate renaissance-demo --strict` and verify it passes
- [x] 2.3 Commit, push the `renaissance-style` branch to `origin` (esst-prog2/ms_match) and verify the commits are visible on GitHub
- [x] 2.4 Archive the change with `openspec archive renaissance-demo` and verify `outfit-display` holds the new requirements
