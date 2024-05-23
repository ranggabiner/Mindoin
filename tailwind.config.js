/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#028080",
        tertiary: "#6c7070",
      },
    },
  },
  plugins: [],
};
