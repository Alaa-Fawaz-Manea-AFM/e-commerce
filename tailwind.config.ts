import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      red: "#EF4444",
      white: "#ffffff",
      green: "#22C55E",
      gray_tx: "#75767b",
      gray_dr_text: "#828388",
      gray: "#2E3137",
      transparent: "transparent",
      yellow: "#FACC15",
      purple: "#A855F7",
      pink: "#EC4899",
      dark_admin: "#605d5d12",
      primary: "#F8ECD7",
      green_sh: "#1C7144",
      secondary: "#111827",
    },
    screens: {
      xxs: "375px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
export default config;
