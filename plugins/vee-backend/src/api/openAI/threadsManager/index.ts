import { OpenAIClient } from "../openAIClient";
import { AddMessageToThreadParams, CheckRunStatusParams, ExecuteAndCreateRunParams, IThreadsManager } from "../types";

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

    async addMessageToThread({threadId, content}:AddMessageToThreadParams) {
        try {
            await this.client.beta.threads.messages.create(
                threadId,
                { role: "user", content }
            )
        } catch (error: any) {
            throw new Error(`Erro to add message in thread:  ${error}`);
        }
    }

    async executeAndCreateRun({threadId, assistantId}: ExecuteAndCreateRunParams) {
        try {
            const run = await this.client.beta.threads.runs.create(
                threadId,
                {
                    assistant_id: assistantId,
                }
            );
            return run;
        } catch (error: any) {
            throw new Error(`Erro to create run :  ${error}`);
        }
    }

    async checkRunStatus({threadId, runId}:CheckRunStatusParams) {
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
            return {
                status: "ok",
                ...response
            };
        }catch (error: any) {
            throw new Error(`Erro to delete thread [thread_id: ${threadId}] :  ${error}`);
        }
    }
}