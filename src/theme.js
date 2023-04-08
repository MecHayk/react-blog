import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      light: '#4361ee',
      main: '#4361ee',
      dark: '#4361ee',
    },
    secondary: {
      light: '#4361ee',
      main: '#4361ee',
      dark: '#4361ee',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
  },
});
