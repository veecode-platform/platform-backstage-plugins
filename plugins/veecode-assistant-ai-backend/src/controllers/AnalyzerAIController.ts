import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { veecodeAssistantAIAnalyzerReadPermission } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IAnalyzerAIControler } from './types';

export class AnalyzerAIController extends AssistantAIController implements IAnalyzerAIControler{

  async uploadFiles (req: Request, res: Response) {

    const { repoName, files } = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const vectorStoreId = await this.openAIApi.createVectorStore(repoName);

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

  async analyzeAndStartChat (req: Request, res: Response) {

    const { vectorStoreId, message} = req.body;

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const { threadId, assistantId } = await this.openAIApi.startChat(vectorStoreId);
    
      const response = await this.openAIApi.getChat(assistantId, threadId, message)

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
        veecodeAssistantAIAnalyzerReadPermission,
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
