import type { AssistantDeleted } from 'openai/resources/beta/assistants';
import type {
  Message,
  MessagesPage,
} from 'openai/resources/beta/threads/messages';
import type { Run } from 'openai/resources/beta/threads/runs/runs';
import type { Thread, ThreadDeleted } from 'openai/resources/beta/threads/threads';
import type { VectorStoreDeleted } from 'openai/resources/beta/vector-stores/vector-stores';
import { FileContent } from '../../utils/types';
import { DefaultResponse } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';

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
  startChat(vectorStoreId: string,useDataset?:boolean): Promise<ThreadCreatedResponse>;
  getChat(
    vectoreStoreId: string,
    threadId: string,
    message: string,
    template: string,
  ): Promise<{
    messages: Message[];
    generatedFiles: FileContent[];
}>;
  clearHistory(vectoreStoreId:string,assistantId: string, threadId: string): Promise<DefaultResponse>
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
   uploadFiles(vectorStoreId: string, files: File[]): Promise<DefaultResponse>;
   deleteVectorStore(vectoreStoreId: string): Promise<VectorStoreDeleted & {
    _request_id?: string | null;
}>
}
