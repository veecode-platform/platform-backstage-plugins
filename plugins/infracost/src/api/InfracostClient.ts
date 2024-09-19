import { ConfigApi,FetchApi } from '@backstage/core-plugin-api';
import { InfracostApi } from './InfracostApi';
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';
import { ResponseError } from '@backstage/errors';

export class InfracostClient implements InfracostApi {
  private readonly configApi: ConfigApi;
  private readonly fetchApi: FetchApi;

  public constructor(options: {
    configApi: ConfigApi;
    fetchApi: FetchApi;
  }) {
    this.configApi = options.configApi;
    this.fetchApi = options.fetchApi;
  }

  private async fetch<T>(path: string): Promise<T> {

      const baseUrl = `${this.configApi.getString("backend.baseUrl")}/api/infracost/`;
      const url = new URL(path, baseUrl);
      const response = await this.fetchApi.fetch(url.toString());

    if(!response.ok){
       throw await ResponseError.fromResponse(response);
    }

    return response.json() as Promise<T>;

  }

  public async getEstimates(): Promise<InfracostEstimate[] | null> {
    const response = await this.fetch<InfracostEstimate[] | null>("");
    return response
  }

  public async getEstimateByName(estimateName: string): Promise<InfracostEstimate | null> {
    const response = await this.fetch<InfracostEstimate | null>(estimateName);
    return response
  }
}