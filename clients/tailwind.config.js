/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      boxShadow: {
        custom: " 0 0 10px rgba(0, 0, 0, .2)",
      },
    },
  },
  plugins: [],
};

