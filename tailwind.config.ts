import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: { "105": "420px" },
      height: { "817": "700px" },
      maxHeight: { "817": "700px" },
      colors: { orange: "#FF4C29" },
      backgroundColor: { "black-950": "#050505 ", "black-800": "#121212 ", "black-700": "#181818", "black-600": "#242424" },
      borderColor: { "silver-600": "#303030" },
    },
  },
  plugins: [],
  
};

export default config;
