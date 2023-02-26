/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    colors: {
      white: '#fff',
      vulcan: '#0f111d',
      steelGrey: '#1a1c27',
      periwinkleGray: '#ADCBE0',
      aeroBlue: '#b8fff2',
      calico: '#e2b393',
      pictonBlue: '#4e9ee4',
      bridalHealth: '#fffaf4',
      blumine: '#225b82',
      tradewind: '#4ba796',
      rawSienna: '#d08654',
    },
    spacing: {
      0: '0px', // zero or none
      1: '8px', // xs
      2: '16px', // s
      3: '24px', // m
      4: '32px', // l
      5: '40px', // xl
      6: '56px', // xxl
      7: '80px', // xxxl
      8: '120px', // xxxxl
      9: '160px', // xxxxxl
      10: '240px', // xxxxxxl
      11: '320px', // xxxxxxxl
    },
    borderRadius: {
      none: '0',
      xs: '8px',
      sm: '16px',
      default: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['Oxygen', 'sans-serif'],
      mono: ['Inconsolata', 'monospace'],
    },
    fontSize: {
      xs: '12px',
      sm: '16px', // s
      base: '24px', // m
      lg: '32px', // l
      xl: '40px', // xl
    },
    container: {
      center: true,
      padding: '24px',
      screens: {
        sm: '100%',
        md: '760px',
        lg: '760px',
        xl: '760px',
        '2xl': '760px',
      },
    },
    extend: {
      spacing: {
        '1/2': '4px', // xxs
      },
    },
  },
  plugins: [],
}
