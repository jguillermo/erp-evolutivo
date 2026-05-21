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


**No API layer** — the app is currently a static stakeholder visualization. The content of each view lives in `data/<view>.json` as plain text; the matching feature component imports the JSON, applies visual decisions (colors, layout, classes) and renders the template.

## Data separation — MANDATORY for every view

Every feature view has two artifacts:

1. **`data/<view>.json`** — the **only** source of textual content. Plain text strings, structured by what the view needs to show. **Never** HTML tags, **never** Tailwind classes, **never** color tokens, **never** `testId`s. Tags like `FASE 1`, `CANAL #1`, `FIJO`, `PRINCIPAL` are content (they appear on screen) and stay in the JSON; the color used to render them is a presentation decision and lives in the component.
2. **`src/app/features/<view>/<view>.component.{ts,html}`** — imports the JSON (`import data from '../../../../data/<view>.json'`), declares the typed interfaces for the JSON shape, maps semantic identifiers (card id, tag value, factor id) to design-token classes/colors, and renders the template by iterating over the data.

When adding a new view: create the JSON file first with the full content, then write the component that consumes it. Refactoring existing views means moving copy out of the template into the JSON without changing what renders. See `data/canvas.json` + `features/canvas/canvas.component.ts` for the reference pattern, and `data/pestel.json` + `features/analisis-estrategico/pestel/pestel.component.ts` for a view with typed block sequences (`paragraph` / `list` / `note` / `info` / `implication`).

JSON support is enabled in `tsconfig.json` (`resolveJsonModule: true`) and `tsconfig.app.json` includes `data/**/*.json`.

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

## Design Token Rules — MANDATORY

These rules apply to **every line of generated code** without exception.

### Colors — no raw hex values

**NEVER** use hex colors, rgba, or Tailwind default palette names directly in templates or component constants:

```html
<!-- ❌ FORBIDDEN -->
<div class="bg-[#1a1d27] text-[#e0e0e0] border-[#2a2d3a]">
<div class="text-[#6366f1] bg-indigo-500">
<div style="color: rgba(99,102,241,0.5)">
```

**ALWAYS** use the semantic tokens defined in `colors.js`:

```html
<!-- ✅ CORRECT -->
<div class="bg-surface text-ink border-line">
<div class="text-primary-400 bg-primary-500/20">
<div class="text-accent-300 border-success-500/30">
```

Color tokens: `primary` · `accent` · `success` · `warning` · `danger` · `info` · `ai`  
Surface tokens: `bg-base` · `bg-surface` · `bg-surface-raised` · `bg-surface-overlay`  
Text tokens: `text-ink` · `text-ink-muted` · `text-ink-subtle`  
Border tokens: `border-line` · `border-line-strong`  
State tokens: `bg-state-hover` · `bg-state-active` · `bg-state-selected` · `bg-state-disabled`

### Typography — no arbitrary size values

**NEVER** use arbitrary font sizes in templates:

```html
<!-- ❌ FORBIDDEN -->
<h1 class="text-[0.72rem]">
<p  class="text-[14px]">
<span class="text-[0.85rem]">
<h3 class="print:text-[8px]">
```

**ALWAYS** use the semantic scale defined in `typography.js`:

```html
<!-- ✅ CORRECT -->
<h1 class="text-xs">
<p  class="text-md">
<span class="text-md">
<h3 class="print:text-print-sm">
```

Screen scale: `text-2xs` · `text-xs` · `text-sm` · `text-md` · `text-base` · `text-lg` · `text-xl` · `text-2xl` · `text-3xl` · `text-4xl` · `text-5xl`  
Print scale: `text-print-2xs` · `text-print-xs` · `text-print-sm` · `text-print-md` · `text-print-base`

Font families: `font-sans` · `font-display` · `font-mono`

### Spacing — semantic letter tokens only

**NEVER** use arbitrary spacing values or raw Tailwind numeric classes:

```html
<!-- ❌ FORBIDDEN -->
<div class="px-[6px] py-[3px] gap-[7px]">
<div class="px-1.5 py-0.75 gap-2 mb-4 p-3">
```

**ALWAYS** use the semantic letter scale defined in `spacing.js`:

```html
<!-- ✅ CORRECT -->
<div class="px-md py-sm gap-lg mb-2xl p-xl">
```

Scale reference: `nano`=1px · `xs`=2px · `sm`=4px · `md`=6px · `lg`=8px · `xl`=12px · `2xl`=16px · `3xl`=20px · `4xl`=24px · `5xl`=40px

### Line-height — named tokens only

**NEVER** use arbitrary line-height values:

```html
<!-- ❌ FORBIDDEN -->
<p class="leading-[1.45]">
<li class="leading-[1.35]">
```

**ALWAYS** use the semantic scale defined in `typography.js`:

```html
<!-- ✅ CORRECT -->
<p class="leading-body">
<li class="print:leading-condensed">
```

Scale: `leading-compact`=1.3 · `leading-condensed`=1.35 · `leading-cozy`=1.4 · `leading-body`=1.45 · `leading-normal`=1.5 (Tailwind std) · `leading-comfortable`=1.6

### Letter-spacing & border-radius — named tokens only

**NEVER** arbitrary values:

```html
<!-- ❌ FORBIDDEN -->
<h3 class="tracking-[1px]">
<span class="rounded-[3px]">
<div class="rounded-[10px]">
```

**ALWAYS** use the tokens defined in `typography.js` / `radius.js`:

```html
<!-- ✅ CORRECT -->
<h3 class="tracking-title">
<span class="rounded-badge">
<div class="rounded-card">
<div class="rounded-panel">
```

Tracking: `tracking-badge`=0.5px · `tracking-title`=1px  
Radius: `rounded-badge`=3px · `rounded`=4px (Tailwind std) · `rounded-md`=6px (Tailwind std) · `rounded-card`=10px · `rounded-panel`=14px

### Shadows — semantic elevation only

**NEVER** arbitrary `box-shadow` values. **ALWAYS** use the tokens from `shadows.js`:

```html
<!-- ✅ CORRECT -->
<div class="shadow-card">    <!-- tarjetas -->
<div class="shadow-raised">  <!-- dropdowns, tooltips -->
<div class="shadow-overlay"> <!-- modales, drawers -->
```

### Interactive states — state tokens only

**NEVER** implement hover/active/selected ad-hoc per component. **ALWAYS** use the state tokens from `colors.js`:

```html
<!-- ✅ CORRECT -->
<li class="hover:bg-state-hover active:bg-state-active">
<li class="bg-state-selected">
<button class="bg-state-disabled" disabled>
```

### Where to change tokens

All token files live in the `tokens/` folder. The active viewport is set in `tailwind.config.js` (`getTokens('web')` or `getTokens('mobile')`).

| To change | Edit this file | Scope |
|---|---|---|
| Color palette or semantic alias | `tokens/colors.js` | Whole app |
| Surface / border / text / state colors | `tokens/colors.js` | Whole app |
| Shadow / elevation | `tokens/shadows.js` | Whole app |
| Breakpoints | `tokens/screens.js` | Whole app |
| Font families / leading / tracking | `tokens/typography.js` | Whole app |
| Font sizes — web | `tokens/web/typography.js` | Web viewport |
| Font sizes — mobile | `tokens/mobile/typography.js` | Mobile viewport |
| Spacing — web | `tokens/web/spacing.js` | Web viewport |
| Spacing — mobile | `tokens/mobile/spacing.js` | Mobile viewport |
| Border radius — web | `tokens/web/radius.js` | Web viewport |
| Border radius — mobile | `tokens/mobile/radius.js` | Mobile viewport |
| Active viewport | `tailwind.config.js` line `getTokens(...)` | Build |

## Project Context

`app.md` in the repo root is a strategic product document (April 2026) containing the full business model, feature roadmap, pricing rationale, and market analysis. Read it for domain context before implementing new features.
