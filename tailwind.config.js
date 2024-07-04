// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        myorange: '#FF9900',
      },
      fontFamily: {
        myfont: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
