import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: { "105": "420px" },
      height: { "817": "700px" },
      maxHeight: { "817": "700px" },
      colors: { orange: "#FF4C29", "orange-100": "#ff684a" },
      backgroundColor: {
        "black-950": "#050505 ",
        "black-800": "#121212 ",
        "black-700": "#181818",
        "black-600": "#242424",
      },
      borderColor: { "silver-600": "#303030" },
    },
    screens: {
      sm: { min: "640px" },

      md: { min: "768px" },

      lg: { min: "1024px" },

      xl: { min: "1280px" },

      "2xl": { min: "1440px" },
    },
  },

  plugins: [],
};

export default config;
