/** @type {import('tailwindcss').Config['theme']['colors']} */
const twColors = require('tailwindcss/colors')

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC ALIASES — único lugar para cambiar los colores de la app
// ─────────────────────────────────────────────────────────────────────────────
//
//  Cada familia (primary, accent, success, warning, danger, info, ai, teal,
//  neutral, pink, orange) expone:
//
//    1. La escala cruda 50→950 importada desde Tailwind (twColors.indigo, etc.).
//       Disponible para tooling y casos extremos pero PROHIBIDA en componentes
//       y templates — ver regla en CLAUDE.md / docs/design-system.md.
//
//    2. Roles semánticos (fg / fg-strong / fg-soft / tint / tint-strong /
//       tint-soft / line) respaldados por CSS variables. ESTOS son los que
//       deben usarse en todo el código (text-primary-fg, bg-warning-tint,
//       border-success-line, etc.). Se invierten automáticamente entre dark y
//       light mode — los valores reales viven en src/styles.css.
//
//  Para cambiar el color primario de indigo a azul:
//    const primaryScale = twColors.blue   ← una sola línea
//    + actualizar los valores --ds-primary-* en src/styles.css
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Construye una familia de color combinando la escala cruda con los roles
 * semánticos respaldados por CSS variables (con prefijo --ds-{name}-*).
 */
function family(name, scale) {
  return {
    ...scale,
    fg:             `var(--ds-${name}-fg)`,
    'fg-strong':    `var(--ds-${name}-fg-strong)`,
    'fg-soft':      `var(--ds-${name}-fg-soft)`,
    tint:           `var(--ds-${name}-tint)`,
    'tint-strong':  `var(--ds-${name}-tint-strong)`,
    'tint-soft':    `var(--ds-${name}-tint-soft)`,
    line:           `var(--ds-${name}-line)`,
  }
}

const primary = family('primary', twColors.indigo)   // acciones principales
const accent  = family('accent',  twColors.cyan)     // destacados secundarios
const success = family('success', twColors.emerald)  // estados positivos
const warning = {
  ...family('warning', twColors.amber),              // atención, beachhead
  'solid-bg': 'var(--ds-warning-solid-bg)',          // fondo sólido (badge BEACHHEAD)
  'solid-fg': 'var(--ds-warning-solid-fg)',          // texto sobre fondo sólido
}
const danger  = family('danger',  twColors.red)      // errores
const info    = family('info',    twColors.blue)     // informativo neutral
const ai      = family('ai',      twColors.violet)   // elementos de IA
const teal    = family('teal',    twColors.teal)     // canales / fríos secundarios
const neutral = family('neutral', twColors.slate)    // texto y fondos neutros (vs / comparison)
const pink    = family('pink',    twColors.pink)     // futuro / IA secundaria
const orange  = family('orange',  twColors.orange)   // costos variables

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
  primary, accent, success, warning, danger, info, ai, teal, neutral, pink, orange,
  // alias retrocompatible: algunos componentes usan twColors.slate / green directos
  // hasta que se migren todos. Estos NO deben usarse en código nuevo.
  slate:   twColors.slate,
  green:   twColors.green,
  red:     twColors.red,
  base, surface, line, ink,
  state,
}
