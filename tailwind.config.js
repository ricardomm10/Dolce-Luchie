/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "cafe-latte": "#6D4C41",
        "beige-suave": "#F5F5DC",
        "rosa-pastel": "#F8BBD0",
        "verde-menta": "#C8E6C9",
        "durazno-suave": "#FFDAB9",
        crema: "#FFF8F0",
        "cafe-oscuro": "#3E1A17"
      },
      fontFamily: {
        display: ["Great Vibes", "cursive"],
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Montserrat", "Arial", "sans-serif"]
      },
      boxShadow: {
        dulce: "0 14px 30px rgba(109, 76, 65, 0.16)"
      },
      borderRadius: {
        dulce: "8px"
      }
    }
  },
  plugins: []
};
