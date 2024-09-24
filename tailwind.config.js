/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'preto': '#0E0C0F;',
        'branco': '#D9D9D9',
        'cinza': '#6B6A6A',
        'background': '#181718',
        'azul-claro': '#6ED5F4',
        'azul-escuro': '#3BA4C4',
        'azul-marinho': '#005E77'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};