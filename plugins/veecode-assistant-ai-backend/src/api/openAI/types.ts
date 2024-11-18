import type {
  MessageContent,
  MessagesPage,
} from 'openai/resources/beta/threads/messages';
import type { Run } from 'openai/resources/beta/threads/runs/runs';
import type { Thread } from 'openai/resources/beta/threads/threads';

/**
 * @public
 *  AssistantAI
 */

export interface IAssistantAI {
  initializeAssistant(vectorStoreId: string): Promise<string>;
  evaluateCodeBestPractices(): Promise<void>;
  checkTestCoverage(): Promise<void>;
  generateTests(): Promise<void>;
  generateDockerFile(): Promise<void>;
  checkVulnerabilities(): Promise<void>;
  generateCICD(): Promise<void>;
  freeChat(question: string): Promise<void>;
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
  getAssistant(vectorStoreId: string): Promise<string>;
  startChat(vectorStoreId: string): Promise<ThreadCreatedResponse>;
  getChat(
    vectoreStoreId: string,
    threadId: string,
    message: string,
    template: string,
  ): Promise<MessageContent[]>;
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
}

/**
 *  @public
 *  Vector Store Manager
 */

export interface IVectorStoreManager {
   createVector(name: string): Promise<string>;
   uploadFiles(vectorStoreId: string, files: File[]): Promise<void>
}
