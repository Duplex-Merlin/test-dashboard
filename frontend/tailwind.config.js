/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage :{
        element: "url('../public/assets/images/vector-line-1.png')",
        'element-2': "url('../public/assets/images/vector-line-2.png')",
      }
    },
  
  },
  plugins: [],
})

