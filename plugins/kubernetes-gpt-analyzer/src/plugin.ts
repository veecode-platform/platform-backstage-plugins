import {
  createComponentExtension,
  createPlugin,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const kubernetesGptAnalyzerPlugin = createPlugin({
  id: 'kubernetes-gpt-analyzer',
  routes: {
    root: rootRouteRef,
  },
});

export const KubernetesGptAnalyzerPage = kubernetesGptAnalyzerPlugin.provide(
  createComponentExtension({
    name: 'KubernetesGptAnalyzerPage',
    component: {
      lazy: () =>
        import('./components/KubernetesGPTAnalyzerHomepage').then(m => m.KubernetesGPTAnalyzerHomepage),
    },
  })
)

export const KubernetesGptAnalyzerCard = kubernetesGptAnalyzerPlugin.provide(
  createComponentExtension({
    name: 'KubernetesGptAnalyzerCard',
    component: {
      lazy: () =>
        import('./components/KubernetesGPTAnalyzerCard').then(m => m.KubernetesGPTAnalyzerCard),
    },
  })
)
