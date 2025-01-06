import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { parseGitUrl } from "../../../utils/helpers/parseGitUrl";
import { GithubManager } from "../github";
import { GitlabManager } from "../gitlab";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
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
            // this.logger.info(`Removing existing directory: ${localPath}`);
            // await this.removeTemporaryPath(localPath);
            this.logger.info(`Directory exists: ${localPath}`);
            const files = await this.returnFilesFromLocalPath(localPath);
            if(files.length > 0){
              this.logger.info(`Directory contain files, return existing files`);
              return files
            }
        
            this.logger.info(`Directory is empty, removing it.`);
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

          return files
        } catch (error) {
          this.logger.error(`Error when cloning repository ${error}`);
          throw new Error(`Error when cloning repository:  ${error}`);
        }
      }

    async returnFilesFromLocalPath(localPath: string): Promise<FileContent[]> {
      this.logger.info("Recovering cloned files...");
    
      if (!fs.existsSync(localPath)) {
        this.logger.error(`Directory not found: ${localPath}`);
        throw new Error(`Error: Directory not found: ${localPath}`);
      }
    
      try {
        const files: FileContent[] = [];
        const allowedForApi = [
          "c", "cpp", "css", "csv", "doc", "docx", "gif", "go", "html",
          "java", "jpeg", "jpg", "js", "json", "md", "pdf", "php", "pkl",
          "png", "pptx", "py", "rb", "tar", "tex", "ts", "txt", "webp",
          "xlsx", "xml", "zip"
        ];
        const notAllowedFiles = ["webp", "ico", "mp4", "png", "jpg", "jpeg", "gif", "bmp", "svg", "avi", "mov", "mp3", "wav", "ogg"];
        const notAllowedFilenames = ["yarn.lock", "package-lock.json", ".editorconfig", ".eslintignore", ".gitignore"];
    
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
              const extension = path.extname(entry.name).toLowerCase().replace(".", ""); // Remove o ponto inicial
    
              // Ignorar arquivos não permitidos e certos nomes
              if (notAllowedFiles.includes(extension) || notAllowedFilenames.includes(entry.name)) {
                this.logger.info(`Ignoring file: ${entry.name}`);
                continue;
              }
    
              const mimeType = mime.lookup(entry.name) || 
                              (extension === 'ts' || extension === 'tsx' ? 'application/typescript' : 'application/octet-stream');
              const relativePath = path.relative(localPath, fullPath);
              const isAllowed = allowedForApi.includes(extension);
    
              // Ler o conteúdo do arquivo e converter, se necessário
              let content: string;
              try {
                content = await fs.promises.readFile(fullPath, "utf-8");
              } catch (error) {
                this.logger.error(`Error reading file: ${entry.name}. Skipping.`);
                continue;
              }
    
              // Converter arquivos não permitidos em txt
              if (!isAllowed) {
                files.push({
                  name: `${path.basename(entry.name, path.extname(entry.name))}.txt`,
                  relativePath: `${path.dirname(relativePath)}/${path.basename(entry.name, path.extname(entry.name))}.txt`,
                  content,
                  type: "text/plain",
                  originalFormat: extension, // Preservar formato original
                });
                this.logger.info(`Converted file: ${entry.name} -> .txt`);
              } else {
                files.push({
                  name: entry.name,
                  relativePath,
                  content,
                  type: mimeType,
                });
              }
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