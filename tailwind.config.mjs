/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        obsidiana: '#0B100D',
        jade: '#3BAE88',
        'jade-oscuro': '#0F6B4F',
        hueso: '#F3F4EF',
        nieve: '#EDEFE8',
        cal: '#EADFC4',
      },
      fontFamily: {
        serif: ['"DejaVu Serif"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        mono: ['"DejaVu Sans Mono"', '"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter Variable"', '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
