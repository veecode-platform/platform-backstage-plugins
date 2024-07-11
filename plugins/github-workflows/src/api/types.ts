import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { WorkflowDispatchParameters } from "../utils/types";

export type Integrations = {
 host: string,
 [key:string]: string | number | boolean
}


export type Options = {
    configApi: ConfigApi;
    scmAuthApi: ScmAuthApi;
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