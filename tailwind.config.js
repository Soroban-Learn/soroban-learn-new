/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#5546FF",
        "gray": "#282828",
        "dark-gray": "#232323",
        "dark-gray/50": "#23232380",
        "light-gray": "#5F5F5F",
        "light-gray2": "#D9D9D9",
        black2: "#0A0A0A",
      },
      height: {
        header: "80px",
        main: "calc(100vh - 80px)",
      },
      gridTemplateColumns: {
        "input": "60px 1fr",
      },
      keyframes: {
        "pop-up": {
          "0%": {
            top: "48%",
            opacity: "0",
          },
          "100%": {
            top: "50%",
            opacity: "1",
          },
        }
      },
      animation: {
        "pop-up": "pop-up 500ms ease-out forwards",
      }
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
