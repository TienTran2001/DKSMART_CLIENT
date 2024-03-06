/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#0000FF',
      },
      colors: {
        main: '#0000FF',
        'main-1': '#353535',
        'main-gray': '#eceff180',
        'main-gray-1': '#607d8b1a',
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
});
