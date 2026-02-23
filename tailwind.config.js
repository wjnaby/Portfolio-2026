/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dblack: {
          DEFAULT: '#0a0a0f',
          950: '#050508',
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1625',
        },
        dpurple: {
          deep: '#1e1b2e',
          dark: '#2d2a4a',
          mid: '#4c3d7a',
          accent: '#7c3aed',
          glow: '#8b5cf6',
          light: '#a78bfa',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #1e1b2e 50%, #12121a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6d28d9 100%)',
        /* Portfolio hero: teal left → purple/black right */
        'gradient-portfolio': 'linear-gradient(115deg, #0b1614 0%, #0a1318 40%, #0c0a12 70%, #08080c 100%)',
      },
      boxShadow: {
        'purple-glow': '0 0 40px -10px rgba(124, 58, 237, 0.4)',
        'purple-glow-lg': '0 0 60px -15px rgba(124, 58, 237, 0.35)',
      },
    },
  },
  plugins: [],
}