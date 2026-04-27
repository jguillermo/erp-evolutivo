/** @type {import('tailwindcss').Config} */
const { getTokens } = require('./tokens')

// ─────────────────────────────────────────────────────────────────────────────
// VIEWPORT — cambiar aquí para alternar entre escalas de tamaño
// ─────────────────────────────────────────────────────────────────────────────
//
//  'web'    → escala compacta para escritorio / tablet (densidad alta)
//  'mobile' → escala ampliada para pantallas táctiles (legibilidad prioritaria)
//
// ─────────────────────────────────────────────────────────────────────────────
const tokens = getTokens('web')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    // fontSize reemplaza la escala por defecto de Tailwind — usar tokens semánticos
    fontSize: tokens.fontSize,
    // screens reemplaza la escala por defecto — breakpoints orientados a ERP de escritorio
    screens:  tokens.screens,
    extend: {
      colors:        tokens.colors,
      fontFamily:    tokens.fontFamily,
      lineHeight:    tokens.lineHeight,
      letterSpacing: tokens.letterSpacing,
      spacing:       tokens.spacing,
      borderRadius:  tokens.borderRadius,
      boxShadow:     tokens.boxShadow,
    },
  },
  plugins: [],
}
