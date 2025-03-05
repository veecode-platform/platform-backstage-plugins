import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { veeReadPermission} from '@veecode-platform/backstage-plugin-vee-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IScaffolderAIControler } from './types';
import { VeeClient } from '../api/client';
import type { HttpAuthService, LoggerService, PermissionsService } from '@backstage/backend-plugin-api';
import type { Config } from "@backstage/config";
import { DatabaseVeeStore } from '../database';

export class ScaffolderAIController extends AssistantAIController implements IScaffolderAIControler{

  private veeCodeAssistantAI: VeeClient;

  constructor(
    protected httpAuth: HttpAuthService,
    protected permissions: PermissionsService,
    protected config: Config,
    protected logger: LoggerService,
    protected database: DatabaseVeeStore
  ){
    super(httpAuth,permissions,config,logger,database);
    this.veeCodeAssistantAI = new VeeClient(this.config, this.logger)
  }

  async uploadTemplateFiles (req: Request, res: Response) {

    const { engine, templateName, files } = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veeReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
    
      if(!files || files.length === 0){
        res.status(400).json({error: "No files uploaded"})
      }

      const response = await this.veeCodeAssistantAI.submitDataToVectorStore(engine,templateName, files);

      res.status(200).json({
        message: response.message,
        vectorStoreId: response.vectorStoreId,
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


  async startChat (req: Request, res: Response) {

    const { engine, vectorStoreId, prompt, template, useDataset } = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veeReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {

      const response = await this.veeCodeAssistantAI.chat(engine,vectorStoreId,prompt, template, useDataset)

      res.status(200).json({
        message: "Analysis completed",
        data: response
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

  async deleteChat (req: Request, res: Response) {

    const { engine,vectorStoreId, assistantId, threadId } = req.body;
   
    if (
      !(await this.isRequestAuthorized(
        req,
        veeReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    // TODO Check response

     try{
       const response = await this.veeCodeAssistantAI.clearHistory(engine,vectorStoreId, assistantId, threadId)
       res.status(200).json({
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

  // TODO -- next feature: publish template in git provider
}
