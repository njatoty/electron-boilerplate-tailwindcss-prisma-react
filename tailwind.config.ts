/* eslint-disable prettier/prettier */
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark': '#010101',
        'secondary': '#393939',
        'light': '#E9E9E9',
        'warning': '#D5B869',
        'gold': '#C6A054',
        'orange': '#E59700'
      },
    },

  },
  plugins: [],
} satisfies Config

