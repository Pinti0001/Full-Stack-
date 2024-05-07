/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
  theme: {
    screens: {
      'sm': {'max': '1023px'},  // Screens up to 1023px
      'lg': {'min': '1024px'},  // Screens 1024px and wider
    },
  }
}