/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        success: colors.green,
<<<<<<< Updated upstream
        primary: colors.blue
=======
<<<<<<< HEAD
        primary: colors.blue,
        danger: colors.red,
=======
        primary: colors.blue
>>>>>>> 43d26d22d3ad95a4f2e19b13ad3c56a59f3d21d5
>>>>>>> Stashed changes
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
