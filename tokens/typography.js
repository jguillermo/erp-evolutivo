/** @type {Partial<import('tailwindcss').Config['theme']>} */

// ─────────────────────────────────────────────────────────────────────────────
// TIPOGRAFÍA COMPARTIDA — viewport-agnostic
// ─────────────────────────────────────────────────────────────────────────────
//
//  Este archivo define lo que NO cambia entre viewports:
//    - familias tipográficas (fontFamily)
//    - interlineado (lineHeight)
//    - espaciado de letras (letterSpacing)
//
//  Los tamaños de fuente (fontSize) son viewport-específicos:
//    → tokens/web/typography.js
//    → tokens/mobile/typography.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Familias ─────────────────────────────────────────────────────────────────
//  Para cambiar la fuente principal:
//    const fontSans = ['Geist', 'system-ui', 'sans-serif']   ← una sola línea
//
//  En HTML: font-sans  font-mono  font-display

const fontSans    = ['Inter', 'system-ui', '-apple-system', 'sans-serif']
const fontMono    = ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
const fontDisplay = fontSans  // ← apunta a sans; cambiar para headings con fuente distinta

// ── Interlineado ─────────────────────────────────────────────────────────────
//  Tailwind estándar incluye: leading-none(1) tight(1.25) snug(1.375) normal(1.5)
//  Este archivo añade los valores intermedios que necesita esta UI.
//
//  En HTML: leading-compact  leading-condensed  leading-cozy  leading-body  leading-comfortable

const lineHeight = {
  'compact':     '1.3',   // etiquetas badge, texto muy apretado
  'condensed':   '1.35',  // cuerpo print, listas comprimidas
  'cozy':        '1.4',   // descripciones, texto secundario
  'body':        '1.45',  // ítems de lista, párrafos de cuerpo
  'comfortable': '1.6',   // subtítulos de página, lectura generosa
  // leading-normal = 1.5 ya está en Tailwind estándar — no duplicar
}

// ── Espaciado de letras ───────────────────────────────────────────────────────
//  En HTML: tracking-badge  tracking-title

const letterSpacing = {
  'badge': '0.5px',   // badge text, micro letter-spacing
  'title': '1px',     // card titles en uppercase
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  fontFamily: {
    sans:    fontSans,
    mono:    fontMono,
    display: fontDisplay,
  },
  lineHeight,
  letterSpacing,
}
