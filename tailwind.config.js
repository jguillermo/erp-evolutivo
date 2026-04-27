/** @type {import('tailwindcss').Config} */
const appColors     = require('./colors')
const appTypography = require('./typography')
const appSpacing    = require('./spacing')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    // fontSize reemplaza la escala por defecto de Tailwind — usar tokens semánticos
    fontSize: appTypography.fontSize,
    extend: {
      colors:     appColors,
      fontFamily: appTypography.fontFamily,
      // spacing añade los huecos intermedios (1.5px, 3px, 5px, 7px, 9px)
      // sin tocar los valores estándar de Tailwind (px, 0.5, 1, 1.5, 2, 2.5, 3...)
      spacing:    appSpacing,
    },
  },
  plugins: [],
}
