import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { AssistantAI } from "../assistantAI";
import { OpenAIClient } from "../openAIClient"
import { ThreadsManager } from "../threadsManager";
import { IOpenAIApi } from "../types";
import { VectorStoreManager } from "../vectorStoreManager";
import { extractFilesFromMessage } from "../../../utils/helpers/extractFilesFromMessage";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export class OpenAIApi extends OpenAIClient implements IOpenAIApi {

  private vectorStoreManager: VectorStoreManager;
  private assistantAI: AssistantAI;
  private threadsManager: ThreadsManager;

  constructor(config: Config, logger: LoggerService) {
    super(config,logger);
    this.vectorStoreManager = new VectorStoreManager(config, logger);
    this.assistantAI = new AssistantAI(config, logger)
    this.threadsManager = new ThreadsManager(config, logger);
  }

  async submitDataToVectorStore(repoName:string, files:FileContent[]){
    this.logger.info(`Entrei aqui no método submitDataToVectorStore ${files} << FILES`)
    const vectorStoreId = await this.vectorStoreManager.createVector(repoName);
    const response = await this.vectorStoreManager.uploadFiles(vectorStoreId, files);
    return {
      ...response,
      vectorStoreId
    }
  }

  async initializeAssistant(vectorStoreId: string, repoName:string, repoStructure:string, useDataset?:boolean) {
    try {
      this.logger.info("Check Assistant Available...");
      const { model, dataset } = this.OpenAIConfig.getOpenAIConfig();
      const assistants = await this.client.beta.assistants.list();
      const existingAssistant = repoName ? assistants.data.find((a: any) => a.name === repoName) : false;
      const modelUses = (useDataset && dataset) ? dataset.model : model;

      if (!existingAssistant) return this.assistantAI.initializeAssistant(vectorStoreId,repoName,repoStructure,modelUses);

      this.logger.info(`Assistant found: ${existingAssistant.id}`);
      return existingAssistant.id;

    } catch (error: any) {
      throw new Error(`Erro to check assistant:  ${error}`);
    }
  }

  async startChat(vectorStoreId: string, repoName:string, repoStructure:string, useDataset?:boolean) {
    try {
      this.logger.info('starting chat...');
      const assistant = await this.initializeAssistant(vectorStoreId,repoName, repoStructure, useDataset);
      const thread = await this.threadsManager.createThread();
      this.logger.info(`Thread Created: ${thread.id}`);
      return { threadId: thread.id, assistantId: assistant };
    } catch (error: any) {
      throw new Error(`Erro to start chat:  ${error}`);
    }
  }

  async executeAndCreateRun(assistantId: string, threadId: string, template: string) {
    const run = await this.threadsManager.executeAndCreateRun(threadId, assistantId, template ?? null)
    return run;
  }

  async getChat(assistantId: string, threadId: string, message: string, template?: string) {
    try {
        // Adiciona a mensagem ao thread
        await this.threadsManager.addMessageToThread(threadId, message);

        // Executa e cria o run
        const run = await this.executeAndCreateRun(assistantId, threadId, template!);

        // Aguarda a conclusão do run
        let runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
        while (runValidate.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runValidate = await this.threadsManager.checkRunStatus(threadId, run.id);
        }

        // Recupera as mensagens mais recentes
        const latestMessages = await this.threadsManager.listMessages(threadId);

        // Extrai arquivos gerados a partir das mensagens
        const generatedFiles: FileContent[] = latestMessages.data
            .flatMap((msg: any) => extractFilesFromMessage(msg.content));

        // Verifica se há mensagens com metadados de execução do Code Interpreter
        const processedFiles: FileContent[] = latestMessages.data.flatMap((msg: any) => {
            if (msg.attachments && msg.attachments.length > 0) {
                return msg.attachments.map((attachment: any) => ({
                    name: attachment.filename,
                    content: attachment.content, // Conteúdo do arquivo gerado
                    type: attachment.mime_type, // Tipo MIME do arquivo gerado
                }));
            }
            return [];
        });

        // Combina arquivos extraídos e processados
        const allFiles = [...generatedFiles, ...processedFiles];

        // Filtra mensagens para obter a análise
        const analysisText = latestMessages.data
            .filter((msg: any) => msg.role === "assistant")
            .map((msg: any) => {
                const contentBlock = msg.content?.find((content: any) => content.type === "text");
                return contentBlock?.text?.value || null;
            })
            .filter((text: string | null) => text !== null)
            .join("\n\n");

        // Retorna mensagens completas e arquivos gerados
        return {
            analysis: analysisText || "Analysis not available.",
            generatedFiles: allFiles,
            messages: latestMessages.data,
        };
    } catch (error: any) {
        throw new Error(`Erro ao obter o chat: ${error}`);
    }
  }

  async clearHistory(vectorStoreId:string,assistantId:string, threadId:string){
    this.logger.info('clearing History...');
    // delete vectorStore
    const deleteVectorStore = await this.vectorStoreManager.deleteVectorStore(vectorStoreId);
    // delete threads
    const deleteThread = await this.threadsManager.deleteThread(threadId);
    // delete assistant
    const deleteAssistant = await this.assistantAI.deleteAssistant(assistantId);

    if(deleteVectorStore.status === "ok" && deleteThread.status === "ok" && deleteAssistant.status === "ok"){
      return {
        status: "ok",
        message: "History successfully cleared!"
      }
    }

    return{
      status: "failed",
      message: "Failed to delete history!"
    }
  }

}