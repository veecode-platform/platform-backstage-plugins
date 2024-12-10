import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { veecodeAssistantAIScaffolderReadPermission} from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IScaffolderAIControler } from './types';

export class ScaffolderAIController extends AssistantAIController implements IScaffolderAIControler{

  async uploadTemplateFiles (req: Request, res: Response) {

    const { engine, templateName, files } = req.body;
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIScaffolderReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
    
      if(!files || files.length === 0){
        res.status(400).json({error: "No files uploaded"})
      }

      const response = await veecodeAssistantAI.submitDataToVectorStore(templateName, files);

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
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIScaffolderReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {

      const response = await veecodeAssistantAI.chat(vectorStoreId,prompt, template, useDataset)

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
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

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
       const response = await veecodeAssistantAI.clearHistory(vectorStoreId, assistantId, threadId)
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
