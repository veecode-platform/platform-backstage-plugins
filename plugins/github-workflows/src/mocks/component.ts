export const entityMock = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: {
      name: 'LoginNextJS',
      description: 'An example screen created with NextJS and Styled Components',
      links: [
        {
          title: 'Website',
          url: 'http://backstage.io',
        },
        {
          title: 'Documentation',
          url: 'https://backstage.io/docs',
        },
        {
          title: 'Storybook',
          url: 'https://backstage.io/storybook',
        },
        {
          title: 'Discord Chat',
          url: 'https://discord.com/invite/EBHEGzX',
        },
      ],
      annotations: {
        'github.com/project-slug': 'ValberJunior/LoginNextJS',
        'backstage.io/techdocs-ref': 'dir:.',
        'argocd/app-name': 'LoginNextJS',
        'github.com/workflows': 'nextjs.yml'
      },
    },
    spec: {
      type: 'website',
      lifecycle: 'experimental',
      owner: 'group:default/admin',
    },
  };
