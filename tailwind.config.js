/** @type {import('tailwindcss').Config} */
const appColors     = require('./colors')
const appTypography = require('./typography')

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
    },
  },
  plugins: [],
}
