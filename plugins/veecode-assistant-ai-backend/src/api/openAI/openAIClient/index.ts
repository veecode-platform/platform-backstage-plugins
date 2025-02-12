import { OpenAI } from "openai";
import { LoggerService } from "@backstage/backend-plugin-api";
import { ConfigApi } from "@backstage/core-plugin-api";
import { VeecodeAssistantAIConfig } from "../../../lib";

export abstract class OpenAIClient {
    protected OpenAIConfig : VeecodeAssistantAIConfig;
    protected client : OpenAI;

    constructor(
        protected readonly config: ConfigApi, 
        protected readonly logger: LoggerService,  
     ){
        this.OpenAIConfig = new VeecodeAssistantAIConfig(this.config, this.logger);
        this.client = new OpenAI({
            apiKey: this.OpenAIConfig.getOpenAIConfig().apiKey,
            timeout: 60000,
          });
    }
}