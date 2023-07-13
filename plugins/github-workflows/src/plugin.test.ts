import { githubWorkflowsPlugin } from './plugin';

describe('github-workflows', () => {
  it('should export plugin', () => {
    expect(githubWorkflowsPlugin).toBeDefined();
  });
});
