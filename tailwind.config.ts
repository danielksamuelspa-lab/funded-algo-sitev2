import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B63B6",       // deep ocean blue
          gold: "#F5C518",       // warm gold
          turq: "#7AD9D5",       // turquoise pearl
          blueSoft: "#2A7CCB",   // softer blue for accents
          ink: "#0f172a",        // slate-900
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11,99,182,.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      }
    },
  },
  plugins: [],
}
export default config
