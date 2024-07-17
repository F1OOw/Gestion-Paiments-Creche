/** @type {import('tailwindcss').Config} */
export default {
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
        mygray: '#D9D9D9A8',
        // mygreen : '#DDEBB7'
      },
      backgroundImage: {
        'texture-pattern': "url('/src/assets/texture_left.png')",
      }, 
    },
  },
  plugins: [],
}