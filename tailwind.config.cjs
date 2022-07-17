/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD370',
        danger: '#D87355',
      }
    },
  },
  plugins: [],
}

