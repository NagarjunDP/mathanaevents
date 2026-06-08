import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold:         "#C9A84C",
        "gold-light": "#E8C96A",
        "gold-dim":   "#8A6E2F",
        black:        "#060606",
        charcoal:     "#0E0E0E",
        surface:      "#131313",
        cream:        "#F2EDE4",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body:    ["'Raleway'", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
