import { ConfigApi,IdentityApi } from '@backstage/core-plugin-api';
import { InfracostApi } from './InfracostApi';
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';
import { ResponseError } from '@backstage/errors';

export class InfracostClient implements InfracostApi {
  private readonly configApi: ConfigApi;
  private readonly identityApi: IdentityApi;

  public constructor(options: {
    configApi: ConfigApi;
    identityApi: IdentityApi;
  }) {
    this.configApi = options.configApi;
    this.identityApi = options.identityApi;
  }

  private async fetch<T>(path: string): Promise<T> {

      const baseUrl = `${this.configApi.getString("backend.baseUrl")}/api/infracost/`;
      const url = new URL(path, baseUrl);
      const { token } = await this.identityApi.getCredentials();
      const response = await fetch(url.toString(), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

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