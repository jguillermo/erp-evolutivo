/** @type {import('tailwindcss').Config['theme']['fontSize']} */

// ─────────────────────────────────────────────────────────────────────────────
// TIPOGRAFÍA MÓVIL — tamaños de fuente para pantallas táctiles
// ─────────────────────────────────────────────────────────────────────────────
//
//  Escala ampliada para legibilidad en pantallas pequeñas y distancias de lectura
//  táctiles. Mínimo: 12px (2xs) — por debajo no es legible en móvil.
//
//  En HTML: text-xs  text-sm  text-base  text-xl (mismas clases, valores distintos)
//
//  Guía de uso:
//    2xs   → 12px — micro elementos, timestamps compactos
//    xs    → 13px — labels secundarios, tags
//    sm    → 14px — texto de apoyo, descripciones
//    md    → 16px — cuerpo compacto (mínimo recomendado para móvil)
//    base  → 17px — cuerpo estándar
//    lg    → 20px — subencabezados
//    xl    → 24px — encabezados de página
//    2xl   → 28px — títulos de sección prominente
//    3xl   → 36px — títulos de página principal
//    4xl   → 44px — display grande
//    5xl   → 56px — hero, splash
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  '2xs':  ['0.75rem',    { lineHeight: '1rem'     }],  //  12px — micro
  'xs':   ['0.8125rem',  { lineHeight: '1.25rem'  }],  //  13px — compact labels
  'sm':   ['0.875rem',   { lineHeight: '1.375rem' }],  //  14px — secondary text
  'md':   ['1rem',       { lineHeight: '1.5rem'   }],  //  16px — body compact
  'base': ['1.0625rem',  { lineHeight: '1.625rem' }],  //  17px — body standard
  'lg':   ['1.25rem',    { lineHeight: '1.875rem' }],  //  20px — subheadings
  'xl':   ['1.5rem',     { lineHeight: '2rem'     }],  //  24px — headings
  '2xl':  ['1.75rem',    { lineHeight: '2.5rem'   }],  //  28px — section titles
  '3xl':  ['2.25rem',    { lineHeight: '2.75rem'  }],  //  36px — page titles
  '4xl':  ['2.75rem',    { lineHeight: '3.25rem'  }],  //  44px — display
  '5xl':  ['3.5rem',     { lineHeight: '1'        }],  //  56px — hero

  // ── Print ────────────────────────────────────────────────────────────────
  // El print scale es independiente del viewport — mismos valores que web
  'print-2xs':  ['5.5px', { lineHeight: '7px'  }],
  'print-xs':   ['6.5px', { lineHeight: '9px'  }],
  'print-sm':   ['8px',   { lineHeight: '11px' }],
  'print-md':   ['9px',   { lineHeight: '12px' }],
  'print-base': ['10px',  { lineHeight: '14px' }],
}
