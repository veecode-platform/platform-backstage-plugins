import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { AssistantAI } from "../assistantAI";
import { OpenAIClient } from "../openAIClient"
import { ThreadsManager } from "../threadsManager";
import { IOpenAIApi } from "../types";

export class OpenAIApi extends OpenAIClient implements  IOpenAIApi{

  private assistantAI: AssistantAI;
  private threadsManager: ThreadsManager;

  constructor(config: Config, logger: LoggerService) {
    super(config, logger);
    this.assistantAI = new AssistantAI(config, logger)
    this.threadsManager = new ThreadsManager(config, logger);
  }

  async getAssistant(vectorStoreId: string) {
    try {
      this.logger.info("Check Assistant Available...");
      const { assistantName } = this.getOpenAIConfig();
      const assistants = await this.client.beta.assistants.list();
      const existingAssistant = assistantName ? assistants.data.find((a: any) => a.name === assistantName) : false;

      if (!existingAssistant) return this.assistantAI.initializeAssistant(vectorStoreId);

      this.logger.info(`Assistant found: ${existingAssistant.id}`);
      return existingAssistant.id;

    } catch (error: any) {
      throw new Error(`Erro to check assistant:  ${error}`);
    }
  }

  async startChat(vectorStoreId: string) {
    try {
      this.logger.info('starting chat...');
      const assistant = await this.getAssistant(vectorStoreId);
      const thread = await this.threadsManager.createThread();
      this.logger.info(`Thread Created: ${thread.id}`);
      return { threadId: thread.id, assistantId: assistant };
    } catch (error: any) {
      throw new Error(`Erro to start chat:  ${error}`);
    }
  }

  async executeAndCreateRun(vectorStoreId: string, threadId: string, template: string) {
    // TODO check template
    const assistantId = await this.getAssistant(vectorStoreId);
    const run = await this.threadsManager.executeAndCreateRun(threadId, assistantId, template)
    return run;
  }

  async getChat(vectoreStoreId: string, threadId: string, message: string, templateContent: string) {
    try {

      // Add Message to Thread
      await this.threadsManager.addMessageToThread(threadId, message);

      // execute and create a run
      const run = await this.executeAndCreateRun(vectoreStoreId, threadId, templateContent);

      // await completion of the run
      let runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);

      while (runValidate.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
      };

      // Get the latest messages
      const latestMessage = await this.threadsManager.listMessages(threadId);

      // TO DO check message
      return latestMessage.data[0].content;

    } catch (error: any) {
      throw new Error(`Erro to get chat:  ${error}`);
    }
  }

}