import { Request, Response } from 'express';
import { CloneRepositoryParams, SaveChangesInRepository } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { InputError, stringifyError } from "@backstage/errors";
import { IGitController } from "./types";
import { AssistantAIController } from "./AssistantAIController";

export class GitController extends AssistantAIController implements IGitController {

    returnToken = (req:Request) => {
      this.logger.info(`Dentro do RETURN TOKEN NO GITCONTROLLER >>>>>>> ${req.headers.authorization}`)
      return this.getToken(req);
    }

    clone = async (req: Request,res: Response) => {

    const { location } = req.body  as CloneRepositoryParams;

    if(!location){
      res.status(400).json({error: "Bad Request: Expect: { location } in the request body"})
    }

    try {
        const token = this.returnToken(req);
        const gitManager = this.gitProviderManager(token);
        const { localPath, repoUrl, branch } = await gitManager.returnRepoInfo(location);
        const response = await gitManager.cloneRepo(token,localPath,repoUrl,branch);
        res.status(200).json({
          message: 'Repository successfully cloned',
          data: response
        })
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error during clone: ${stringifyError(
              err.errors,
            )}`,
          );
        }
        throw err;
      }
      
    }
    
    submitChangesToRepository = async(req:Request, res:Response) => {
      const {
        files,
        location,
        title,
        message
      } = req.body as SaveChangesInRepository;

      if(!files || !location || !title || !message){
        res.status(400).json({error: "Bad Request. Expect: {files, location, title, message} in the request body"})
      }

      try {    
        const token = this.returnToken(req);
        const gitManager = this.gitProviderManager(token);
        const response = await gitManager.createPullRequest(files,location,title,message);
  
          res.status(200).json({
          status: response.status,
          message: response.message,
          link: response.link
        })
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to save changes in repository : ${stringifyError(
              err.errors,
            )}`,
          );
        }
        throw err;
      }


    }

}