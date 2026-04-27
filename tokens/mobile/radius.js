/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// RADIO DE BORDE MÓVIL — tokens semánticos de esquinas para pantallas táctiles
// ─────────────────────────────────────────────────────────────────────────────
//
//  Radios más generosos que web: las interfaces táctiles usan esquinas más
//  redondeadas para comunicar interactividad y seguir las convenciones de plataforma.
//
//  En HTML: rounded-badge  rounded-card  rounded-panel (mismas clases, valores distintos)
//
//  Escala semántica:
//    badge  → 6px  — badges inline, tags pequeños
//    card   → 16px — tarjetas principales, paneles
//    panel  → 24px — modales, drawers, sheets grandes
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'badge': '6px',    // rounded-badge — badges inline, tags
  'card':  '16px',   // rounded-card  — tarjetas principales
  'panel': '24px',   // rounded-panel — modales, drawers
}
