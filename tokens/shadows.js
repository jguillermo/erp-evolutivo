/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// SOMBRAS — escala semántica de elevación (viewport-agnostic)
// ─────────────────────────────────────────────────────────────────────────────
//
//  Las sombras usan el color base (#0f1117) con distintas opacidades.
//  Para cambiar el tinte de sombra globalmente, cambia el rgb aquí.
//
//  En HTML: shadow-card  shadow-raised  shadow-overlay
//
//  Escala semántica:
//    card    → tarjetas, paneles con elevación sutil
//    raised  → dropdowns, tooltips, elementos flotantes
//    overlay → modales, drawers, sheets
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'card':    '0 2px  8px 0 rgba(15, 17, 23, 0.50)',  // elevación mínima — tarjetas
  'raised':  '0 4px 12px 0 rgba(15, 17, 23, 0.60)',  // elevación media — dropdowns
  'overlay': '0 8px 32px 0 rgba(15, 17, 23, 0.75)',  // elevación alta — modales
}
