/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        mist: "#F5F4F2",
        line: "#E7E4E0",
        muted: "#6C6763",
        brandRed: "#C8151E",
        deepRed: "#741B13",
        ember: "#D94A1C",
        gold: "#EAB94F",
        wine: "#2E0001",
        footerBlack: "#121010",
        whatsapp: "#1FAA59",
      },
      fontFamily: {
        display: ['"Butler"', '"Times New Roman"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'signature-grad': 'linear-gradient(10deg, #741B13 0%, #C8151E 32%, #D94A1C 62%, #EAB94F 100%)',
        'button-grad': 'linear-gradient(90deg, #8F0F17 0%, #C8151E 34%, #D94A1C 70%, #E79A3D 100%)',
        'dark-grad': 'linear-gradient(180deg, #2E0001 0%, #120404 60%, #0B0B0B 100%)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.2, 0.75, 0.2, 1)',
      },
      animation: {
        'shimmer': 'shimmer 3.4s infinite linear',
        'pulse-ring': 'pulseRing 2.6s infinite cubic-bezier(0.2, 0.75, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
