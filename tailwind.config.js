/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: {
          50: '#e6f4f4',
          100: '#cce9e9',
          200: '#99d3d3',
          300: '#66bdbd',
          400: '#33a7a7',
          500: '#024243', // Main teal
          600: '#023535',
          700: '#012828',
          800: '#011a1a',
          900: '#010d0d',
        },
        secondary: {
          50: '#e6f2f7',
          100: '#cce5ef',
          200: '#99cbdf',
          300: '#66b1cf',
          400: '#3397bf',
          500: '#006ea5', // Main blue
          600: '#00588a',
          700: '#00426f',
          800: '#002c54',
          900: '#001639',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#024243',
      },
      fontFamily: {
        sans: ['Regular', 'Inter', 'system-ui', 'sans-serif'], // Default body font
        georgia: ['Regular', 'Inter', 'Arial', 'sans-serif'], // Georgian body font
        'headline': ['Headline Medium', 'Inter', 'sans-serif'], // Headline Medium font
        'regular': ['Regular', 'Inter', 'sans-serif'], // Regular font
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
