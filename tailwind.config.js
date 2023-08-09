/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '425px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-heading)', 'cursive', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        back: '-1',
        fixed: '100',
        modal: '1000',
        preload: '1100',
      },
      colors: {
        'defaul-body': '#0d1117',
        'gray-dark': '#343a40',
        'yellow-light': '#f1c40f',
        dark: '#212529',
        light: '#f8f9fa',
        header: '#161b22',
        'btn-bg': '#21262d',
      },
      backgroundImage: {
        login: 'url(/images/bg-login.jpg)',
      },
    },
  },
  plugins: ['prettier'],
};
