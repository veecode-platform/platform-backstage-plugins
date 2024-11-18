import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { VeecodeAIConfig } from "../lib/types";
import { VeecodeAssistantAIConfig } from "../lib";


export abstract class VeeCodeAssistantAIClient {
    protected config: Config;
    protected logger: LoggerService;
    protected AIConfig: VeecodeAIConfig;

    constructor(config:Config, logger:LoggerService){
        this.config = config;
        this.logger = logger;
        this.AIConfig = new VeecodeAssistantAIConfig(this.config, this.logger);
    }
}