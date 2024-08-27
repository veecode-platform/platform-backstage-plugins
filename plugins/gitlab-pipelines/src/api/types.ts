import { DiscoveryApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";

export type Options = {
    discoveryApi: DiscoveryApi;
    scmAuthApi: ScmAuthApi;
    /**
    * Path to use for requests via the proxy, defaults to /gitlab/api
    */
    proxyPath?: string;
};
