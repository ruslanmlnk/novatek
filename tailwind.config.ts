import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        novatek: {
          bg: '#151515',
          panel: '#202020',
          muted: '#939393',
          primary: '#7E8466',
          primaryLight: '#C5D487',
          soft: '#F6F6F6',
        },
      },
      fontFamily: {
        sans: [
          'Inter Tight',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1292px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
