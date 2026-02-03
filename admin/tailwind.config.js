/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          blue: '#0A1628',
          black: '#000000',
          gold: '#D4AF37',
          red: '#FF4444',
        },
      },
    },
  },
  plugins: [],
}
