/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        yellowAccent: "#f6d809", // rgb(246,216,9)
        tealAccent: "#a4dad2",   // rgb(164,218,210)
        greenSoft: "#93c572",    // rgb(147,197,114)
        limeSoft: "#bce08a",     // rgb(188,224,138)
        blueGray: "#569099",     // rgb(86,144,153)
      },
    },
  },
  plugins: [],
};
