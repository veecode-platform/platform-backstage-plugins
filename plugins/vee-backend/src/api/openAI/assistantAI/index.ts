import { OpenAIClient } from "../openAIClient";
import type { IAssistantAI } from "../types";
import { assistantInstructions } from "./instructions";

export class AssistantAI extends OpenAIClient implements IAssistantAI {

    async initializeAssistant(vectorStoreId: string, repoName: string, repoStructure: string,model: string,){
        try{
           this.logger.info("Initializing assistant...");

           const assistant = await this.client.beta.assistants.create({
            name: repoName,
            instructions: assistantInstructions(repoName,repoStructure),
            model: model,
            temperature: 0, // Deterministic responses
            top_p: 0.1, // Focus on top 10% most probable outputs
            tools: [
              { type: "file_search" },
              { type: "code_interpreter" }
            ]
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

    async deleteAssistant(assistantId:string){
      try{
        const response = await this.client.beta.assistants.del(assistantId);
        this.logger.info(`Assistant Deleted, ID: ${assistantId}`);
        return {
          status: "ok",
          ...response
        }
      }
      catch(error: any){
        throw new Error(`Erro to delete assistant:  ${error}`);
      }
    }
}