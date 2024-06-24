import { infracostPlugin } from './plugin';

describe('infracost', () => {
  it('should export plugin', () => {
    expect(infracostPlugin).toBeDefined();
  });
});
