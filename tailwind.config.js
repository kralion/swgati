/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      colors: {
        verde: "#306239",
        red: "#CD3C2A",
        amarillo: "#E5BA3F",
        celeste: "#46A3D0",
      },
    },
  },
  plugins: [],
};
