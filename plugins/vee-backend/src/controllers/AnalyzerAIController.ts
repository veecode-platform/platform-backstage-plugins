import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { AnalyzeAndStartChatParams, DeleteChatParams, DonwloadRepoAndCreateVectorStoreParams, veecodeAssistantAIAnalyzerReadPermission } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IAnalyzerAIControler } from './types';
import { VeeClient } from "../api/client";
import type { Config } from "@backstage/config";
import { HttpAuthService, LoggerService, PermissionsService } from '@backstage/backend-plugin-api';

export class AnalyzerAIController extends AssistantAIController implements IAnalyzerAIControler{

  private veeCodeAssistantAI: VeeClient;

  constructor(
    protected httpAuth: HttpAuthService,
    protected permissions: PermissionsService,
    protected config: Config,
    protected logger: LoggerService,
  ){
    super(httpAuth,permissions,config,logger);
    this.veeCodeAssistantAI = new VeeClient(this.config, this.logger)
  }
 
  createVectorStore = async (req: Request, res: Response) => {

    const { engine, repoName, files } = req.body as DonwloadRepoAndCreateVectorStoreParams;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
  
      if(!files || files.length === 0 || !Array.isArray(files)){
        res.status(400).json({error: "No files uploaded"})
      }

      const response = await this.veeCodeAssistantAI.submitDataToVectorStore(engine,repoName, files);

        res.status(200).json({
        message: response.message,
        vectorStoreId : response.vectorStoreId,
      })
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Error during upload and initialization: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  analyzeAndStartChat = async (req: Request, res: Response) => {

    const {engine, vectorStoreId, prompt, repoName, repoStructure } = req.body as AnalyzeAndStartChatParams;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {

      const response = await this.veeCodeAssistantAI.chat(engine,vectorStoreId, prompt, repoName, repoStructure);

      res.status(200).json({
        assistantId: response.assistantId,
        message: response.analysis,
        data: response.messages,
        generatedFiles: response.generatedFiles,
        threadId: response.threadId
      });
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Analysis Failed: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  deleteChat = async (req: Request, res: Response) => {

    const { engine, vectorStoreId, assistantId, threadId } = req.body as DeleteChatParams;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    // TODO Check response

     try{
       const response = await this.veeCodeAssistantAI.clearHistory(engine,vectorStoreId, assistantId, threadId)
       res.status(200).json({
        status: response.status,
        message: response.message,
      });
      }
      catch(err:any){
        if (err.errors) {
          throw new InputError(
            `Error to clear history ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
  };
}
