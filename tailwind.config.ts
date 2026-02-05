import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'root': ['Root', 'serif'],
        'woodland': ['Woodland', 'sans-serif'],
        'faction': ['Faction', 'sans-serif'],
      },
      backgroundImage: {
        'wood-pattern': "url('/assets/bg-wood.jpg')",
        'wood-texture': "url('/assets/bg-wood.jpg')",
        'paper-texture': "url('/assets/paper-texture.jpg')",
        'map-bg': "url('/assets/map-texture.jpg')",
        'theme-woodland': "url('/assets/bg-wood.jpg')",
        'theme-paper': "url('/assets/paper-texture.jpg')",
      },
      backgroundColor: {
        'wood': '#8B4513',
        'wood-light': '#A0522D',
        'paper': '#F5E6D3',
        'map': '#D2B48C',
      },
      colors: {
        'faction': {
          'marquise': '#CD5C5C',
          'eyrie': '#4169E1',
          'alliance': '#228B22',
          'vagabond': '#FFD700',
          'corvid': '#8B008B',
          'hundreds': '#FF6347',
          'keepers': '#708090',
          'river': '#4682B4',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'wood-glow': 'woodGlow 3s ease-in-out infinite alternate',
        'theme-glow': 'themeGlow 4s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        woodGlow: {
          '0%': { 'box-shadow': '0 0 20px rgba(139, 69, 19, 0.3)' },
          '100%': { 'box-shadow': '0 0 30px rgba(139, 69, 19, 0.6)' },
        },
        themeGlow: {
          '0%': { 'box-shadow': '0 0 25px rgba(255, 215, 0, 0.2)' },
          '100%': { 'box-shadow': '0 0 35px rgba(255, 215, 0, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
