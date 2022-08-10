module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'smartDark': '#033F67',
        'smartPurple': '#40769A',
        'normalPurple': '#40769A',
        'basic-gray': '#7E7E7E',
        'borders-gray': '#AAAAAA', 
        'menu-square': '#F0F0F0',
        'hover-button': '#AA69FF',
        'menu-color': '#FAFAFA',
        'progress-gray-color': '#E6E6E6',
        'progress-purple-color': '#40769A',
        'darkGray': '#808080',
        'aspCerrado': '#777777',
        'aspPendiente': '#5528BF',
        'aspInteresado': '#fca629',
        'aspInscritoParcial': '#ffd503',
        'aspInscrito': '#7be500',
      },
    },
    fontFamily: {
      sans: ['"Noto Sans"'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
