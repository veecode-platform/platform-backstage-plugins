import { ConfigApi, FetchApi } from "@backstage/core-plugin-api";
import { VeeCodeAssistantAIApi } from "./veeCodeAssistantAIApi";
import { ResponseError } from '@backstage/errors';
import { clearHistoryResponse, FileContent, InitializeAssistantAIResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { GitManager } from "./gitManager";
import { ScmAuthApi } from "@backstage/integration-react/index";


export class VeeCodeAssistantAIClient implements VeeCodeAssistantAIApi {

 gitmanager: GitManager;

 constructor(
    private readonly configApi : ConfigApi,
    private readonly fetchApi: FetchApi,
    private readonly scmAuthApi: ScmAuthApi
 ){
   this.gitmanager = new GitManager(this.scmAuthApi, this.configApi)
 }

 private async fetch<T>(input: string, init?:RequestInit): Promise<T>{

    const baseUrl = `${this.configApi.getString("backend.baseUrl")}/api/veecode-assistant-ai`;
    const response = await this.fetchApi.fetch(`${baseUrl}${input}`, {
        ...init
    });

    if(!response.ok){
        throw await ResponseError.fromResponse(response)
    }

    return response.json() as Promise<T>
 };

 async downloadRepoFiles (location:string){
  const response = await this.gitmanager.downloadRepoFiles(location);
  return response
 }


 async submitRepo(engine:string = "openAI", files: File[], repoName:string) : Promise<SubmitRepoResponse> {

  const body = {
    engine,
    repoName,
    files
   };
  const headers: RequestInit = {
     method: "POST",
     body: JSON.stringify(body),
     headers: {
        'Content-Type': 'application/json',
      }
    }
   
  const response = await this.fetch<SubmitRepoResponse>("/submit-repo", headers);
  return response;
 }

 async createAssistant(engine: string = "openAI",vectorStoreId:string, prompt: string){
    const body = {
        engine,
        vectorStoreId,
        prompt 
       };
      const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
            'Content-Type': 'application/json'
          }
        }
      const response = await this.fetch<InitializeAssistantAIResponse>("/chat-analyze-repo", headers);
      return response;
 }

 async getChat(engine: string = "openAI",vectorStoreId: string, prompt: string):Promise<InitializeAssistantAIResponse>{
    const response = await this.createAssistant(engine,vectorStoreId,prompt)
    return response
 };

 // TODO uma funçao get chat, que receberia o id do thread ? deveria ser um get no backend

 // private async getChat(threadId:string){}

 async clearHistory(engine: string = "openAI", vectorStoreId: string, assistantId: string, threadId: string):Promise<clearHistoryResponse>{
  const body = {
    engine,
    vectorStoreId,
    assistantId,
    threadId,  
   };
  const headers: RequestInit = {
     method: "DELETE",
     body: JSON.stringify(body),
     headers: {
        'Content-Type': 'application/json'
      }
    }
  const response = await this.fetch<clearHistoryResponse>("/chat-analyze-repo", headers);
  return response;  
 };

 async generateTitleAndMessageForPullRequest(engine: string = "openAI",vectorStoreId: string){
   const promptTitle = `Based on the changes you've made, create a title for the pull request that will be submitted to the repository`;
   const promptMessage = 'Based on the changes made, create a message to serve as a description of the pull request that will be submitted to the repository.' 

   const [responseTitle, responseMessage] = await Promise.all([
      this.getChat(engine, vectorStoreId, promptTitle),
      this.getChat(engine, vectorStoreId, promptMessage),
    ]);

   return {
      // response.choices[0]?.message?.content;
      title: responseTitle.message,
      message: responseMessage.message
   }
 }

 async createPullRequest(files: FileContent[], engine:string, vectorStoreId: string, location: string){  
 
   const { title, message } = await this.generateTitleAndMessageForPullRequest(engine, vectorStoreId)
   await this.gitmanager.createPullRequest(
      files,
      location,
      title,
      message)
 };

}