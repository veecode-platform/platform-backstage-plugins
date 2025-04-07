import { themes } from '@storybook/theming';
import '../src/styles/global.css';

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
      theme: themes.dark,
      type: 'source'
    }
  },
};

export default preview;