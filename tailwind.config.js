/** @type {import('tailwindcss').Config} */
const appColors     = require('./colors')
const appTypography = require('./typography')
const appSpacing    = require('./spacing')
const appShadows    = require('./shadows')
const appRadius     = require('./radius')
const appScreens    = require('./screens')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    // fontSize reemplaza la escala por defecto de Tailwind — usar tokens semánticos
    fontSize: appTypography.fontSize,
    // screens reemplaza la escala por defecto — breakpoints orientados a ERP de escritorio
    screens:  appScreens,
    extend: {
      colors:        appColors,
      fontFamily:    appTypography.fontFamily,
      lineHeight:    appTypography.lineHeight,
      letterSpacing: appTypography.letterSpacing,
      // spacing añade la escala semántica de letras (nano/xs/sm/md/lg/xl/2xl/3xl/4xl/5xl)
      spacing:       appSpacing,
      // borderRadius añade tokens semánticos sobre la escala estándar de Tailwind
      borderRadius:  appRadius,
      // boxShadow añade elevación semántica (card/raised/overlay)
      boxShadow:     appShadows,
    },
  },
  plugins: [],
}
