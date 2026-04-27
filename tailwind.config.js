/** @type {import('tailwindcss').Config} */
const appColors = require('./colors')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: appColors,
    },
  },
  plugins: [],
}
