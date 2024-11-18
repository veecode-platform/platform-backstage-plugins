import { ChatFactory } from "../chatFactory";
import { OpenAIClient } from "../openAIClient";
import type { Config } from '@backstage/config';
import type { LoggerService } from "@backstage/backend-plugin-api";
import { chatEnum } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common"
import { IAssistantAI } from "../types";

export class AssistantAI extends OpenAIClient implements IAssistantAI {

  private chatOpenAI: ChatFactory;

  constructor(config:Config, logger: LoggerService){
    super(config, logger);
    this.chatOpenAI = new ChatFactory(config, logger);
  }

    async initializeAssistant(vectorStoreId: string){
        try{
           this.logger.info("Initializing assistant...");

           const { assistantName, instructions, model } = this.getOpenAIConfig();

           const assistant = await this.client.beta.assistants.create({
            name: assistantName,
            instructions: instructions,
            model: model,
            tools: [{ type: "file_search" }],
          });
      
          if (vectorStoreId) {
            await this.client.beta.assistants.update(assistant.id, {
              tool_resources: {
                file_search: {
                  vector_store_ids: [vectorStoreId],
                },
              },
            });
          }

           this.logger.info(`New Assistant Created: ${assistant.id}`);
           return assistant.id;
        }catch(error: any){
          throw new Error(`Erro to create assistant:  ${error}`);
        }
    }

    async evaluateCodeBestPractices() {
      await this.chatOpenAI.createChat(chatEnum.evaluateCode);
    }
  
    async checkTestCoverage() {
      await this.chatOpenAI.createChat(chatEnum.checkTest);
    }
  
    async generateTests() {
      await this.chatOpenAI.createChat(chatEnum.generateTests);
    }
  
    async generateDockerFile() {
      await this.chatOpenAI.createChat(chatEnum.generateDockerFile);
    }
  
    async checkVulnerabilities() {
      await this.chatOpenAI.createChat(chatEnum.checkVulnerabilities);
    }
  
    async generateCICD() {
      await this.chatOpenAI.createChat(chatEnum.generateCICD);
    }
  
    async freeChat(question: string) {
      await this.chatOpenAI.createChat(question);
    }
}