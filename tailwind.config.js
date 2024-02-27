/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.vue", "./src/components/**/*.{vue,ts}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "0px", max: "767px" },
        // => @media (min-width: 200px and max-width: 767px) { ... }

        md: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        lg: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px) { ... }

        xl: { min: "1280px" },
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
