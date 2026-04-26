# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200/
npm run build      # Production build to dist/
npm run watch      # Dev build with watch mode
npm test           # Run unit tests with Vitest
```

To run a single test file:
```bash
npx ng test --include="**/canvas.component.spec.ts"
```

## Architecture

**Angular 21 SPA** — standalone components, no NgModules. Entry point is `src/main.ts` bootstrapping `src/app/app.ts`.

**Routing** (`src/app/app.routes.ts`): Hash-based routing (`withHashLocation()`). All feature routes are lazy-loaded. Default redirect goes to `/canvas`.

| Route | Component | Status |
|-------|-----------|--------|
| `/canvas` | Canvas — Business Model Canvas | Implemented |

**State management**: Angular Signals only (no NgRx). `ThemeService` (`src/app/theme.service.ts`) manages dark/light mode via a signal and toggles automatically for print via `@HostListener`.


**No API layer** — the app is currently a static stakeholder visualization. All data is hardcoded in the model constants.

## Tech Stack

- Angular 21.2 / TypeScript 5.9 (strict mode)
- Tailwind CSS 3.4 — custom dark theme colors defined in `tailwind.config.js`
- Vitest 4 + Angular TestBed for unit tests
- Prettier (100 char line width, single quotes)

## Conventions

- All new components must be **standalone** and **lazy-loaded** in the router.
- **Before creating or modifying any shared component, read `docs/design-system.md`** — it defines the component catalog, color tokens, testing conventions, and template rules that all shared components must follow.
- **Angular Signals are mandatory in all components** — use `input()` / `input.required()` instead of `@Input()`, `output()` instead of `@Output()`, `computed()` for derived state, and `signal()` for local mutable state. Never use `@Input`, `@Output`, or `BehaviorSubject` in components.
- Use **Angular Signals** for reactive state; avoid introducing external state libraries.
- Dark mode is the default. Light mode activates at print time via `@media print` in `src/styles.css`.
- Emoji icons and gradient text utilities (`.hl`, `.hl-ai`) are part of the design system — follow the patterns in `canvas.component.html`.
- TypeScript strict mode is on — avoid `any`, use proper interfaces from `src/app/models/`.

## Project Context

`app.md` in the repo root is a strategic product document (April 2026) containing the full business model, feature roadmap, pricing rationale, and market analysis. Read it for domain context before implementing new features.
