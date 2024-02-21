import { createTranslationRef } from '@backstage/core-plugin-api/alpha';

/** @alpha */
export const myPluginTranslationRef = createTranslationRef({
  id: 'githubWorkflows',
  messages: {
    indexPage: {
      title: 'All your components',
      createButtonTitle: 'Create new component',
    },
    entityPage: {
      notFound: 'Entity not found',
    },
  },
});