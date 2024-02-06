import { Config } from '@backstage/config';
import { getRootLogger, loadBackendConfig } from '@backstage/backend-common';

export class PlatformConfig {
  private loadBackend: Promise<Config>;
  private static _instance: PlatformConfig;

  private constructor() {
    this.loadBackend = loadBackendConfig({
      logger: getRootLogger(),
      argv: process.argv,
    });
  }
  
  public async getConfig(): Promise<Config> {
    return this.loadBackend;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
