/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// ESPACIADO MÓVIL — escala semántica para pantallas táctiles
// ─────────────────────────────────────────────────────────────────────────────
//
//  Aproximadamente 2× los valores web para cumplir con targets táctiles (mín. 44px).
//  Las mismas clases semánticas (nano, xs, sm…) aplican en los templates —
//  solo los valores cambian según el viewport activo.
//
//  En HTML: py-nano  px-sm  gap-md  mb-lg  p-xl  px-2xl  px-3xl  mb-4xl  px-5xl
//
//  Escala semántica:
//    nano = 2px    xs = 4px    sm = 8px    md = 12px    lg = 16px
//    xl   = 24px   2xl = 32px  3xl = 40px  4xl = 48px   5xl = 64px
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'nano': '2px',    // hairlines, micro borders
  'xs':   '4px',    // tiny gaps, fine separations
  'sm':   '8px',    // compact rows, icon gaps
  'md':   '12px',   // standard gap, badge padding
  'lg':   '16px',   // component padding
  'xl':   '24px',   // larger padding, list indent
  '2xl':  '32px',   // card/page padding
  '3xl':  '40px',   // section margins
  '4xl':  '48px',   // layout sections
  '5xl':  '64px',   // page-level spacing
}
