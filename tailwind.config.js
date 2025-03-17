/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          dark_blue: "#35383E",
          primary: "#00ADB5",
          dark_gray: "#818181",
          text_gray: "#9A9C9F",
          light_gray: "#EEEEEE",
          white: "#FFFFFF",
          backgroung: "#F8F8F8",
          process: "#FFAA04",
          danger: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};
