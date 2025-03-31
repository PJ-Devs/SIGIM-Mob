/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#90DDF0",
        secondary: "#2C666E",
        tirth: "#07393C",
        success: "#00BCD4",
        warning: "#FF9800",
        danger: "#F44336",
        light: "#F0EDEE",
        dark: "#0A090C",
      },
    },
  },
  plugins: [],
};
