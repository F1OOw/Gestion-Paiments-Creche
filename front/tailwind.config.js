/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myblue: '#36AFBF',
        myyellow: '#FBBA1E',
        myorange: '#FC623B', 
        // mygreyy: '#EDEDED',
        // mygreen : '#DDEBB7'
      },
      backgroundImage: {
        'texture-pattern': "url('/src/assets/texture_left.png')",
      }, 
    },
  },
  plugins: [],
}