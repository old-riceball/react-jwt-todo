/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}"
  ],
  theme: {
    fontFamily: {
      'sans': ["-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"]
    },
    extend: {
      colors: {
        primary: '#FFD370',
        danger: '#D87355',
      }
    },
  },
  plugins: [],
}

