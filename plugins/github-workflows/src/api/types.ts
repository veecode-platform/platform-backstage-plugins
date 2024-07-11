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

export interface GithubFileResponse {
    type:  "dir" | "file" | "submodule" | "symlink",
    encoding: string,
    size: number,
    name: string,
    path: string,
    content: string,
    sha: string,
    url: string,
    git_url: string,
    html_url: string,
    download_url: string,
    _links: {
      git: string,
      self: string,
      html: string
    }
}