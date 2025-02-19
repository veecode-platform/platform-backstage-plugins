import type { LoggerService } from "@backstage/backend-plugin-api";
import { parseGitUrl } from "../../../utils/helpers/parseGitUrl";
import { GithubManager } from "../github";
import { GitlabManager } from "../gitlab";
import { FileContent, IRepository } from "@veecode-platform/backstage-plugin-vee-common";
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { IGitManager } from "./types";

export class GitManager implements IGitManager  {

    private readonly githubManager : GithubManager;
    private readonly gitlabManager : GitlabManager;
    
    constructor(
        private readonly logger: LoggerService,
    ){  
        this.githubManager = new GithubManager();
        this.gitlabManager = new GitlabManager();
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

    async cloneRepo(token: string, localPath: string, repoUrl: string, branch: string) {
      const git = simpleGit();
      try {
          this.logger.info("Initializing the repository clone process...");
  
          // Check if the folder exists and remove it if necessary
          if (fs.existsSync(localPath)) {
              this.logger.info(`Directory exists: ${localPath}`);
              const response = await this.returnFilesFromLocalPath(localPath);
              if (response.files.length > 0) {
                  this.logger.info(`Directory contains files, returning existing files`);
                  return response;
              }
  
              this.logger.info(`Directory is empty, removing it.`);
              await this.removeTemporaryPath(localPath);
          }
  
          // Configure the authorization header
          const isGitLab = repoUrl.includes('gitlab');
          const headerAuth = isGitLab
              ? `PRIVATE-TOKEN: ${token}`
              : `Authorization: Bearer ${token}`;
          await git.addConfig('http.extraHeader', headerAuth);
  
          // Update the repoUrl for GitLab to include the token
          const authenticatedRepoUrl = isGitLab
              ? repoUrl.replace('https://', `https://oauth2:${token}@`)
              : repoUrl;
  
          // Clone the repository
          await git.clone(authenticatedRepoUrl, localPath, ['--branch', branch]);
          this.logger.info(`Repository successfully cloned! Cloned repository path: ${localPath}`);
  
          if (!fs.existsSync(localPath)) {
              this.logger.error(`Directory not found: ${localPath}`);
              throw new Error(`Error: Directory not found: ${localPath}`);
          }
  
          // Return the files from the temporary folder
          const response = await this.returnFilesFromLocalPath(localPath);
  
          // Remove the authorization header
          await git.raw(['config', '--unset', 'http.extraHeader']);
  
          return response;
      } catch (error) {
          this.logger.error(`Error when cloning repository: ${error}`);
          throw new Error(`Error when cloning repository: ${error}`);
      }
  }
  

    async returnFilesFromLocalPath(localPath: string): Promise<IRepository> {
      this.logger.info("Recovering cloned files...");
  
      if (!fs.existsSync(localPath)) {
          this.logger.error(`Directory not found: ${localPath}`);
          throw new Error(`Error: Directory not found: ${localPath}`);
      }
  
      const files: FileContent[] = [];
      const tree: Record<string, any> = {}; 
  
      const allowedForApi = [
          "c", "cpp", "css", "csv", "doc", "docx", "gif", "go", "html",
          "java", "jpeg", "jpg", "js", "json", "md", "pdf", "php", "pkl",
          "png", "pptx", "py", "rb", "tar", "tex", "ts", "txt", "webp",
          "xlsx", "zip"
      ];
      const notAllowedFiles = ["webp", "ico", "mp4", "png", "jpg", "jpeg", "gif", "bmp", "svg", "avi", "mov", "mp3", "wav", "ogg"];
      const notAllowedFilenames = ["yarn.lock", "package-lock.json"];
  
      const readDirectory = async (dir: string, parentTree: Record<string, any>) => {
          const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  
          for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
  
              // Ignore .git
              if (entry.name === ".git") continue;
  
              if (entry.isDirectory()) {
                  parentTree[entry.name] = {};
                  await readDirectory(fullPath, parentTree[entry.name]);
              } else {
                  const extension = path.extname(entry.name).toLowerCase().replace(".", "");
  
                  // Ignore not allowed files and not allowed names
                  if (notAllowedFiles.includes(extension) || notAllowedFilenames.includes(entry.name)) {
                      this.logger.info(`Ignoring file: ${entry.name}`);
                      continue;
                  }
  
                  const mimeType = mime.lookup(entry.name) || 
                                  (extension === 'ts' || extension === 'tsx' ? 'application/typescript' : 'application/octet-stream');
                  const relativePath = path.relative(localPath, fullPath);
                  const isAllowed = allowedForApi.includes(extension);
  
                  let content: string;
                  try {
                      content = await fs.promises.readFile(fullPath, "utf-8");
                  } catch (error) {
                      this.logger.error(`Error reading file: ${entry.name}. Skipping.`);
                      continue;
                  }
  
                  if (!isAllowed) {
                    files.push({
                        name: `${entry.name}.txt`, // Keeps the original extension and add .txt
                        relativePath: `${path.dirname(relativePath)}/${entry.name}.txt`,
                        content,
                        type: "text/plain",
                        originalFormat: extension,
                    });
                    this.logger.info(`Converted file: ${entry.name} -> ${entry.name}.txt`);
                } else {
                    files.push({
                        name: entry.name,
                        relativePath,
                        content,
                        type: mimeType,
                    });
                }
  
                  // Adds a file to the directory in the format of
                  parentTree[entry.name] = null; 
              }
          }
      };
  
      await readDirectory(localPath, tree);
  
      // Converts the tree into string format for the instructions
      const structure = JSON.stringify(tree, null, 4).replace(/"/g, "");

      // remove temporary folder
      await this.removeTemporaryPath(localPath)
  
      return { files, structure };
  }
}