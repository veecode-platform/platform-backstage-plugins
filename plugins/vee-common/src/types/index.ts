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
  title:string;
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

export interface DownloadTemplateAndCreateVectorStoreParams 
extends Omit<DonwloadRepoAndCreateVectorStoreParams,"reponame"> {
  templateName: string
} 

export interface AnalyzeAndStartChatParams {
  engine: string,
  vectorStoreId: string,
  prompt: string,
  repoName: string,
  repoStructure: string,
  isTemplate?:boolean,
  useDataset?: boolean
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

export interface CreateFixedOptionsParams {
  type: string,
  options: IOption[]
}

export interface CreateStackParams {
  name: string,
  source: string,
  icon?: string,
  plugins?: IPlugin[]
}

export interface CreatePluginParams {
  name: string,
  docs: string,
  annotations?: IAnnotationPlugin[]
}

export type ParamsWithRequiredId<T extends {id?: string | undefined}> = Partial<T> & Required<Pick<T, "id">>

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

export interface VeeResponse<T>{
  message: string,
  data: T
}

export interface SubmitRepoResponse {
  message: string,
  vectorStoreId: string
}

export interface InitializeAssistantAIResponse {
  assistantId: string,
  title: string,
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
  title: string,
  files: FileContent[]
}

export interface ClearHistoryResponse{
  message: string
}

export interface DeleteServiceResponse {
  message: string
}

export interface GetFilesResponse  {
  [fileName: string]: string;
}
export interface GithubFileResponse {
  type:  "dir" | "file" | "submodule" | "symlink",
  encoding: string,
  size: number,
  name: string,
  path: string,
  content: string,
  sha: string,
  url: string,
  git_url: string,
  html_url: string,
  download_url: string,
  _links: {
    git: string,
    self: string,
    html: string
  }
}

/**
 * Response from DB
 */

export interface IFixedOptions {
    id?: string,
    type: string,
    options: IOption[],
    created_at?: Date,
    updated_at?: Date
}

export interface IOption {
   id?:string,
   fixed_option_id?: string,
   label: string,
   prompt: string,
   created_at?: Date,
   updated_at?: Date,
}

export interface IStack {
  id?:string,
  name: string,
  source: string,
  icon?: string,
  plugins?: IPlugin[],
  created_at?: Date,
  updated_at?: Date,
}

export interface IPlugin{
  id?:string,
  name: string,
  docs: string,
  annotations: IAnnotationPlugin[],
  created_at?: Date,
  updated_at?: Date,
}

export interface IStackPlugin {
  stack_id: string;
  plugin_id: string;
  created_at?: Date;
}

export interface IAnnotationPlugin {
 id?:string,
 plugin_id?:string,
 annotation: string,
 created_at?: Date,
 updated_at?: Date,
}