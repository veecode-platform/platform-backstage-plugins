import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { parseGitUrl } from "../../../utils/helpers/parseGitUrl";
import { GithubManager } from "../github";
import { GitlabManager } from "../gitlab";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
// import { IGitManager } from "./types";

export class GitManager /* implements IGitManager */  {

    private readonly githubManager : GithubManager;
    private readonly gitlabManager : GitlabManager;
    private readonly token: string;
    
    constructor(
        private readonly config: Config,
        private readonly logger: LoggerService,
        token: string
    ){
        this.token = token;    
        this.githubManager = new GithubManager(this.config, this.logger, this.token);
        this.gitlabManager = new GitlabManager(this.config, this.logger, this.token);
    }

    async returnRepoInfo(location:string){
      const  url = parseGitUrl(location);
      switch(true){
        case url.includes('github'): {
          return this.githubManager.returnRepoInfo(url);
       }
          case url.includes('gitlab'): {
              return this.gitlabManager.returnRepoInfo(url);
           }
          default:
            throw new Error('Git provider error: unimplemented!');
      }
  }
   
   async removeTemporaryPath (localPath:string){
     await fs.promises.rm(localPath, { recursive: true, force: true });
   }

    async cloneRepo(token:string,localPath: string, repoUrl: string, branch: string) {
        const git = simpleGit();
        try {
          this.logger.info("Initializing the repository clone process...");
        // Check if the folder exists and remove it if necessary
          if (fs.existsSync(localPath)) {
            this.logger.info(`Removing existing directory: ${localPath}`);
            await this.removeTemporaryPath(localPath);
        }
        // Configure the authorization header
          await git.addConfig('http.extraHeader', `Authorization: Bearer ${token}`);
        // Clone the repository
          await git.clone(repoUrl, localPath, ['--branch', branch]);
          this.logger.info(`Repository successfully cloned! Cloned repository path: ${localPath}`);
         
          if (!fs.existsSync(localPath)) {
            this.logger.error(`Directory not found: ${localPath}`);
            throw new Error(`Error: Directory not found: ${localPath}`);
          }

        // return the files from the temporary folder
         const files = await this.returnFilesFromLocalPath(localPath)

        // Remove the authorization header
          await git.raw(['config', '--unset', 'http.extraHeader']);

          return {
            status: 'ok',
            localPath,
            data: files
          };
        } catch (error) {
          this.logger.error(`Error when cloning repository ${error}`);
          throw new Error(`Error when cloning repository:  ${error}`);
        }
      }
    
    async returnFilesFromLocalPath(localPath: string) {
      this.logger.info("Recovering cloned files...");
    
      if (!fs.existsSync(localPath)) {
        this.logger.error(`Directory not found: ${localPath}`);
        throw new Error(`Error: Directory not found: ${localPath}`);
      }
    
      try {
        const files: Array<{ relativePath: string; name: string; content: string }> = [];
    
        const readDirectory = async (dir: string) => {
          const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
    
            // Ignorar o diretório .git
            if (entry.name === ".git") {
              continue;
            }
    
            if (entry.isDirectory()) {
              // Recurse para subdiretórios
              await readDirectory(fullPath);
            } else {
              // Ler o conteúdo do arquivo
              const content = await fs.promises.readFile(fullPath, 'utf-8');
              const relativePath = path.relative(localPath, fullPath);
              const name = path.basename(fullPath);
              files.push({ relativePath, name, content });
            }
          }
        };
    
        await readDirectory(localPath);
    
        return files;
      } catch (error) {
        throw new Error(`Error when returning files: ${error}`);
      }
    }
    

    async createPullRequest(
        files: FileContent[],
        location: string,
        title: string,
        message: string
    ){
        const  url = parseGitUrl(location); 

        switch(true){
            case url.includes('github'): {
               return this.githubManager.createPullRequest(files,url,title,message);
            }
            case url.includes('gitlab'): {
                return this.gitlabManager.createMergeRequest(files,url,title,message);
             }
            default:
              throw new Error('Git provider error: unimplemented!');
        }

        
    }
}