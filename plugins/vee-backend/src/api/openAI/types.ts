import type { AssistantDeleted } from 'openai/resources/beta/assistants';
import type {
  Message,
  MessagesPage,
} from 'openai/resources/beta/threads/messages';
import type { Run } from 'openai/resources/beta/threads/runs/runs';
import type {
  Thread,
  ThreadDeleted,
} from 'openai/resources/beta/threads/threads';
import {
  AIModel,
  DefaultResponse,
  FileContent,
} from '@veecode-platform/backstage-plugin-vee-common';
import { VectorStoreDeleted } from 'openai/resources';

/**
 * @public
 *  AssistantAI
 */

export interface IAssistantAI {
  initializeAssistant({
    vectorStoreId,
    model,
    modelType,
    repoName,
    repoStructure,
  }: InitializeAssistantParams): Promise<string>;
  deleteAssistant(assistantId: string): Promise<
    AssistantDeleted & {
      _request_id?: string | null;
    }
  >;
}

// params
export type InitializeAssistantParams = {
  vectorStoreId: string;
  modelType: AIModel;
  model: string;
  repoName: string;
  repoStructure: string;
};

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
  startChat({
    vectorStoreId,
    repoName,
    repoStructure,
    modelType,
  }: StartChatParams): Promise<ThreadCreatedResponse>;
  getChat({ assistantId, threadId, message }: GetChatParams): Promise<{
    analysis: string;
    title: string;
    messages: Message[];
    generatedFiles: FileContent[];
  }>;
  clearHistory({
    assistantId,
    vectorStoreId,
    threadId,
  }: ClearHistoryParams): Promise<DefaultResponse>;
}

export type SubmitDataToVectorStoreParams = {
  repoName: string;
  files: FileContent[];
};

export type initializeAssistantParams = {
  vectorStoreId: string;
  repoName: string;
  repoStructure: string;
  modelType: AIModel;
};

export type StartChatParams = {
  vectorStoreId: string;
  repoName: string;
  repoStructure: string;
  modelType: AIModel;
};

export type GetChatParams = {
  assistantId: string;
  threadId: string;
  message: string;
};

export type ClearHistoryParams = {
  assistantId: string;
  vectorStoreId: string;
  threadId: string;
};

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
  addMessageToThread({
    threadId,
    content,
  }: AddMessageToThreadParams): Promise<void>;
  executeAndCreateRun({
    threadId,
    assistantId,
  }: ExecuteAndCreateRunParams): Promise<
    Run & {
      _request_id?: string | null;
    }
  >;
  checkRunStatus({ threadId, runId }: CheckRunStatusParams): Promise<
    Run & {
      _request_id?: string | null;
    }
  >;
  listMessages(threadId: string): Promise<MessagesPage>;
  deleteThread(threadId: string): Promise<
    ThreadDeleted & {
      _request_id?: string | null;
    }
  >;
}

export type ExecuteAndCreateRunParams = {
  assistantId: string;
  threadId: string;
};

export type AddMessageToThreadParams = {
  threadId: string;
  content: string;
};

export type CheckRunStatusParams = {
  threadId: string;
  runId: string;
};

/**
 *  @public
 *  Vector Store Manager
 */

export interface IVectorStoreManager {
  createVector(name: string): Promise<string>;
  uploadFiles(
    vectorStoreId: string,
    files: FileContent[],
  ): Promise<DefaultResponse>;
  deleteVectorStore(vectoreStoreId: string): Promise<
    VectorStoreDeleted & {
      _request_id?: string | null;
    }
  >;
}
