import { DiscoveryApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { WorkflowDispatchParameters } from "../utils/types";

export type Integrations = {
 host: string,
 [key:string]: string | number | boolean
}


export type Options = {
    discoveryApi: DiscoveryApi;
    scmAuthApi: ScmAuthApi;
    /**
    * Path to use for requests via the proxy, defaults to /github/api
    */
    proxyPath?: string;
};

export interface Workflows {
    workflow: {
        id: number
        name: string
        state: string
        url: string
        path: string
        createdAt: string
        updatedAt: string
    },
    latestRun: {
        id?: number
        status?: string
        conclusion?: string
    },
    parameters: WorkflowDispatchParameters[]
}