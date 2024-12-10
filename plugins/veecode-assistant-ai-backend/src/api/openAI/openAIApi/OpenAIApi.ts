import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { AssistantAI } from "../assistantAI";
import { OpenAIClient } from "../openAIClient"
import { ThreadsManager } from "../threadsManager";
import { IOpenAIApi } from "../types";
import { VectorStoreManager } from "../vectorStoreManager";
import { extractFilesFromMessage } from "../../../utils/helpers/extractFilesFromMessage";

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

  async submitDataToVectorStore(repoName:string, files:File[]){
    const vectorStoreId = await this.vectorStoreManager.createVector(repoName);
    const response = await this.vectorStoreManager.uploadFiles(vectorStoreId, files as File[]);
    return {
      ...response,
      vectorStoreId
    }
  }

  async initializeAssistant(vectorStoreId: string, useDataset?:boolean) {
    try {
      this.logger.info("Check Assistant Available...");
      const { assistantName, instructions, model, dataset } = this.OpenAIConfig.getOpenAIConfig();
      const assistants = await this.client.beta.assistants.list();
      const existingAssistant = assistantName ? assistants.data.find((a: any) => a.name === assistantName) : false;
      const modelUses = (useDataset && dataset) ? dataset.model : model;

      if (!existingAssistant) return this.assistantAI.initializeAssistant(vectorStoreId,assistantName,instructions,modelUses);

      this.logger.info(`Assistant found: ${existingAssistant.id}`);
      return existingAssistant.id;

    } catch (error: any) {
      throw new Error(`Erro to check assistant:  ${error}`);
    }
  }

  async startChat(vectorStoreId: string, useDataset?:boolean) {
    try {
      this.logger.info('starting chat...');
      const assistant = await this.initializeAssistant(vectorStoreId,useDataset);
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

      // Add Message to Thread
      await this.threadsManager.addMessageToThread(threadId, message);

      // execute and create a run
      const run = await this.executeAndCreateRun(assistantId,threadId, template!); // TODO check template conditional params

      // await completion of the run
      let runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);

      while (runValidate.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
      };

      // Get the latest messages
      const latestMessage = await this.threadsManager.listMessages(threadId);

      // TODO check message
      // return latestMessage.data[0].content;

      // Process messages to extract generated files
      const generatedFiles = latestMessage.data
      .map((msg: any) => extractFilesFromMessage(msg.content))
      .flat();

    return { messages: latestMessage.data, generatedFiles };

    } catch (error: any) {
      throw new Error(`Erro to get chat:  ${error}`);
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