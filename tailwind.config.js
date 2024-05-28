/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d74f24",
        tertiary: "#6c7070",
      },
    },
  },
  plugins: [],
};
