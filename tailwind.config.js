/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Apply Montserrat globally
      },
      fontWeight: {
        regular: '400', // Regular (400 weight)
        medium: '500',  // Medium (500 weight)
        semiBold: '600', // Semi-Bold (600 weight)
        bold: '700',     // Bold (700 weight)
      },
    },
  },
  plugins: [],
};
