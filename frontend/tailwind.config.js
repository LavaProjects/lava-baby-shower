/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gender: {
          blue: {
            light: '#e0f2fe',
            medium: '#38bdf8',
            DEFAULT: '#0284c7',
            dark: '#0369a1',
          },
          pink: {
            light: '#fce7f3',
            medium: '#f472b6',
            DEFAULT: '#db2777',
            dark: '#be185d',
          },
          accent: {
            gold: '#f59e0b',
            goldlight: '#fef3c7',
            dark: '#b45309',
          }
        },
        soccer: {
          pitch: {
            light: '#f0fdf4',
            DEFAULT: '#4ade80',
            medium: '#22c55e',
            dark: '#16a34a',
            deep: '#15803d',
          },
          gold: {
            light: '#fef9c3',
            DEFAULT: '#f59e0b',
            dark: '#b45309',
          },
          jersey: {
            blue: {
              light: '#e0f2fe',
              DEFAULT: '#38bdf8',
              dark: '#0284c7',
            },
            pink: {
              light: '#fce7f3',
              DEFAULT: '#f472b6',
              dark: '#db2777',
            }
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        handwritten: ['Caveat', 'Playpen Sans', 'cursive'],
      },
      animation: {
        'sway': 'sway 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2.5s infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
