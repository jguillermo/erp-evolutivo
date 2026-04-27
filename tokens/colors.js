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
// SURFACE / INK / LINE / STATE — backed by CSS variables
// ─────────────────────────────────────────────────────────────────────────────
//
//  Los valores reales están en src/styles.css:
//    :root       → modo oscuro (por defecto)
//    html.light  → modo claro (activado por ThemeService)
//    @media print → modo claro forzado (sin JavaScript)
//
//  Esto permite que bg-surface, text-ink, border-line, etc. cambien de modo
//  automáticamente sin que ningún componente cambie su código.
// ─────────────────────────────────────────────────────────────────────────────

const base = 'var(--ds-base)'

const surface = {
  DEFAULT: 'var(--ds-surface)',
  dark:    'var(--ds-base)',
  raised:  'var(--ds-surface-raised)',
  overlay: 'var(--ds-surface-overlay)',
}

const line = {
  DEFAULT: 'var(--ds-line)',
  strong:  'var(--ds-line-strong)',
  subtle:  'var(--ds-line-subtle)',
}

const ink = {
  DEFAULT: 'var(--ds-ink)',
  muted:   'var(--ds-ink-muted)',
  subtle:  'var(--ds-ink-subtle)',
  inverse: 'var(--ds-ink-inverse)',
}

const state = {
  hover:    'var(--ds-state-hover)',
  active:   'var(--ds-state-active)',
  selected: 'var(--ds-state-selected)',
  disabled: 'var(--ds-state-disabled)',
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  primary, accent, success, warning, danger, info, ai,
  base, surface, line, ink,
  state,
}
