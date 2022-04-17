import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2a9d8f',
    },
    secondary: {
      main: '#d89a9e',
    },
    error: {
      main: '#e76f51',
    },
    success: {
      main: '#00ffc5',
    },
    info: {
      main: '#23b5d3',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
    },
    h2: {
      fontFamily: 'Poppins',
    },
    h3: {
      fontFamily: 'Poppins',
    },
    h4: {
      fontFamily: 'Poppins',
    },
    h5: {
      fontFamily: 'Poppins',
    },
    h6: {
      fontFamily: 'Poppins',
    },
    body1: {
      fontFamily: 'Arial',
    },
    overline: {
      fontFamily: 'Poppins',
      fontWeight: 1000,
      lineHeight: 2.92,
      fontSize: '0.8rem',
    },
    button: {
      fontFamily: 'Poppins',
      fontSize: '1.2rem',
      fontWeight: 1000,
      letterSpacing: '0.06em',
    },
  },
});

export default Theme;
