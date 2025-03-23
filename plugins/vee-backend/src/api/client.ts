import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { OpenAIApi } from "./openAI/openAIApi/OpenAIApi";
import { EngineEnum } from "@veecode-platform/backstage-plugin-vee-common";
import { ChatParams, ClearHistoryParams, IVeeClient, SubmitDataToVectorStoreParams } from "./types";


export class VeeClient implements IVeeClient {
    private config: Config;
    private logger: LoggerService;
    private openAIApi: OpenAIApi;
   
    constructor(config:Config, logger:LoggerService){
        this.config = config;
        this.logger = logger;
        this.openAIApi = new OpenAIApi(this.config, this.logger)
    }

    async submitDataToVectorStore ({engine,repoName,files}:SubmitDataToVectorStoreParams){
      switch(engine){
        case EngineEnum.openAI:
            return await this.openAIApi.submitDataToVectorStore({repoName,files});
        default:
            throw new Error("No engine found");
      }
    }

    async chat ({engine, vectorStoreId, prompt,repoName, repoStructure,modelType}:ChatParams){
        switch(engine){
            case EngineEnum.openAI:
                {
                  const { threadId, assistantId } = await this.openAIApi.startChat({vectorStoreId,repoName, repoStructure,modelType});
                  const response = await this.openAIApi.getChat({assistantId, threadId, message:prompt});
                  return {
                      threadId,
                      assistantId,
                      title: response.title,
                      analysis: response.analysis,
                      messages: response.messages,
                      generatedFiles: response.generatedFiles
                  };
                }
            default:
                throw new Error("No engine found");
        }
    }

    async clearHistory ({engine,vectorStoreId,assistantId,threadId}:ClearHistoryParams){
        switch(engine){
            case EngineEnum.openAI:
                {
                    const response = await this.openAIApi.clearHistory({assistantId,vectorStoreId,threadId});
                    return response
                }
            default:
                throw new Error("No engine found");
        }
    }
}