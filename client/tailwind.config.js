/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        customDarkGreen: '#6F7C12',
        customMidGreen: '#AAD922',
        customBrown: '#483519',
      },
    },
  },
  plugins: [],
}

