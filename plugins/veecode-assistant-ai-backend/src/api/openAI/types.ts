import type { AssistantDeleted } from 'openai/resources/beta/assistants';
import type {
  MessageContent,
  MessagesPage,
} from 'openai/resources/beta/threads/messages';
import type { Run } from 'openai/resources/beta/threads/runs/runs';
import type { Thread, ThreadDeleted } from 'openai/resources/beta/threads/threads';
import type { VectorStoreDeleted } from 'openai/resources/beta/vector-stores/vector-stores';

/**
 * @public
 *  AssistantAI
 */

export interface IAssistantAI {
  initializeAssistant(vectorStoreId: string, assistantName: string, model: string, instructions: string): Promise<string>;
  deleteAssistant(assistantId: string): Promise<AssistantDeleted & {
    _request_id?: string | null;
}>
}

/**
 * @public
 *  ChatFactory
 */

export interface IChatFactory {
  createChat(key: string): Promise<string | null>;
}

/**
 *  @public
 *  OpenAIApiClient
 */

export interface IOpenAIApi {
  createVectorStore(name: string): Promise<string>;
  updateVectorStore(vectorStoreId: string, files: File[]): Promise<void>;
  initializeAssistant(vectorStoreId: string,useDataset?:boolean): Promise<string>;
  startChat(vectorStoreId: string,useDataset?:boolean): Promise<ThreadCreatedResponse>;
  getChat(
    vectoreStoreId: string,
    threadId: string,
    message: string,
    template: string,
  ): Promise<MessageContent[]>;
  clearHistory(vectoreStoreId:string,assistantId: string, threadId: string): Promise<void>
}

export type ThreadCreatedResponse = {
  threadId: any;
  assistantId: any;
};

/**
 *  @public
 *  Threads Manager
 */

export interface IThreadsManager {
  createThread(): Promise<
    Thread & {
      _request_id?: string | null;
    }
  >;
  addMessageToThread(threadId: string, content: string): Promise<void>;
  executeAndCreateRun(
    threadId: string,
    assistantId: string,
    template: string,
  ): Promise<
    Run & {
      _request_id?: string | null;
    }
  >;
  checkRunStatus(
    threadId: string,
    runId: string,
  ): Promise<
    Run & {
      _request_id?: string | null;
    }
  >;
  listMessages(threadId: string): Promise<MessagesPage>;
  deleteThread(threadId: string): Promise<ThreadDeleted & {
    _request_id?: string | null;
}>
}

/**
 *  @public
 *  Vector Store Manager
 */

export interface IVectorStoreManager {
   createVector(name: string): Promise<string>;
   uploadFiles(vectorStoreId: string, files: File[]): Promise<void>;
   deleteVectorStore(vectoreStoreId: string): Promise<VectorStoreDeleted & {
    _request_id?: string | null;
}>
}
