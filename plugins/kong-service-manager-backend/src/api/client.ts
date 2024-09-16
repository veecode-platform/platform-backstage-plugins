import { LoggerService } from "@backstage/backend-plugin-api";
import { Config } from "@backstage/config";
import { KongConfig } from "../lib";
import { KongServiceManagerOptions } from "../utils/types";
import { IKongConfigOptions } from "../lib/types";

export abstract class Client {
    protected config: Config;
    protected logger: LoggerService
    protected instanceConfig : KongConfig;

    constructor(opts: KongServiceManagerOptions) {
        this.config = opts.config;
        this.logger = opts.logger;
        this.instanceConfig = new KongConfig(this.config, this.logger);
        
    }

    protected getKongConfig(instanceName:string):IKongConfigOptions{
        return this.instanceConfig.getInstance(instanceName)
    }
}