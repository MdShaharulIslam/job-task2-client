/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#065F46",
        secondary: "#10B981",
        accent: "#F97316",
        background: "#F3F4F6",
      },
    },
  },
  plugins: [],
});
