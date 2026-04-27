/** @type {import('tailwindcss').Config['theme']['colors']} */
const twColors = require('tailwindcss/colors')

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC ALIASES — único lugar para cambiar los colores de la app
// ─────────────────────────────────────────────────────────────────────────────
//
//  Para cambiar el color primario de indigo a azul:
//    const primary = twColors.blue   ← una sola línea
//
//  En HTML: bg-primary-500  text-accent-300  border-danger-400
// ─────────────────────────────────────────────────────────────────────────────

const primary = twColors.indigo   // Acciones principales, focus ring, interactivo
const accent  = twColors.cyan     // Destacados secundarios, datos, info
const success = twColors.emerald  // Estados positivos, ingresos, crecimiento
const warning = twColors.amber    // Atención, precaución
const danger  = twColors.red      // Errores, acciones destructivas
const info    = twColors.blue     // Informativo neutral
const ai      = twColors.violet   // Elementos de IA (.hl = ai-300)

// ─────────────────────────────────────────────────────────────────────────────
// SURFACE TOKENS — sistema de capas oscuro (dark-first)
// ─────────────────────────────────────────────────────────────────────────────
//
//  bg-base          → fondo del body / canvas exterior
//  bg-surface        → tarjetas, paneles, drawers
//  bg-surface-raised → elementos elevados (tooltips, dropdowns)
//  border-line       → bordes por defecto
//  border-line-strong → bordes en hover / focus
//  text-ink          → texto principal
//  text-ink-muted    → texto secundario / ayuda
//  text-ink-subtle   → placeholder, timestamps
// ─────────────────────────────────────────────────────────────────────────────

const base    = '#0f1117'

const surface = {
  DEFAULT: '#1a1d27',
  dark:    '#0f1117',
  raised:  '#242838',
  overlay: '#2d3148',
}

const line = {
  DEFAULT: '#2a2d3a',
  strong:  '#4a4d5a',
  subtle:  '#1f2230',
}

const ink = {
  DEFAULT: '#e0e0e0',
  muted:   '#b0b3c0',
  subtle:  '#888888',
  inverse: '#111827',
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE TOKENS — estados interactivos (hover, active, selected, disabled)
// ─────────────────────────────────────────────────────────────────────────────
//
//  Estandariza el aspecto de todos los elementos interactivos.
//  En HTML: hover:bg-state-hover  active:bg-state-active  bg-state-selected
//
//  hover    → superficie elevada (dropdown row al pasar el cursor)
//  active   → superficie más elevada (click / pressed)
//  selected → ítem seleccionado — tinte primario oscuro
//  disabled → fondo apagado para elementos no interactivos
// ─────────────────────────────────────────────────────────────────────────────

const state = {
  hover:    surface.raised,   // '#242838' — elevación sutil al hover
  active:   surface.overlay,  // '#2d3148' — elevación al presionar
  selected: primary[900],     // indigo-900 '#1e1b4b' — ítem seleccionado
  disabled: surface.dark,     // '#0f1117' — elemento no interactivo
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT — lo que se pasa a tailwind.config.js
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  // Aliases semánticos (usar SIEMPRE estos en los templates)
  primary,
  accent,
  success,
  warning,
  danger,
  info,
  ai,

  // Sistema de superficies
  base,
  surface,
  line,
  ink,

  // Estados interactivos
  state,
}
