import type { Config } from "tailwindcss";

const config = {
  prefix: "",
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],

  theme: {
    extend: {
      screens: {
        sm: "540px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
} satisfies Config;

export default config;
