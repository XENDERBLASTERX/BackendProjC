import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#8e24aa' },      // Deep purple
    secondary: { main: '#ce93d8' },    // Light purple
    background: { default: '#f3e5f5' },
    text: { primary: '#2d133b', secondary: '#6a1b9a' }
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(140, 82, 255, 0.25)'
        }
      }
    }
  }
});

export default theme;
