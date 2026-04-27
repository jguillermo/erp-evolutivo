/** @type {Partial<import('tailwindcss').Config['theme']>} */

// ─────────────────────────────────────────────────────────────────────────────
// FUENTES — único lugar para cambiar familias tipográficas
// ─────────────────────────────────────────────────────────────────────────────
//
//  Para cambiar la fuente principal:
//    const fontSans = ['Geist', 'system-ui', 'sans-serif']   ← una sola línea
//
//  En HTML: font-sans  font-mono  font-display
// ─────────────────────────────────────────────────────────────────────────────

const fontSans    = ['Inter', 'system-ui', '-apple-system', 'sans-serif']
const fontMono    = ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
const fontDisplay = fontSans  // ← apunta a sans; cambiar para headings con fuente distinta

// ─────────────────────────────────────────────────────────────────────────────
// ESCALA DE TAMAÑOS — único lugar para cambiar tamaños de texto
// ─────────────────────────────────────────────────────────────────────────────
//
//  Escala semántica para pantalla. En HTML: text-xs  text-sm  text-base  text-xl
//
//  Guía de uso:
//    2xs   → micro badges, timestamps, anotaciones
//    xs    → labels de tarjeta, tags, encabezados compactos
//    sm    → texto secundario, descripciones cortas
//    md    → cuerpo compacto, subtítulos de sección
//    base  → cuerpo estándar
//    lg    → subencabezados, títulos de sección vacía
//    xl    → encabezados de página (page-header title)
//    2xl   → títulos de sección prominente
//    3xl   → títulos de página principal
//    4xl   → display grande
//    5xl   → hero, splash
// ─────────────────────────────────────────────────────────────────────────────

const fontSize = {
  '2xs':  ['0.625rem', { lineHeight: '0.875rem' }],  //  10px — micro
  'xs':   ['0.72rem',  { lineHeight: '1rem'     }],  //  11.5px — compact labels
  'sm':   ['0.8rem',   { lineHeight: '1.2rem'   }],  //  12.8px — secondary text
  'md':   ['0.875rem', { lineHeight: '1.375rem' }],  //  14px   — body compact
  'base': ['1rem',     { lineHeight: '1.5rem'   }],  //  16px   — body standard
  'lg':   ['1.125rem', { lineHeight: '1.75rem'  }],  //  18px   — subheadings
  'xl':   ['1.25rem',  { lineHeight: '1.75rem'  }],  //  20px   — headings
  '2xl':  ['1.5rem',   { lineHeight: '2rem'     }],  //  24px   — section titles
  '3xl':  ['1.875rem', { lineHeight: '2.25rem'  }],  //  30px   — page titles
  '4xl':  ['2.25rem',  { lineHeight: '2.5rem'   }],  //  36px   — display
  '5xl':  ['3rem',     { lineHeight: '1'        }],  //  48px   — hero

  // ── Print ────────────────────────────────────────────────────────────────
  // Usar con el variant print: de Tailwind → print:text-print-xs
  'print-2xs':  ['5.5px', { lineHeight: '7px'  }],   // micro print
  'print-xs':   ['6.5px', { lineHeight: '9px'  }],   // etiquetas print
  'print-sm':   ['8px',   { lineHeight: '11px' }],   // cuerpo print
  'print-md':   ['9px',   { lineHeight: '12px' }],   // secundario print
  'print-base': ['10px',  { lineHeight: '14px' }],   // base print
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT — lo que se pasa a tailwind.config.js
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  fontFamily: {
    sans:    fontSans,
    mono:    fontMono,
    display: fontDisplay,
  },
  fontSize,
}
