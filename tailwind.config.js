/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0f1117',
        surface: '#1a1d27',
        'surface-dark': '#0f1117',
        border: '#2a2d3a',
        'border-hover': '#4a4d5a',
        muted: '#888',
        'text-base': '#e0e0e0',
        'text-muted': '#b0b3c0',
        'ai-pink': '#f9a8d4',
        'ai-purple': '#c084fc',
        'ai-violet': '#9333ea',
      },
    },
  },
  plugins: [],
}
