/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '70': '70px', // Adds ml-70 as a spacing utility for 70px
      },
    },
  },
  plugins: [],
};
