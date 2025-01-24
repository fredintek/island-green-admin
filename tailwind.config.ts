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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        "shadow-1": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        "nav-shadow": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
      },
    },
  },
  plugins: [],
};
export default config;
