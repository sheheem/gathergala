/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
