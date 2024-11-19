import { OpenAIClient } from "../openAIClient";
import { IAssistantAI } from "../types";

export class AssistantAI extends OpenAIClient implements IAssistantAI {

    async initializeAssistant(vectorStoreId: string, assistantName: string, instructions: string,model: string,){
        try{
           this.logger.info("Initializing assistant...");
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

    async deleteAssistant(assistantId:string){
      try{
        const response = await this.client.beta.assistants.del(assistantId);
        this.logger.info(`Assistant Deleted, ID: ${assistantId}`);
        return response
      }
      catch(error: any){
        throw new Error(`Erro to delete assistant:  ${error}`);
      }
    }
}