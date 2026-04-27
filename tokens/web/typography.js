/** @type {import('tailwindcss').Config['theme']['fontSize']} */

// ─────────────────────────────────────────────────────────────────────────────
// TIPOGRAFÍA WEB — tamaños de fuente para pantalla de escritorio / tablet
// ─────────────────────────────────────────────────────────────────────────────
//
//  Escala compacta optimizada para UIs densas de escritorio.
//  Mínimo: 10px (2xs) — adecuado para elementos micro en pantallas de alta densidad.
//
//  En HTML: text-xs  text-sm  text-base  text-xl
//
//  Guía de uso:
//    2xs   → 10px — micro badges, timestamps, anotaciones
//    xs    → 11.5px — labels de tarjeta, tags, encabezados compactos
//    sm    → 12.8px — texto secundario, descripciones cortas
//    md    → 14px — cuerpo compacto, subtítulos de sección
//    base  → 16px — cuerpo estándar
//    lg    → 18px — subencabezados, títulos de sección vacía
//    xl    → 20px — encabezados de página
//    2xl   → 24px — títulos de sección prominente
//    3xl   → 30px — títulos de página principal
//    4xl   → 36px — display grande
//    5xl   → 48px — hero, splash
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
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
