import { databaseExplorerPlugin } from './plugin';

describe('database-explorer', () => {
  it('should export plugin', () => {
    expect(databaseExplorerPlugin).toBeDefined();
  });
});
