# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ERP Evolutivo + IA Asesora** — A product vision visualization for a modular, AI-powered ERP system targeting Spanish-speaking SMEs (PYMEs). The repository is currently a **single self-contained HTML file** that serves as an interactive product canvas for stakeholders.

## Deployment

The project deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. No build step required — files are served as-is.

To preview locally, open `index.html` directly in a browser (no server needed).

## Architecture

`index.html` is the entire application — all HTML, CSS, and JavaScript are embedded in one file. There are no external dependencies, no package manager, no bundler.

**Five main tabs** (driven by vanilla JS tab switching):
- **Canvas** — Business Model Canvas visualization
- **Árbol Evolutivo** — The 9 evolutionary branches and their 4-5 maturity levels
- **IA Asesora** — AI advisor features and mockup UI
- **Triggers** — Module activation rules (automatic, suggested, manual, AI proactive)
- **Pricing** — Four-tier pricing model (Semilla / Crecimiento / Empresa / Corporativo)

**The 9 evolutionary branches** (modules that unlock progressively):
`👥 Equipo` · `💰 Ventas` · `📍 Locaciones` · `📦 Inventario` · `📊 Finanzas` · `❤️ Clientes` · `🌐 Digital` · `🧠 Analítica` · `🏭 Producción`

## Key Design Decisions

- **Dark theme** with a consistent color palette: purples, teals, greens, oranges — each branch has its own accent color.
- **Responsive**: media queries at 1000px (tablet) and 600px (mobile).
- Pricing uses Peruvian soles (S/) — target market is Peru/LATAM.
- AI tiers follow the same branch-level progression: Básica → Estratégica → Predictiva → Ejecutiva.