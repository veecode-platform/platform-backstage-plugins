import { OpenAI } from "openai";
import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { VeecodeAssistantAIConfig } from "../../../lib";

export abstract class OpenAIClient extends VeecodeAssistantAIConfig{
    protected client : OpenAI;

    constructor(config:Config, logger:LoggerService){
        super(config, logger);
        this.client = new OpenAI({
            apiKey: this.getOpenAIConfig().apiKey,
            timeout: 600,
          });
    }
}