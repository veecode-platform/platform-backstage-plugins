import { OpenAIClient } from "./OpenAIClient"
import { OpenAIApi } from "./types";

export class OpenAIApiClient extends OpenAIClient implements OpenAIApi {
    
    private async fetch <T = any>(input: string, init?: RequestInit):Promise<T>{
        const { apiBaseUrl, apiKey } = this.getOpenAIConfig();     
        
        const defaultHeaders = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
                'OpenAI-Beta': 'assistants=v2'
            },
            ...init
        } as RequestInit;

        const resp = await fetch(`${apiBaseUrl}${input}`,defaultHeaders);

        if(!resp.ok){
            throw new Error(`[${resp.type}] Request for [${apiBaseUrl}${input}] failed with ${resp.status} - ${resp.statusText}`);
        }

        if (resp.status === 204) return { message: "deleted" } as any
        return await resp.json();

    }
 
    async getAssistant(){
        try{
            this.logger.info("Check Assistant Available...");
            const { assistant } = this.getOpenAIConfig();  
            const assistants = await this.fetch("/assistants");
            const existingAssistant = assistant ? assistants.data.find( (a:any) => a.name === assistant) : false;

            if(!existingAssistant) return this.createAssistant();

            this.logger.info(`Assistant found: ${existingAssistant.id}`);
            return existingAssistant.id;

         }catch(error: any){
           throw new Error(`Erro to check assistant:  ${error}`);
         }
    }

    async createAssistant(){
        try{
           this.logger.info("Creating Assistant...");

           const { assistant, instructions, model } = this.getOpenAIConfig();

           const body = {
                name: assistant,
                instructions,
                model
           }

           const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
          }
           const newAssistant = await this.fetch("/assistants", headers);
           this.logger.info(`New Assistant Created: ${newAssistant.id}`);
           return newAssistant.id;
        }catch(error: any){
          throw new Error(`Erro to create assistant:  ${error}`);
        }
    }

    async startChat(){
        try{
           this.logger.info('starting chat...');
           const assistant = await this.getAssistant();

           const headers: RequestInit = {
            method: "POST",
          }
           const thread = await this.fetch("/threads", headers);
           this.logger.info(`Thread Created: ${thread.id}`);
           return { threadId: thread.id, assistantId: assistant };
        }catch(error: any){
          throw new Error(`Erro to create assistant:  ${error}`);
        }
    }

    async addMessageToThread(threadId: string, message: string){
        const body = {
            role: "user",
            content: message
        }

        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body)
       }
       await this.fetch(`/threads/${threadId}/messages`,headers);
    }

    async executeAndCreateRun(threadId: string,templateContent:string){

        const assistant = await this.getAssistant();

        const body = {
            role: "user",
            assistant_id: assistant,
            instructions: `Você é um assistente especializado na plataforma VeeCode. Você tem acesso ao conteúdo do template atual, que está disponível como contexto adicional. Use essas informações para fornecer respostas mais precisas e relevantes. Conteúdo do template:\n\n${templateContent}`
        }

        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body)
       }

        const run = await this.fetch(`/threads/${threadId}/runs`,headers);

        return run;
    }

    async waitRunCompleted(threadId: string, runId: string){
        const response = await this.fetch(`/threads/${threadId}/runs/${runId}`);
        return response;
    }

    async getLatestMessages(threadId: string){
        const messages = await this.fetch(`/threads/${threadId}/messages`);
        return messages;
    }

    async getChat(threadId:string, message: string, templateContent: string){
        try{

           // Add Message to Thread
            await this.addMessageToThread(threadId, message);

            // execute and create a run
            const run = await this.executeAndCreateRun(threadId,templateContent);

            // await completion of the run
            let runStatus = await this.waitRunCompleted(threadId, run.id);

            while (runStatus.status !== 'completed') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                runStatus = this.waitRunCompleted(threadId, run.id);
              };

            // Get the latest messages
             const latestMessage = await this.getLatestMessages(threadId);

             return latestMessage.content[0].text.value;

         }catch(error: any){
           throw new Error(`Erro to get chat:  ${error}`);
         }
    }
 
}