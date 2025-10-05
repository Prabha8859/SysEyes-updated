/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/AboutUs.jsx', // Only include AboutUs.jsx to scope styles
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      textShadow: {
        'aboutus-lg': '3px 3px 6px rgba(0,0,0,0.4)',
        'aboutus-md': '2px 2px 4px rgba(0,0,0,0.3)',
      },
      keyframes: {
        aboutusHeartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)', color: '#ffcccb' },
        },
        aboutusPopIn: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.3) rotate(-10deg)', opacity: '0' },
          '70%': { transform: 'translate(-50%, -50%) scale(1.1) rotate(2deg)', opacity: '0.9' },
          '100%': { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: '1' },
        },
        aboutusPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        aboutusTitleFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aboutusBreadcrumbSlide: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aboutusFadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'aboutus-heartbeat': 'aboutusHeartbeat 2s infinite',
        'aboutus-popIn': 'aboutusPopIn 1s ease-out forwards',
        'aboutus-pulse': 'aboutusPulse 2s infinite',
        'aboutus-titleFadeIn': 'aboutusTitleFadeIn 1.5s ease-out',
        'aboutus-breadcrumbSlide': 'aboutusBreadcrumbSlide 1.8s ease-out',
        'aboutus-fadeInUp': 'aboutusFadeInUp 0.5s ease forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.aboutus-text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
        },
        '.aboutus-text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        },
        '.aboutus-clip-path-hexagon': {
          clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)',
        },
        '.aboutus-transition-height': {
          transitionProperty: 'height',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
