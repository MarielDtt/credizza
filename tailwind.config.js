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
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        display: ["36px", { lineHeight: "44px", fontWeight: "700" }],
        heading1: ["28px", { lineHeight: "36px", fontWeight: "600" }],
        heading2: ["22px", { lineHeight: "32px", fontWeight: "600" }],

        bodyBoldMobile: ["16px", { lineHeight: "26px", fontWeight: "700" }],
        body: ["16px", { lineHeight: "26px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],

        button: ["16px", { lineHeight: "22px", fontWeight: "600" }],
        smallMobile: ["10px", { lineHeight: "10px", fontWeight: "400" }],
        smallMobileBold: ["10px", { lineHeight: "10px", fontWeight: "700" }],
        smallMobile2: ["8px", { lineHeight: "10px", fontWeight: "400" }],
      },
      colors: {
        'background-default': '#FAF3E0',
        'background-secondary': '#FFF9F0',
        'background-seccion': '#F0E4CD',

        'texto-principal': '#2F2F2F',
        'texto-secundario': '#6C6C6C',
        'texto-botones': '#FAFAFA',

        'boton-primario': '#6EFF5B',
        'boton-secundario': '#F76C5E',
        'boton-neutral': '#1B1B1B',

        'hover-primario': '#57E94A',
        'hover-secundario': '#E85D50',

        'sistema-uno': '#D3D3D3',
        'sistema-texto': '#A6A6A6',
      }
    },
  },
  plugins: [],
};
