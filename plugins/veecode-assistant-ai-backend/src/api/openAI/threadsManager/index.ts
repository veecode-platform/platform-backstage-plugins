import { OpenAIClient } from "../openAIClient";
import { IThreadsManager } from "../types";

export class ThreadsManager extends OpenAIClient implements IThreadsManager {

    async createThread() {
        try {
            this.logger.info("Creating thread...");
            const newThread = await this.client.beta.threads.create();
            return newThread;
        } catch (error: any) {
            throw new Error(`Erro to create thread:  ${error}`);
        }
    }

    async addMessageToThread(threadId: string, content: string) {
        try {
            await this.client.beta.threads.messages.create(
                threadId,
                { role: "user", content }
            )
        } catch (error: any) {
            throw new Error(`Erro to add message in thread:  ${error}`);
        }
    }

    async executeAndCreateRun(threadId: string, assistantId: string, template: string) {
        try {
            const instructions = template ? {
                instructions: `
                        You are an expert assistant in Spotify Backstage. 
                        You have access to the content of the current template, 
                        which is available as additional context. 
                        Use this information to provide more accurate and relevant answers. 
                        Template content:\n\n${template}
                    `,
            } : {};
            const run = await this.client.beta.threads.runs.create(
                threadId,
                {
                    assistant_id: assistantId,
                    ...instructions
                }
            );
            return run;
        } catch (error: any) {
            throw new Error(`Erro to create run :  ${error}`);
        }
    }

    async checkRunStatus(threadId: string, runId: string) {
        try {
            const run = await this.client.beta.threads.runs.retrieve(
                threadId,
                runId
            );
            return run;
        } catch (error: any) {
            throw new Error(`Erro to check run status [run_id: ${runId}] :  ${error}`);
        }
    }

    async listMessages(threadId: string) {
        try {
            const messages = await this.client.beta.threads.messages.list(
                threadId,
            );
            return messages;
        } catch (error: any) {
            throw new Error(`Erro to message list in thread [thread_id: ${threadId}] :  ${error}`);
        }
    }

    async deleteThread(threadId:string){
        try{
            const response =  await this.client.beta.threads.del(threadId);
            return response;
        }catch (error: any) {
            throw new Error(`Erro to delete thread [thread_id: ${threadId}] :  ${error}`);
        }
    }
}