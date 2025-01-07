import { OpenAIClient } from "../openAIClient";
import type { IAssistantAI } from "../types";


export class AssistantAI extends OpenAIClient implements IAssistantAI {

    async initializeAssistant(vectorStoreId: string, repoName: string, repoStructure: string,model: string,){
        try{
           this.logger.info("Initializing assistant...");

           const assistant = await this.client.beta.assistants.create({
            name: repoName,
            instructions: `You are equipped to automatically analyze the files available in your file search system.
              You leverage this capability to generate Dockerfiles, Terraform, Pipelines, Helm charts, Docker Compose files, and Kubernetes manifests directly from the analyzed codebases.
              Below is the current directory structure available for analysis:
              Directory structure of ${repoName}:
              ${repoStructure}
              You provide tailored recommendations on suitable metrics and code restructuring for refactoring, 
              enhancing both quality and performance. You are designed to ensure that applications comply 
              with the latest cloud-native standards and are optimized for maximum security and effectiveness.
              You focus on delivering direct and practical solutions without unnecessary explanations, 
              utilizing your file search capabilities to access and analyze uploaded files.
            `,
            model: model,
            tools: [
              { type: "file_search" },
              { type: "code_interpreter" }
            ],
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