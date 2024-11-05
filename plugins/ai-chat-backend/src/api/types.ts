export interface OpenAIApi {
   getAssistant(): Promise<string>;
   createAssistant(): Promise<string>;
   startChat(): Promise<ThreadCreatedResponse>;
   getChat(threadId: string, message: string, templateContent: string): Promise<any>
}


export type ThreadCreatedResponse = {
   threadId: any;
   assistantId: any;
}