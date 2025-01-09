import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { AssistantAI } from "../assistantAI";
import { OpenAIClient } from "../openAIClient"
import { ThreadsManager } from "../threadsManager";
import { IOpenAIApi } from "../types";
import { VectorStoreManager } from "../vectorStoreManager";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { validateAssistantResponse } from "../../../utils/helpers/validateAssistantResponse";

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

  async submitDataToVectorStore(repoName:string, files:FileContent[]){
    const vectorStoreId = await this.vectorStoreManager.createVector(repoName);
    const response = await this.vectorStoreManager.uploadFiles(vectorStoreId, files);
    return {
      ...response,
      vectorStoreId
    }
  }

  async initializeAssistant(vectorStoreId: string, repoName:string, repoStructure:string, useDataset?:boolean) {
    try {
      this.logger.info("Check Assistant Available...");
      const { model, dataset } = this.OpenAIConfig.getOpenAIConfig();
      const assistants = await this.client.beta.assistants.list();
      const existingAssistant = repoName ? assistants.data.find((a: any) => a.name === repoName) : false;
      const modelUses = (useDataset && dataset) ? dataset.model : model;

      if (!existingAssistant) return this.assistantAI.initializeAssistant(vectorStoreId,repoName,repoStructure,modelUses);

      this.logger.info(`Assistant found: ${existingAssistant.id}`);
      return existingAssistant.id;

    } catch (error: any) {
      throw new Error(`Erro to check assistant:  ${error}`);
    }
  }

  async startChat(vectorStoreId: string, repoName:string, repoStructure:string, useDataset?:boolean) {
    try {
      this.logger.info('starting chat...');
      const assistant = await this.initializeAssistant(vectorStoreId,repoName, repoStructure, useDataset);
      const thread = await this.threadsManager.createThread();
      this.logger.info(`Thread Created: ${thread.id}`);
      return { threadId: thread.id, assistantId: assistant };
    } catch (error: any) {
      throw new Error(`Erro to start chat:  ${error}`);
    }
  }

  async executeAndCreateRun(assistantId: string, threadId: string, template: string) {
    const run = await this.threadsManager.executeAndCreateRun(threadId, assistantId, template ?? null)
    return run;
  }

async getChat(assistantId: string, threadId: string, message: string, template?: string) {
  try {
      // Add the message to the thread
      await this.threadsManager.addMessageToThread(threadId, message);

      // Execute and create the run
      const run = await this.executeAndCreateRun(assistantId, threadId, template!);

      // Wait for the run to finish
      let runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
      while (runValidate.status !== 'completed') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
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
          generatedFiles: analysisResponseParsed.files || [],
          messages: latestMessages.data,
      };
  } catch (error: any) {
      throw new Error(`Erro ao obter o chat: ${error}`);
  }
}

  async clearHistory(vectorStoreId:string,assistantId:string, threadId:string){
    this.logger.info('clearing History...');
    // delete vectorStore
    const deleteVectorStore = await this.vectorStoreManager.deleteVectorStore(vectorStoreId);
    // delete threads
    const deleteThread = await this.threadsManager.deleteThread(threadId);
    // delete assistant
    const deleteAssistant = await this.assistantAI.deleteAssistant(assistantId);

    if(deleteVectorStore.status === "ok" && deleteThread.status === "ok" && deleteAssistant.status === "ok"){
      return {
        status: "ok",
        message: "History successfully cleared!"
      }
    }

    return{
      status: "failed",
      message: "Failed to delete history!"
    }
  }

}