import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7F3F4",
        secondary: "#D5E7DC",
        surface: "#E9E5AA",
        onSurface: "#626031",
        background: "#FFFFFF",
        button: "#C5EAE7",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
