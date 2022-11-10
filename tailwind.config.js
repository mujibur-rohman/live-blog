/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8758FF',
        primaryAlt: '#743EFF',
        primaryDisable: '#a17cff',
        background: '#f6f6f6',
        text: '#181818',
      },
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
