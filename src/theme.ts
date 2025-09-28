'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // 🎨 Botones
    primary: {
      main: '#6EFF5B',     // --color-boton-primario
    },
    secondary: {
      main: '#F76C5E',     // --color-boton-secundario
    },
    info: {
      main: '#1B1B1B',     // --color-boton-neutral
    },

    // 🖌️ Hovers
    success: {
      main: '#57E94A',     // --color-hover-primario
    },
    warning: {
      main: '#E85D50',     // --color-hover-secundario
    },

    // 📑 Fondos
    background: {
      default: '#FAF3E0',  // --color-background-default
      paper: '#FFF9F0',    // --color-background-secondary
    },

    // ✍️ Texto
    text: {
      primary: '#2F2F2F',  // --color-texto-principal
      secondary: '#6C6C6C' // --color-texto-secundario
    },

    // Sistema / neutros
    grey: {
      300: '#D3D3D3',      // --color-sistema-uno
      600: '#A6A6A6',      // --color-sistema-texto
    },
  },

  typography: {
    fontFamily: '"Poppins", sans-serif', // --font-sans
    h2: {
      fontSize: '22px',        // tamaño de heading-2 en tu Figma
      fontWeight: 600,         // peso
      lineHeight: '32px',         // interlineado
      letterSpacing: '0%', // espaciado entre letras si tu Figma lo pide
      color: '#2F2F2F',        // texto principal
    },
  },
});

export default theme;
