/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINTS — puntos de corte orientados a ERP de escritorio (viewport-agnostic)
// ─────────────────────────────────────────────────────────────────────────────
//
//  Reemplaza la escala estándar de Tailwind (640/768/1024/1280/1536).
//  El foco del ERP es escritorio (lg/xl); sm mantiene compatibilidad con tablets.
//
//  En HTML: sm:px-0  md:grid-cols-2  lg:grid-cols-3  xl:gap-xl
//
//  Escala semántica:
//    sm  → 640px  — tablet / mobile landscape (mantiene sm:class existentes)
//    md  → 1024px — laptop estándar
//    lg  → 1280px — desktop
//    xl  → 1440px — desktop grande
//    2xl → 1920px — ultrawide
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'sm':  '640px',   // tablet landscape (compatible con sm: existentes)
  'md':  '1024px',  // laptop
  'lg':  '1280px',  // desktop
  'xl':  '1440px',  // desktop grande
  '2xl': '1920px',  // ultrawide
}
