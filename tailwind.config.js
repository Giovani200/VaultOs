/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#001A2C',
        navy2: '#04243C',
        teal: '#1FBBA6',
        tealLight: '#5EE5D0',
        slate: '#6B7B8C',
        vaultBg: '#F8FAFC',
        vaultBorder: '#E6ECF2',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
