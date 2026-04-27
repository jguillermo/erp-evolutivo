// ─────────────────────────────────────────────────────────────────────────────
// TOKENS — punto de entrada del design system
// ─────────────────────────────────────────────────────────────────────────────
//
//  Uso en tailwind.config.js:
//
//    const { getTokens } = require('./tokens')
//    const tokens = getTokens('web')      // ← 'web' | 'mobile'
//
//  Archivos viewport-agnostic (compartidos):
//    tokens/colors.js      → colores semánticos + superficies + estados
//    tokens/shadows.js     → escala de elevación
//    tokens/screens.js     → breakpoints
//    tokens/typography.js  → fontFamily, lineHeight, letterSpacing
//
//  Archivos viewport-específicos:
//    tokens/{viewport}/spacing.js    → escala de espaciado
//    tokens/{viewport}/typography.js → escala de tamaños de fuente
//    tokens/{viewport}/radius.js     → radios de borde
//
//  Para añadir un nuevo viewport, crear tokens/{nuevoViewport}/ con los tres archivos.
// ─────────────────────────────────────────────────────────────────────────────

const colors     = require('./colors')
const shadows    = require('./shadows')
const screens    = require('./screens')
const sharedTypo = require('./typography')

/**
 * Devuelve los tokens completos para el viewport indicado.
 * @param {'web' | 'mobile'} viewport
 */
function getTokens(viewport) {
  const spacing  = require(`./${viewport}/spacing`)
  const fontSize = require(`./${viewport}/typography`)
  const radius   = require(`./${viewport}/radius`)

  return {
    // viewport-agnostic
    colors,
    boxShadow:     shadows,
    screens,
    fontFamily:    sharedTypo.fontFamily,
    lineHeight:    sharedTypo.lineHeight,
    letterSpacing: sharedTypo.letterSpacing,

    // viewport-específico
    spacing,
    fontSize,
    borderRadius:  radius,
  }
}

module.exports = { getTokens }
