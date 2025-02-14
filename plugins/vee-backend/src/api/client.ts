import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { OpenAIApi } from "./openAI/openAIApi/OpenAIApi";
import { EngineEnum, FileContent } from "@veecode-platform/backstage-plugin-vee-common";
import { IVeeClient } from "./types";


export class VeeClient implements IVeeClient {
    private config: Config;
    private logger: LoggerService;
    private openAIApi: OpenAIApi;
   
    constructor(config:Config, logger:LoggerService){
        this.config = config;
        this.logger = logger;
        this.openAIApi = new OpenAIApi(this.config, this.logger)
    }

    async submitDataToVectorStore (engine: string, repoName:string, files:FileContent[]){
      switch(engine){
        case EngineEnum.openAI:
            return await this.openAIApi.submitDataToVectorStore(repoName,files);
        default:
            throw new Error("No engine found");
      }
    }

    async chat (engine:string, vectorStoreId: string, prompt: string,repoName:string, repoStructure:string,template?:string, useDataset?:boolean){
        switch(engine){
            case EngineEnum.openAI:
                {
                    const { threadId, assistantId } = await this.openAIApi.startChat(vectorStoreId,repoName, repoStructure,useDataset);
                    const response = await this.openAIApi.getChat(assistantId, threadId, prompt,template);
                    return {
                        threadId,
                        assistantId,
                        analysis: response.analysis,
                        messages: response.messages,
                        generatedFiles: response.generatedFiles
                    };
                }
            default:
                throw new Error("No engine found");
        }
    }

    async clearHistory (engine:string,vectorStoreId: string, assistantId: string, threadId: string){
        switch(engine){
            case EngineEnum.openAI:
                {
                    const response = await this.openAIApi.clearHistory(vectorStoreId, assistantId, threadId);
                    return response
                }
            default:
                throw new Error("No engine found");
        }
    }
}