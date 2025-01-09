import { Message } from "openai/resources/beta/threads/messages";

export type FileContent = {
  name: string,
  relativePath?: string;
  content: string;
  type?:string;
  originalFormat?:string
}

export interface IRepository{
  files: FileContent[],
  structure: string
}
export interface IChat {
  threadId: string;
  assistantId: string;
  messages: Message[];
  generatedFiles: FileContent[] | string[]
  }

/**
 *  @public
 * Params Types
 * 
 */
export interface DonwloadRepoAndCreateVectorStoreParams {
  engine: string,
  repoName: string,
  files: FileContent[]
}

export interface AnalyzeAndStartChatParams {
  engine: string,
  vectorStoreId: string,
  prompt: string,
  repoName: string,
  repoStructure: string
}

export interface DeleteChatParams {
  engine: string,
  vectorStoreId: string,
  assistantId: string,
  threadId: string
}

export interface SaveChangesInRepository {
  files: FileContent[],
  location: string,
  title: string,
  message: string
}

export interface CloneRepositoryParams {
  location: string
}

export interface ReturnFromLocalPathParams {
  localPath: string
}



/**
 *  @public
 *  Response types
 * 
 */
export interface OpenAIResponse {
  id: string;
  object: string;
  [key: string]: any;
}

export interface PullRequestResponse {
status: string,
link: string,
message: string
}

export interface DefaultResponse {
  status: string,
  message: string
}

export interface SubmitRepoResponse {
  message: string,
  vectorStoreId: string
}

export interface InitializeAssistantAIResponse {
  assistantId: string,
  message: string,
  generatedFiles: FileContent[],
  data:  {
    messages: Message[],
    generatedFiles: FileContent[]
  },
  threadId: string
}

export interface ChatProps {
  text: string,
  files: FileContent[]
}

export interface ClearHistoryResponse{
  message: string
}

export interface GetFilesResponse  {
  [fileName: string]: string;
}
