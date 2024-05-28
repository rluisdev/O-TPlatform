/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#161a1e',
        secondary: {
          light: '#5e6673',
          dark: '#1e2026',
          normal: '#2b3139',
        },
        warning: '#f0b90b',
        border: '#eaecef',
        text: {
          selected: '#f0b90b',
          primary: '#848e9c',
          success: '#2ebd85',
          error: '#f6465d',
        },
      },
    },
  },
  plugins: [],
};
