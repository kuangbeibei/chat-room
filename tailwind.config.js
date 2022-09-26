/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './frontend/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray400: 'var(--color-primary)',
        roomBgColor: 'var(--bgcolor-platform)',
        contentBgColor: 'var(--bgcolor-content)',
        mainColor: 'var(--mainColor)',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-60px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1, },
        },
        show: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1, },
        },
        emergeFromLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)'}, 
        }
      },
      animation: {
        dropIn: 'dropIn 1s ease-in-out',
        show: 'show 1s ease-in-out',
        emergeFromLeft: 'emergeFromLeft .5s ease-in-out'
      }
    },
  },
  plugins: [],
}
