/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ghbg: "#0d1117",
        ghsurface: "#161b22",
        ghborder: "#30363d",
        ghtext: "#c9d1d9",
        ghmuted: "#8b949e",
        ghaccent: "#238636",
      },
    },
  },
  plugins: [],
};
