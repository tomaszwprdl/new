/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-gradient-to-b',
    'from-[#48CAE4]',
    'to-transparent',
    'h-40',
    'btn-primary',
    'glass-card',
    'text-gradient',
    'floating-badge',
    'nav-sticky',
    'section-alt',
    'animate-float',
    'animate-float-1',
    'animate-float-2',
    'animate-float-3',
    'animate-float-4'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2B49', // Navy blue (main brand color)
          text: '#4B5563',    // Secondary text color
        },
        accent: {
          DEFAULT: '#FFD700', // Gold (start of gradient)
          dark: '#FFB300',    // Gold (end of gradient)
        },
        blue: {
          light: '#48CAE4',   // Light blue accent
        },
        yellow: {
          muted: '#FDE68A',   // Muted yellow for subtle accents
        },
        gray: {
          soft: '#F5F6FA',    // Soft gray for backgrounds
        },
        cream: '#FFF8ED',     // Legacy cream color
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #FFD700 0%, #FFB300 100%)',
        'gold-gradient-y': 'linear-gradient(180deg, #FFD700 0%, #FFB300 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 12px rgba(0, 0, 0, 0.1)',
        'floating': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      borderRadius: {
        'button': '8px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 