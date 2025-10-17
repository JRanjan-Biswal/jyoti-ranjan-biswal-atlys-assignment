import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--primary), 1)",
        primaryGrey: "rgba(var(--primary-grey), 0.03)",
        secondaryGrey: "rgba(var(--primary-grey), 0.13)",
        tertiaryGrey: "rgba(var(--primary-grey), 0.4)",
        quaternaryGrey: "rgba(var(--primary-grey), 0.06)",
        pentagonalGrey: "rgba(var(--primary-grey), 0.37)",
        customGrey: "rgba(var(--custom-grey))",
        darkGrey: "rgba(var(--primary-grey), 0.83)",
      }, 
      borderRadius: {
        tiny: "var(--radius-tiny)",
        xSmall: "var(--radius-xSmall)",
        small: "var(--radius-small)",
        medium: "var(--radius-medium)",
        large: "var(--radius-large)",
        xLarge: "var(--radius-xLarge)"
      },
      boxShadow: {
        small: "var(--shadow-small)",
      }
    },
  },
  plugins: [],
} satisfies Config;
