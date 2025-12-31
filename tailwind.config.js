/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        kash: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e', // Standard green
            600: '#16a34a',
            700: '#15803d', // Deep forest green
            800: '#166534',
            900: '#14532d',
            950: '#052e16', // Very dark green for dark mode backgrounds
          },
          walnut: {
            DEFAULT: '#5D4037',
            light: '#8D6E63',
            dark: '#3E2723',
          },
          snow: '#F8F9FA',
          sky: '#E1F5FE',
          saffron: '#FF9933',
          dark: {
            bg: '#0f172a', // Slate 900
            card: '#1e293b', // Slate 800
            border: '#334155', // Slate 700
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
