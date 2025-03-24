import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { AssistantAI } from "../assistantAI";
import { OpenAIClient } from "../openAIClient"
import { ThreadsManager } from "../threadsManager";
import { ClearHistoryParams, ExecuteAndCreateRunParams, GetChatParams, initializeAssistantParams, IOpenAIApi, StartChatParams, SubmitDataToVectorStoreParams } from "../types";
import { VectorStoreManager } from "../vectorStoreManager";
import { AIModel } from "@veecode-platform/backstage-plugin-vee-common";
import { validateAssistantResponse } from "../../../utils/helpers/validateAssistantResponse";
import { VectorStore } from "openai/resources/beta/vector-stores/vector-stores";

export class OpenAIApi extends OpenAIClient implements IOpenAIApi {

  private vectorStoreManager: VectorStoreManager;
  private assistantAI: AssistantAI;
  private threadsManager: ThreadsManager;

  constructor(config: Config, logger: LoggerService) {
    super(config,logger);
    this.vectorStoreManager = new VectorStoreManager(config, logger);
    this.assistantAI = new AssistantAI(config, logger)
    this.threadsManager = new ThreadsManager(config, logger);
  }

  async submitDataToVectorStore({repoName, files}:SubmitDataToVectorStoreParams){
  try{
    this.logger.info("Check VectorStore Available...")
    const existingStores = await this.client.beta.vectorStores.list();
    const existingStore = existingStores.data.find((store:VectorStore)=> store.name === repoName);
    let vectorStoreId: string;
    if(existingStore && existingStore.status !== 'expired'){
      this.logger.info(`VectorStore found: ${existingStore.id}`);
      vectorStoreId = existingStore.id
    }else{
      this.logger.info(`VectorStore not found. Creating a new one for repo: ${repoName}`);
      vectorStoreId = await this.vectorStoreManager.createVector(repoName);
    }
    const response = await this.vectorStoreManager.uploadFiles(vectorStoreId, files);
    return {
      ...response,
      vectorStoreId
    }
    } catch (error: any) {
      throw new Error(`Erro to check vectorStore:  ${error}`);
    }
  }

  async initializeAssistant({vectorStoreId, repoName, repoStructure, modelType}:initializeAssistantParams) {
    try {
      this.logger.info("Check Assistant Available...");
      const config = this.OpenAIConfig.getOpenAIConfig();
      const assistants = await this.client.beta.assistants.list();
      const existingAssistant = repoName ? assistants.data.find((a: any) => a.name === repoName) : false;
      const model = (modelType === AIModel.customModel && config.templateGeneration) ? config.templateGeneration.model : config.model;

      if (!existingAssistant) return this.assistantAI.initializeAssistant({vectorStoreId,repoName,modelType, model,repoStructure});

      this.logger.info(`Assistant found: ${existingAssistant.id}`);
      return existingAssistant.id;

    } catch (error: any) {
      throw new Error(`Erro to check assistant:  ${error}`);
    }
  }

  async startChat({vectorStoreId, repoName, repoStructure, modelType}:StartChatParams) {
    try {
      this.logger.info('starting chat...');
      const assistant = await this.initializeAssistant({vectorStoreId,repoName, repoStructure, modelType});
      const thread = await this.threadsManager.createThread();
      this.logger.info(`Thread Created: ${thread.id}`);
      return { threadId: thread.id, assistantId: assistant };
    } catch (error: any) {
      throw new Error(`Erro to start chat:  ${error}`);
    }
  }

  async executeAndCreateRun({assistantId, threadId}:ExecuteAndCreateRunParams) {
    const run = await this.threadsManager.executeAndCreateRun({threadId, assistantId })
    return run;
  }

  async getChat({assistantId, threadId, message}:GetChatParams) {
  try {
      // Add the message to the thread
      await this.threadsManager.addMessageToThread({threadId, content: message});

      // Execute and create the run
      const run = await this.executeAndCreateRun({assistantId, threadId});

      // Wait for the run to finish
      let runValidate = await this.threadsManager.checkRunStatus({threadId,runId: run.id});
      while (runValidate.status !== 'completed') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          runValidate = await this.threadsManager.checkRunStatus({threadId, runId: run.id});
      }

      // Retrieves the most recent messages
      const latestMessages = await this.threadsManager.listMessages(threadId);

      // Check messages for analysis
      const analysisResponse = latestMessages.data
          .filter((msg: any) => msg.role === "assistant")
          .map((msg: any) => {
              const contentBlock = msg.content?.find((content: any) => content.type === "text");
              return contentBlock?.text?.value || null;
          })
          .filter((text: string | null) => text !== null)
          .join("\n\n");

      // parse response
      const analysisResponseParsed = validateAssistantResponse(analysisResponse);
    
      // Returns the processed result
      return {
          analysis: analysisResponseParsed.text || "Analysis not available.",
          title: analysisResponseParsed.title || "Analysis",
          generatedFiles: analysisResponseParsed.files || [],
          messages: latestMessages.data,
      };
  } catch (error: any) {
      throw new Error(`Erro ao obter o chat: ${error}`);
  }
}

  async clearHistory({assistantId,vectorStoreId,threadId}:ClearHistoryParams){
    this.logger.info('clearing History...');
    try{
      if(vectorStoreId) await this.vectorStoreManager.deleteVectorStore(vectorStoreId);
      if(threadId) await this.threadsManager.deleteThread(threadId);
      if(assistantId) await this.assistantAI.deleteAssistant(assistantId);

      return {
        status: "ok",
        message: "History successfully cleared!"
      }
    }
    catch(error:any){
      return{
          status: "failed",
          message: error.message
        }
    }
  }

}