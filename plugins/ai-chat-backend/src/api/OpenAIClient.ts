import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { OpenAIConfig } from "../lib";
import { OpenAIOptions, OpenAIProviderConfig } from "../utils/types";

export abstract class OpenAIClient {
    protected config: Config;
    protected logger: LoggerService;
    protected instanceConfig: OpenAIConfig;

    constructor(opts:OpenAIOptions){
        this.config = opts.config;
        this.logger = opts.logger;
        this.instanceConfig = new OpenAIConfig(this.config, this.logger)
    }

    protected getOpenAIConfig():OpenAIProviderConfig{
        return this.instanceConfig.getConfig()
    }
}