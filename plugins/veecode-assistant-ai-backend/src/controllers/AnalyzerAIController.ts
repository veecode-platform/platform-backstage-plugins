import { Request, Response } from 'express';
import { AssistantAIController } from './AssistantAIController';
import { AnalyzeAndStartChatParams, DeleteChatParams, DonwloadRepoAndCreateVectorStoreParams, SaveChangesInRepository, veecodeAssistantAIAnalyzerReadPermission, veeCodeAssistantAIAnalyzerSaveChangesInRepo } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IAnalyzerAIControler } from './types';

export class AnalyzerAIController extends AssistantAIController implements IAnalyzerAIControler{

  private returnToken(req:Request){
    return this.getToken(req);
  }
  
  async donwloadRepoAndCreateVectorStore (req: Request, res: Response) {

    const { engine, repoName, location } = req.body as DonwloadRepoAndCreateVectorStoreParams;
    const token = this.returnToken(req);
    const gitManager = this.gitProviderManager(token);
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
  
      const files = await gitManager.downloadRepoFiles(location) as File[]

      if(!files || files.length === 0){
        res.status(400).json({error: "No files uploaded"})
      }

      const response = await veecodeAssistantAI.submitDataToVectorStore(repoName, files);

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

  async analyzeAndStartChat (req: Request, res: Response) {

    const {engine, vectorStoreId, prompt} = req.body as AnalyzeAndStartChatParams;
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

    if (
      !(await this.isRequestAuthorized(
        req,
        veecodeAssistantAIAnalyzerReadPermission,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {

      const response = await veecodeAssistantAI.chat(vectorStoreId, prompt);

      res.status(200).json({
        assistantId: response.assistantId,
        message: "Analysis completed",
        data: response.messages,
        generatedFiles: response.generatedFiles || [],
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

  async deleteChat (req: Request, res: Response) {

    const { engine, vectorStoreId, assistantId, threadId } = req.body as DeleteChatParams;
    const veecodeAssistantAI = this.veeCodeAssistantAI(engine);

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
       const response = await veecodeAssistantAI.clearHistory(vectorStoreId, assistantId, threadId)
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

  async saveChangesInRepository(req:Request, res:Response){

    // TODO title e message deixar para IA fazer
    const { files, location, title, message } = req.body as SaveChangesInRepository;
    const token = this.returnToken(req);
    const gitManager = this.gitProviderManager(token);

    if (
      !(await this.isRequestAuthorized(
        req,
        veeCodeAssistantAIAnalyzerSaveChangesInRepo,
      ))
    ) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
  
      const response = await gitManager.createPullRequest(files,location,title,message)

        res.status(200).json({
        message: response.message,
        link : response.link,
      })
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Error during save the changes: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }

  }
}
