import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.sans],
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
        opacity: 'opacity',
        shadow: 'box-shadow',
        transform: 'transform',
        translate: 'translateY',
      },
    },
  },
  plugins: [],
} satisfies Config;
