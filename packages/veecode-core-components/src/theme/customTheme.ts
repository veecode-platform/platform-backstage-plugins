import { createTheme } from '@mui/material/styles';
import { themeVariables } from '../utils/constants/themeVariables';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themeVariables.background.main,
      paper: themeVariables.background.dark,
    },
    primary: {
      main: '#33FFCE',
    },
    text: {
      primary: themeVariables.colors.white,
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
    },
    primary: {
      main: '#33FFCE',
    },
    text: {
      primary: '#151515',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
