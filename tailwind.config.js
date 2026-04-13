/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === DESIGN SYSTEM: Architect CV — Dark Gold Theme ===
        // Primary: Dourado arquitetural
        "primary":                  "#C9A84C",
        "on-primary":               "#1A1A2E",
        "primary-container":        "#2D2A1A",
        "on-primary-container":     "#C9A84C",
        "primary-fixed":            "#3D3820",
        "primary-fixed-dim":        "#D4B668",
        "on-primary-fixed":         "#1A1A2E",
        "on-primary-fixed-variant": "#C9A84C",
        "inverse-primary":          "#C9A84C",

        // Secondary: Pergaminho atenuado (texto secundário)
        "secondary":                    "#A09880",
        "on-secondary":                 "#1A1A2E",
        "secondary-container":          "#252535",
        "on-secondary-container":       "#E8E0D0",
        "secondary-fixed":              "#303050",
        "secondary-fixed-dim":          "#A09880",
        "on-secondary-fixed":           "#E8E0D0",
        "on-secondary-fixed-variant":   "#C9A84C",

        // Tertiary: Dourado mais suave (hover/success)
        "tertiary":                     "#C9A84C",
        "on-tertiary":                  "#1A1A2E",
        "tertiary-container":           "#3D3820",
        "on-tertiary-container":        "#D4B668",
        "tertiary-fixed":               "#D4B668",
        "tertiary-fixed-dim":           "#C9A84C",
        "on-tertiary-fixed":            "#1A1A2E",
        "on-tertiary-fixed-variant":    "#2D2A1A",

        // Error
        "error":              "#CF6679",
        "on-error":           "#1A1A2E",
        "error-container":    "#3D1A20",
        "on-error-container": "#CF6679",

        // Surface & Background — Azul noturno
        "background":               "#1A1A2E",
        "on-background":            "#E8E0D0",
        "surface":                  "#1A1A2E",
        "on-surface":               "#E8E0D0",
        "surface-variant":          "#252540",
        "on-surface-variant":       "#A09880",
        "surface-bright":           "#252540",
        "surface-dim":              "#12122A",
        "surface-tint":             "#C9A84C",

        // Surface Containers (camadas tonais escuras)
        "surface-container-lowest":  "#12122A",
        "surface-container-low":     "#1E1E38",
        "surface-container":         "#222242",
        "surface-container-high":    "#2A2A4A",
        "surface-container-highest": "#303055",

        // Inverse
        "inverse-surface":      "#E8E0D0",
        "inverse-on-surface":   "#1A1A2E",

        // Outline
        "outline":          "#4A4A6A",
        "outline-variant":  "#35355A",
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body":     ["Inter", "sans-serif"],
        "label":    ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "sm":   "0.25rem",
        "md":   "0.5rem",
        "lg":   "0.5rem",
        "xl":   "0.75rem",
        "2xl":  "1rem",
        "3xl":  "1.5rem",
        "full": "9999px",
      },
      boxShadow: {
        "editorial": "0 20px 40px rgba(0, 0, 0, 0.4)",
        "card":      "0 4px 16px rgba(0, 0, 0, 0.3)",
        "glass":     "0 8px 32px rgba(0, 0, 0, 0.4)",
        "gold":      "0 4px 24px rgba(201, 168, 76, 0.2)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
