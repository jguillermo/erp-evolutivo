/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// ESPACIADO WEB — escala semántica para pantalla de escritorio / tablet
// ─────────────────────────────────────────────────────────────────────────────
//
//  Se añade sobre la escala estándar de Tailwind (0.5=2px, 1=4px, 2=8px, ...).
//  Usar siempre estas claves semánticas en el código; nunca valores numéricos arbitrarios.
//
//  En HTML: py-nano  px-sm  gap-md  mb-lg  p-xl  px-2xl  px-3xl  mb-4xl  px-5xl
//
//  Escala semántica:
//    nano = 1px    xs = 2px    sm = 4px    md = 6px    lg = 8px
//    xl   = 12px   2xl = 16px  3xl = 20px  4xl = 24px  5xl = 40px
//
//  Normalización (valores originales que se redondean):
//    1.5px → nano(1px)  3px → sm(4px)  5px → md(6px)  7px,9px → lg(8px)  10px → xl(12px)
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'nano': '1px',    // hairlines, micro borders
  'xs':   '2px',    // tiny gaps, fine separations
  'sm':   '4px',    // compact rows, icon gaps (3px rounds up)
  'md':   '6px',    // standard gap, badge padding (5px rounds up)
  'lg':   '8px',    // component padding (7px and 9px round to 8px)
  'xl':   '12px',   // larger padding, list indent (10px rounds up)
  '2xl':  '16px',   // card/page padding
  '3xl':  '20px',   // section margins
  '4xl':  '24px',   // layout sections
  '5xl':  '40px',   // page-level spacing
}
