import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'red': '#C14953',
      'dark-red': '#5e2328',
      'off-white': '#E5DCC5',
      'light-gray': '#FCE4D6',
      'mid-gray': '#4C4C47'
    }
  },
  plugins: [],
}
export default config
