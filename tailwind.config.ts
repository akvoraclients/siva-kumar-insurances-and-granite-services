import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary Navy: #17324D
          navy: {
            DEFAULT: "#17324D",
            50: "#f0f5fa",
            100: "#e0ebf4",
            200: "#c2d7e9",
            300: "#94b9d7",
            400: "#6094c1",
            500: "#3d75a7",
            600: "#2d5d89",
            700: "#23496d",
            800: "#17324D",
            900: "#0f2033",
            950: "#091421",
          },
          // Secondary Teal: #278C83
          teal: {
            DEFAULT: "#278C83",
            50: "#f1faf9",
            100: "#dcf3f0",
            200: "#b9e6e1",
            300: "#89d3cb",
            400: "#54bab0",
            500: "#369f95",
            600: "#278C83",
            700: "#216d66",
            800: "#1d5853",
            900: "#1b4945",
            950: "#0c2b29",
          },
          // Granite Sandstone: #C2A27C
          sandstone: {
            DEFAULT: "#C2A27C",
            50: "#fbf9f6",
            100: "#f6f1ea",
            200: "#ece1d3",
            300: "#decbb5",
            400: "#cdb393",
            500: "#C2A27C",
            600: "#b08c64",
            700: "#92714f",
            800: "#765c43",
            900: "#604b38",
            950: "#34281c",
          },
          // Charcoal: #30343B
          charcoal: {
            DEFAULT: "#30343B",
            50: "#f6f7f8",
            100: "#ebecee",
            200: "#d8dadf",
            300: "#b9bcc5",
            400: "#9499a6",
            500: "#747988",
            600: "#5c606e",
            700: "#494d58",
            800: "#30343B",
            900: "#24272c",
            950: "#17181c",
          },
          // Light Background: #F7F8FA
          light: "#F7F8FA",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Noto Sans Tamil"',
          '"Mukta Malar"',
          '"Latha"',
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
