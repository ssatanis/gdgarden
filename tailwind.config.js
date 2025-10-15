/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        autumn: {
          dark: '#0f0a08',
          darker: '#1a0f0a',
          brown: '#2d1810',
          orange: '#E07B39',
          amber: '#F4A259',
          burgundy: '#8B2635',
          sage: '#8B9D77',
          cream: '#FAF3E0',
          beige: '#F5F5DC',
        },
        gabby: {
          purple: '#e8d5ff',
          light: '#f3ebff',
          dark: '#d4bff0',
          text: '#FAF3E0',
          background: '#1a0f1e',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
