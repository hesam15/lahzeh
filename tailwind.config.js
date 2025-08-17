/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['YekanBakh', 'sans-serif'],
        medium: ['YekanBakh', 'sans-serif'],
        bold: ['YekanBakh', 'sans-serif'],
        heavy: ['YekanBakh', 'sans-serif'],
      },
      fontWeight: {
        medium: '500',
        bold: '700',
        heavy: '900',
      },
    },
  },
  plugins: [],
}; 