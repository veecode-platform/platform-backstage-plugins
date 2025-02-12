import { ConfigApi, FetchApi,OAuthApi } from "@backstage/core-plugin-api";
import { VeeCodeAssistantAIApi } from "./veeCodeAssistantAIApi";
import { ResponseError } from '@backstage/errors';
import { ClearHistoryResponse, FileContent, InitializeAssistantAIResponse, IRepository, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { GitManager } from "./git/gitManager";


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

 private async getGitManager(){
  return new GitManager(this.configApi, this.githubAuthApi, this.gitlabAuthApi)
}

 async cloneRepo (location:string) {
  const body = {
    location
   };

   const gitManager = await this.getGitManager();
   const token = await gitManager.getAccessToken(location);

   const headers: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`
     }
   }

  const response = await this.fetch<any>("/clone-repository", headers);
  return {
    files: response.data.files,
    structure: response.data.structure
  } as IRepository
}

 async submitRepo(engine:string = "openAI", files: FileContent[], repoName:string) : Promise<SubmitRepoResponse> {

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

 async createAssistant(engine: string = "openAI",vectorStoreId:string, prompt: string, repoName?:string, repoStructure?:string){
    const body = {
        engine,
        vectorStoreId,
        prompt,
        repoName,
        repoStructure
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

 async getChat(engine: string = "openAI",vectorStoreId: string, prompt: string, repoName?:string, repoStructure?:string):Promise<InitializeAssistantAIResponse>{
    const response = await this.createAssistant(engine,vectorStoreId,prompt, repoName, repoStructure);
    return response
 };

 async clearHistory(engine: string = "openAI", vectorStoreId: string, assistantId: string, threadId: string):Promise<ClearHistoryResponse>{
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
  const response = await this.fetch<ClearHistoryResponse>("/chat-analyze-repo", headers);
  return response;  
 };

 async generateTitleAndMessageForPullRequest(engine: string = "openAI",vectorStoreId: string, repoName:string){
   const promptTitle = `Based on the changes made, create a message to serve as a title of the pull request that will be submitted to the repository, but remember, the answer shouldn't come with quotes like “That's my title”, because it's already a string. [#DESCRIPTION_PULLREQUEST]`;
   const promptMessage = 'Based on the changes made, create a message to serve as a description of the pull request that will be submitted to the repository. [#DESCRIPTION_PULLREQUEST]' 

   const [responseTitle, responseMessage] = await Promise.all([
      this.getChat(engine, vectorStoreId, promptTitle,repoName),
      this.getChat(engine, vectorStoreId, promptMessage, repoName),
    ]);

   return {
      title: responseTitle.message,
      message: responseMessage.message
   }
 }

 async saveChangesInRepository(
  files: FileContent[],
  location: string,
  engine: string,
  vectorStoreId: string,
  repoName: string
 ){
  const gitManager = await this.getGitManager();
  const { title, message } = await this.generateTitleAndMessageForPullRequest(engine, vectorStoreId, repoName);

  return gitManager.createPullRequest(
    files,
    location,
    title,
    message
)
 }

}