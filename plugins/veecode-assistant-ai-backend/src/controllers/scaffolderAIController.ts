import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { veecodeAssistantAIScaffolderReadPermission } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';

export class ScaffolderAIController extends AssistantAIController {

  async uploadTemplateFiles (req: Request, res: Response) {

    const { templateName, files } = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIScaffolderReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const vectorStoreId = await this.openAIApi.createVectorStore(templateName);

      if(!files || files.length === 0){
        res.status(400).json({error: "No files uploaded"})
      }

      await this.openAIApi.updateVectorStore(vectorStoreId, files);

      res.status(200).json({
        message: "Upload Success",
        vectorStoreId,
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

    const { vectorStoreId, message, template, useDataset } = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIScaffolderReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const { threadId, assistantId } = await this.openAIApi.startChat(vectorStoreId,useDataset);
    
      const response = await this.openAIApi.getChat(assistantId, threadId, message, template)

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

    const { vectorStoreId, assistantId, threadId } = req.body

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIScaffolderReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    // TODO Check response

     try{
       await this.openAIApi.clearHistory(vectorStoreId, assistantId, threadId)
       res.status(200).json({
        message: "History deleted!",
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
