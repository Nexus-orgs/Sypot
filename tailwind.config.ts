import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: { reference: '--border' },
        input: { reference: '--input' },
        ring: { reference: '--ring' },
        background: { reference: '--background' },
        foreground: { reference: '--foreground' },
        primary: {
          DEFAULT: { reference: '--primary' },
          foreground: { reference: '--primary-foreground' },
        },
        secondary: {
          DEFAULT: { reference: '--secondary' },
          foreground: { reference: '--secondary-foreground' },
        },
        destructive: {
          DEFAULT: { reference: '--destructive' },
          foreground: { reference: '--destructive-foreground' },
        },
        muted: {
          DEFAULT: { reference: '--muted' },
          foreground: { reference: '--muted-foreground' },
        },
        accent: {
          DEFAULT: { reference: '--accent' },
          foreground: { reference: '--accent-foreground' },
        },
        popover: {
          DEFAULT: { reference: '--popover' },
          foreground: { reference: '--popover-foreground' },
        },
        card: {
          DEFAULT: { reference: '--card' },
          foreground: { reference: '--card-foreground' },
        },
        sidebar: {
          DEFAULT: { reference: '--sidebar-background' },
          foreground: { reference: '--sidebar-foreground' },
          primary: { reference: '--sidebar-primary' },
          "primary-foreground": { reference: '--sidebar-primary-foreground' },
          accent: { reference: '--sidebar-accent' },
          "accent-foreground": { reference: '--sidebar-accent-foreground' },
          border: { reference: '--sidebar-border' },
          ring: { reference: '--sidebar-ring' },
        },
        vibrant: {
          orange: { reference: '--vibrant-orange' },
          purple: { reference: '--vibrant-purple' },
          yellow: { reference: '--warm-yellow' },
          pink: { reference: '--soft-pink' },
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-warm": "var(--gradient-warm)",
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        vibrant: "var(--shadow-vibrant)",
        soft: "var(--shadow-soft)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
