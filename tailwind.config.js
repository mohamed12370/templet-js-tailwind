/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      //width: '90%',
      //'max-width': '1450px',
    },
    extend: {
      // container: {
      //   center: true,
      //   width: '90%',
      //    'max-width': '1450px',
      // },
      fontFamily: {
        myFont: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        myShadow: '4px 4px 4px 0 #d1d9e6 inset, -4px -4px 4px 0 #d1d9e6 inset',
        numShadow:
          '0 4px 20px rgba(0,0,0,.14) inset, 0 7px 10px -5px rgba(76,175,88,.4) inset',
        numShadow2:
          '0 4px 20px rgba(0,0,0,.14) , 0 7px 10px -5px rgba(76,175,88,.4) ',
      },
      backgroundImage: {
        myBackgroundLiner: 'linear-gradient(60deg , #66bb6a, #43a047)',
      },
      animation: {
        myKeyFrame: 'myKeyFrame 1s linear infinite',
      },
      keyframes: {
        myKeyFrame: {
          to: { 'stroke-dashoffset': '0' },
        },
      },
    },
  },
  plugins: [],
};
