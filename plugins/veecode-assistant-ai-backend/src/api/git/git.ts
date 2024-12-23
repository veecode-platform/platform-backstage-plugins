import { LoggerService } from '@backstage/backend-plugin-api';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { IGit } from './types';
import { convertRepoDataToFiles } from '../../utils/helpers/transformToFIle';


export class Git implements IGit {

    constructor(
        private readonly logger: LoggerService
    ){}

    async cloneRepo(localPath: string, repoUrl: string, branch: string) {
        const git = simpleGit();
        try {
          this.logger.info("Initializing the repository clone process...")
          const response = await git.clone(repoUrl, localPath, ['--branch', branch]);
          this.logger.info("Repository successfully cloned!");
          return response;
        } catch (error) {
          this.logger.error(`Error when cloning repository ${error}`);
          throw new Error(`Error when cloning repository:  ${error}`);
        }
      }

    async returnFilesFromLocalPath(localPath:string){
        try {
            const files: { [fileName: string]: string } = {};
            const readDirectory = async (dir: string) => {
              const entries = await fs.promises.readdir(dir, { withFileTypes: true });
              for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                  await readDirectory(fullPath);
                } else {
                  const content = await fs.promises.readFile(fullPath, 'utf-8');
                  const relativePath = path.relative(localPath, fullPath);
                  files[relativePath] = content;
                }
              }
            };
        
            await readDirectory(localPath);

            const convertFiles = convertRepoDataToFiles(files)
            return convertFiles;
    } 
    catch (error) {
        throw new Error(`Error when returning files:  ${error}`);
      }
 }
}