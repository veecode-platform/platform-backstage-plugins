import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { OpenAIApi } from "./openAI/openAIApi/OpenAIApi";
import { EngineEnum } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { IVeeCodeAssistantAIClient } from "./types";


export class VeeCodeAssistantAIClient implements IVeeCodeAssistantAIClient {
    private config: Config;
    private logger: LoggerService;
    private engine : string;
    private openAIApi: OpenAIApi;
   
    constructor(config:Config, logger:LoggerService, engine: string){
        this.config = config;
        this.logger = logger;
        this.engine = engine;
        this.openAIApi = new OpenAIApi(this.config, this.logger)
    }

    async submitDataToVectorStore (repoName:string, files:File[]){
      switch(this.engine){
        case EngineEnum.openAI:
            return await this.openAIApi.submitDataToVectorStore(repoName,files);
        default:
            throw new Error("No engine found");
      }
    }

    async chat (vectorStoreId: string, prompt: string,template?:string, useDataset?:boolean){
        switch(this.engine){
            case EngineEnum.openAI:
                {
                    const { threadId, assistantId } = await this.openAIApi.startChat(vectorStoreId,useDataset);
                    const response = await this.openAIApi.getChat(assistantId, threadId, prompt,template);
                    return {
                        threadId,
                        assistantId,
                        messages: response.messages,
                        generatedFiles: response.generatedFiles
                    };
                }
            default:
                throw new Error("No engine found");
        }
    }

    async clearHistory (vectorStoreId: string, assistantId: string, threadId: string){
        const response = await this.openAIApi.clearHistory(vectorStoreId, assistantId, threadId);
        return response
    }
}