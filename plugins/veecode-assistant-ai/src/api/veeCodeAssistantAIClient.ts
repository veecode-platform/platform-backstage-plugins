import { ConfigApi, FetchApi,OAuthApi } from "@backstage/core-plugin-api";
import { VeeCodeAssistantAIApi } from "./veeCodeAssistantAIApi";
import { ResponseError } from '@backstage/errors';
import { clearHistoryResponse, FileContent, InitializeAssistantAIResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { GitAuthManager } from "./git/gitAuthManager";


export class VeeCodeAssistantAIClient implements VeeCodeAssistantAIApi {

 constructor(
    private readonly configApi : ConfigApi,
    private readonly fetchApi: FetchApi,
    private readonly githubAuthApi : OAuthApi,
    private readonly gitlabAuthApi : OAuthApi
 ){}

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

 private async getGitAuthProvider(){
   return new GitAuthManager(this.githubAuthApi, this.gitlabAuthApi)
 }

 async submitRepo(engine:string = "openAI",repoName:string, location:string) : Promise<SubmitRepoResponse> {
  const body = {
    engine,
    repoName,
    location
   };
  const headers: RequestInit = {
     method: "POST",
     body: JSON.stringify(body),
     headers: {
        'Content-Type': 'application/json'
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

 async createPullRequest(files: FileContent[], location: string){
   
  const token = (await this.getGitAuthProvider()).getAccessToken(location);

   const body = {
      files,
      location
     };

    const headers: RequestInit = {
       method: "POST",
       body: JSON.stringify(body),
       headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`

        }
      }
    const response = await this.fetch<SubmitRepoResponse>("/save-changes", headers);
    return response;
 };

}