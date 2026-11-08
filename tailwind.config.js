/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          ocean: '#16344B',
          teal: '#118F86',
          tealDark: '#0E736C',
          tealLight: '#E8F5F4',
          apricot: '#FFC77A',
          apricotDark: '#E5A54F',
          apricotLight: '#FFF6E9',
          warmWhite: '#F7F9F6',
          cloud: '#EAF1F2',
          ink: '#132B36',
          muted: '#566974',
          border: '#D8E2E5',
          danger: '#C14343',
          success: '#146D58',
        },
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'Tajawal', 'system-ui', 'sans-serif'],
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '28px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 52, 75, 0.06)',
        'lifted': '0 12px 32px -4px rgba(22, 52, 75, 0.1)',
        'accent': '0 8px 24px -2px rgba(17, 143, 134, 0.25)',
      },
    },
  },
  plugins: [],
};

