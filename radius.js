/** @type {Record<string, string>} */

// ─────────────────────────────────────────────────────────────────────────────
// RADIO DE BORDE — tokens semánticos de esquinas
// ─────────────────────────────────────────────────────────────────────────────
//
//  Se añade sobre la escala estándar de Tailwind (rounded=4px, rounded-md=6px…).
//  Usar siempre estos tokens; nunca valores arbitrarios (rounded-[10px]).
//
//  En HTML: rounded-badge  rounded-card  rounded-panel
//
//  Escala semántica:
//    badge  → 3px  — badges inline, tags pequeños
//    card   → 10px — tarjetas principales, paneles
//    panel  → 14px — modales, drawers, sheets grandes
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  'badge': '3px',    // rounded-badge — badges inline, tags
  'card':  '10px',   // rounded-card  — tarjetas principales
  'panel': '14px',   // rounded-panel — modales, drawers
}
