/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        main: '#0000FF',
      },
      colors: {
        main: '#0000FF',
      },
      width: {
        main: '1319px',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
