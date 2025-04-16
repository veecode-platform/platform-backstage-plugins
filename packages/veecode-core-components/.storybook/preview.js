import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../src/theme/customTheme'; 
import '../src/styles/global.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Custom Theme',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme =
      context.globals.theme === 'light' ? lightTheme : darkTheme;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: darkTheme, // ou lightTheme, dependendo da sua base
    },
    router: {
      basename: '/veecode-core-components',
    },
  },
};

export default preview;
