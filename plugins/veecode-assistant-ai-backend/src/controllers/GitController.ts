import { LoggerService } from "@backstage/backend-plugin-api";
import { Git } from "../api/git/git";
import { Request, Response } from 'express';
import { CloneRepositoryParams } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { InputError, stringifyError } from "@backstage/errors";
import { IGitController } from "./types";

export class GitController implements IGitController {

    public git : Git;

    constructor(
        private readonly logger: LoggerService
    ){
        this.git = new Git(this.logger)
    };

    clone = async (req: Request,res: Response) => {

      const { localPath, repoUrl, branch } = req.body  as CloneRepositoryParams;

    try {
  
        if(!localPath || !repoUrl || !branch){
          res.status(400).json({error: "Bad Request"})
        }
  
        const response = await this.git.cloneRepo(localPath,repoUrl,branch);
  
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

    getFiles = async (req: Request, res:Response) => {
        const { localPath } = req.params;

        try {
      
            if(!localPath){
              res.status(400).json({error: "Bad Request"})
            }
      
            const response = await this.git.returnFilesFromLocalPath(localPath);
      
              res.status(200).json({
              data: response
            })
          } catch (err: any) {
            if (err.errors) {
              throw new InputError(
                `Error during get files from localPath: [${localPath}] : ${stringifyError(
                  err.errors,
                )}`,
              );
            }
            throw err;
          }
    }

}