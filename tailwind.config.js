/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 0.5)',
          600: 'rgb(var(--color-primary) / 0.6)',
          700: 'rgb(var(--color-primary) / 0.7)',
          800: 'rgb(var(--color-primary) / 0.8)',
          900: 'rgb(var(--color-primary) / 0.9)',
          950: 'rgb(var(--color-primary) / 0.95)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary) / 0.05)',
          100: 'rgb(var(--color-secondary) / 0.1)',
          200: 'rgb(var(--color-secondary) / 0.2)',
          300: 'rgb(var(--color-secondary) / 0.3)',
          400: 'rgb(var(--color-secondary) / 0.4)',
          500: 'rgb(var(--color-secondary) / 0.5)',
          600: 'rgb(var(--color-secondary) / 0.6)',
          700: 'rgb(var(--color-secondary) / 0.7)',
          800: 'rgb(var(--color-secondary) / 0.8)',
          900: 'rgb(var(--color-secondary) / 0.9)',
          950: 'rgb(var(--color-secondary) / 0.95)',
        },
        accent: {
          50: 'rgb(var(--color-accent) / 0.05)',
          100: 'rgb(var(--color-accent) / 0.1)',
          200: 'rgb(var(--color-accent) / 0.2)',
          300: 'rgb(var(--color-accent) / 0.3)',
          400: 'rgb(var(--color-accent) / 0.4)',
          500: 'rgb(var(--color-accent) / 0.5)',
          600: 'rgb(var(--color-accent) / 0.6)',
          700: 'rgb(var(--color-accent) / 0.7)',
          800: 'rgb(var(--color-accent) / 0.8)',
          900: 'rgb(var(--color-accent) / 0.9)',
          950: 'rgb(var(--color-accent) / 0.95)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};