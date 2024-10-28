import { DiscoveryApi, FetchApi, OAuthApi } from "@backstage/core-plugin-api";

export type Options = {
    discoveryApi: DiscoveryApi;
    /**
    * Path to use for requests via the proxy, defaults to /gitlab/api
    */
    proxyPath?: string;
    fetchApi: FetchApi;
    gitlabAuthApi: OAuthApi,
};
