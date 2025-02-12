import { ConfigApi } from "@backstage/core-plugin-api";

export abstract class Provider {
    protected readonly configApi: ConfigApi;
    protected readonly token: string;

    constructor(config : ConfigApi, token: string){
        this.configApi = config;
        this.token = token;
    }
}