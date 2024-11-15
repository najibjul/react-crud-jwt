/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",  // Ensure this is included to scan your index.html
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

// export default {
//   content: [
//     "./index.html",  // Ensure this is included to scan your index.html
//     "./src/**/*.{js,jsx,ts,tsx}"  // Scan all React files (JSX/TSX)
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

