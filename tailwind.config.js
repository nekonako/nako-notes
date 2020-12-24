module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'color-primary': '#F3D2C1',
      'color-secondary': '#FEF6E4',
      'color-dark': '#001858',
      'color-accent': '#F582AE',
      'color-highlight': '#8BD3DD',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
