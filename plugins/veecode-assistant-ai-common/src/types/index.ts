import { Message } from "openai/resources/beta/threads/messages";

export type FileContent = {
  name: string;
  content: string;
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
  location: string
}

export interface AnalyzeAndStartChatParams {
  engine: string,
  vectorStoreId: string,
  prompt: string
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
  data:  {
    messages: Message[],
    generatedFiles: FileContent[]
  },
  threadId: string
}

export interface clearHistoryResponse{
  message: string
}