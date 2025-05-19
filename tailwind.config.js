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
    // Add any other dynamic or custom classes you use
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0077B6', // Deep blue (trust)
          light: '#48CAE4',   // Light blue (fresh, modern)
          dark: '#023E8A',    // Dark blue (professional)
        },
        accent: {
          DEFAULT: '#FFB703', // Yellow/Orange (friendly, energetic)
          dark: '#FF8800',    // Deeper orange for hover
        },
        cream: '#FFF8ED',     // Background
        teal: '#009688',      // For palm tree/secondary
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 