/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === DESIGN SYSTEM: Architect CV ===
        // Primary: Professional Indigo
        "primary":                  "#24389c",
        "on-primary":               "#ffffff",
        "primary-container":        "#3f51b5",
        "on-primary-container":     "#cacfff",
        "primary-fixed":            "#dee0ff",
        "primary-fixed-dim":        "#bac3ff",
        "on-primary-fixed":         "#00105c",
        "on-primary-fixed-variant": "#293ca0",
        "inverse-primary":          "#bac3ff",

        // Secondary: Slate Blue
        "secondary":                    "#515f74",
        "on-secondary":                 "#ffffff",
        "secondary-container":          "#d5e3fc",
        "on-secondary-container":       "#57657a",
        "secondary-fixed":              "#d5e3fc",
        "secondary-fixed-dim":          "#b9c7df",
        "on-secondary-fixed":           "#0d1c2e",
        "on-secondary-fixed-variant":   "#3a485b",

        // Tertiary: Vibrant Teal (reserved for CTAs and success states)
        "tertiary":                     "#004c41",
        "on-tertiary":                  "#ffffff",
        "tertiary-container":           "#006657",
        "on-tertiary-container":        "#53e8cd",
        "tertiary-fixed":               "#68fadd",
        "tertiary-fixed-dim":           "#44ddc1",
        "on-tertiary-fixed":            "#00201a",
        "on-tertiary-fixed-variant":    "#005145",

        // Error
        "error":            "#ba1a1a",
        "on-error":         "#ffffff",
        "error-container":  "#ffdad6",
        "on-error-container": "#93000a",

        // Surface & Background
        "background":               "#f7f9fb",
        "on-background":            "#191c1e",
        "surface":                  "#f7f9fb",
        "on-surface":               "#191c1e",
        "surface-variant":          "#e0e3e5",
        "on-surface-variant":       "#454652",
        "surface-bright":           "#f7f9fb",
        "surface-dim":              "#d8dadc",
        "surface-tint":             "#4355b9",

        // Surface Containers (tonal layering)
        "surface-container-lowest":  "#ffffff",
        "surface-container-low":     "#f2f4f6",
        "surface-container":         "#eceef0",
        "surface-container-high":    "#e6e8ea",
        "surface-container-highest": "#e0e3e5",

        // Inverse
        "inverse-surface":      "#2d3133",
        "inverse-on-surface":   "#eff1f3",

        // Outline
        "outline":          "#757684",
        "outline-variant":  "#c5c5d4",
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
        "editorial": "0 20px 40px rgba(25, 28, 30, 0.06)",
        "card":      "0 4px 16px rgba(25, 28, 30, 0.08)",
        "glass":     "0 8px 32px rgba(25, 28, 30, 0.10)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
