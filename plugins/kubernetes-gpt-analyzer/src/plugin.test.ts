import { kubernetesGptAnalyzerPlugin } from './plugin';

describe('kubernetes-gpt-analyzer', () => {
  it('should export plugin', () => {
    expect(kubernetesGptAnalyzerPlugin).toBeDefined();
  });
});
