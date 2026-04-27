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
      colors:        appColors,
      fontFamily:    appTypography.fontFamily,
      lineHeight:    appTypography.lineHeight,
      letterSpacing: appTypography.letterSpacing,
      // spacing añade la escala semántica de letras (nano/xs/sm/md/lg/xl/2xl/3xl/4xl/5xl)
      spacing:       appSpacing,
      // borderRadius añade los valores de esquinas que no están en la escala estándar de Tailwind
      // rounded(4px) y rounded-md(6px) ya existen; aquí solo los que faltan
      borderRadius: {
        'badge': '3px',    // rounded-badge — badges inline
        'card':  '10px',   // rounded-card, rounded-t-card — tarjetas principales
      },
    },
  },
  plugins: [],
}
