import { Request, Response } from 'express';
import { CloneRepositoryParams } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { InputError, stringifyError } from "@backstage/errors";
import { IGitController } from "./types";
import { AssistantAIController } from "./AssistantAIController";

export class GitController extends AssistantAIController implements IGitController {

    returnToken = (req:Request) => {
      return this.getToken(req);
    }

    clone = async (req: Request,res: Response) => {

    const { location } = req.body  as CloneRepositoryParams;

    if(!location){
      res.status(400).json({error: "Bad Request: Expect: { location } in the request body"})
    }

    try {
        const token = this.returnToken(req);
        const gitManager = this.gitManager();
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

}