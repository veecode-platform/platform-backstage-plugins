import { PluginName, PluginService } from '../services/PluginService';

export enum RateLimitingType {
  second = 'second',
  minute = 'minute',
  hour = 'hour',
  day = 'day',
  month = 'month',
  year = 'year',
}

export class RateLimitingPlugin extends PluginService {
  private static _instance: RateLimitingPlugin;

  private constructor() {
    super();
  }

  public async configRateLimitingKongService(
    serviceName: string,
    rateLimitingType: string,
    rateLimitingValue: string,
    rateLimitingLimitBy: string
  ) {
    const map: Map<string, any> = new Map<string, any>();
    map.set(rateLimitingType, parseInt(rateLimitingValue, 10));
    map.set("limit_by", rateLimitingLimitBy)
    return this.applyPluginKongService(
      serviceName,
      PluginName.rate_limiting,
      map,
    );
  }

  public async updateRateLimitingKongService(
    serviceName: string,
    pluginId: string,
    rateLimitingType: RateLimitingType,
    rateLimiting: number,
  ) {
    const map: Map<string, any> = new Map<string, any>();
    map.set(rateLimitingType.toString(), rateLimiting);
    return this.updatePluginKongService(serviceName, pluginId, map);
  }

  public async removeRateLimitingKongService(
    serviceName: string,
    pluginId: string,
  ) {
    this.removePluginKongService(serviceName, pluginId);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
