import { gitlabPipelinesPlugin } from './plugin';

describe('gitlab-pipelines', () => {
  it('should export plugin', () => {
    expect(gitlabPipelinesPlugin).toBeDefined();
  });
});
