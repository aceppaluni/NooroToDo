/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        red: 'var(--primary-red)',
        blue: 'var(--primary-blue)',
        green: 'var(--primary-green)',
      },
    },
  },
  plugins: [],
};