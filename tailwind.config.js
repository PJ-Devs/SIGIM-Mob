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
        primary: "#BBB",
        secondary: "#EEE",
        success: "#00BCD4",
        warning: "#FF9800",
        danger: "#F44336",
        light: "#F5F5F5",
        dark: "#212121",
      },
    },
  },
  plugins: [],
};
