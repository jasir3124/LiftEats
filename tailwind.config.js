/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brandYellow: "#f6d809",
        brandTeal: "#a4dad2",
        brandGreen: "#93c572",
        brandLightGreen: "#bce08a",
        brandBlue: "#569099",
      },
    },
  },
  plugins: [],
};
