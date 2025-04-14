import simpleGit from "simple-git";
import type { LoggerService } from "@backstage/backend-plugin-api";
import { parseGitUrl } from "../../../utils/helpers/parseGitUrl";
import { GithubManager } from "../github";
import { GitlabManager } from "../gitlab";
import { FileContent, IRepository } from "@veecode-platform/backstage-plugin-vee-common";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import { IGitManager } from "./types";

export class GitManager implements IGitManager {
  private readonly githubManager: GithubManager;
  private readonly gitlabManager: GitlabManager;

  constructor(private readonly logger: LoggerService) {
    this.githubManager = new GithubManager();
    this.gitlabManager = new GitlabManager();
  }

  async returnRepoInfo(location:string) {
    const url = location.startsWith("url") ? parseGitUrl(location) : location;
   
    switch (true) {
      case url.includes("github"): {
        return this.githubManager.returnRepoInfo(url);
      }
      case url.includes("gitlab"): {
        return this.gitlabManager.returnRepoInfo(url);
      }
      default:
        throw new Error("Git provider error: unimplemented!");
    }
  }

  async removeTemporaryPath(localPath: string) {
    await fs.promises.rm(localPath, { recursive: true, force: true });
  }

  async cloneRepo(token: string, localPath: string, repoUrl: string, branch: string | null) {
    this.logger.info("Initializing the repository clone process...");

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

    const isGitLab = repoUrl.includes("gitlab");
    const authenticatedRepoUrl = isGitLab
      ? repoUrl.replace("https://", `https://oauth2:${token}@`)
      : repoUrl.replace("https://", `https://${token}@`);

    try {
      this.logger.info(`Cloning repository...`);

      const git = simpleGit();
      await git.clone(authenticatedRepoUrl, localPath, branch ? ["--branch", branch, "--depth", "1"] : [] );

      if (!fs.existsSync(localPath)) {
        throw new Error(`Error: Directory not found: ${localPath}`);
      }

      this.logger.info(`Repository successfully cloned! Cloned repository path: ${localPath}`);

      // Return files from the cloned repository
      return await this.returnFilesFromLocalPath(localPath);
    } catch (error) {
      this.logger.error(`Error when cloning repository: ${error}`);
      throw new Error(`Error when cloning repository: ${error}`);
    }
  }

  async partialClone(token: string, localPath: string, repoUrl: string, branch: string | null, folderPath: string) {
    this.logger.info(`Initializing partial clone for folder: ${folderPath}`);

    if (fs.existsSync(localPath)) {
      this.logger.info(`Directory exists: ${localPath}, removing it.`);
      await this.removeTemporaryPath(localPath);
    }

    const isGitLab = repoUrl.includes("gitlab");
    const authenticatedRepoUrl = isGitLab
      ? repoUrl.replace("https://", `https://oauth2:${token}@`)
      : repoUrl.replace("https://", `https://${token}@`);

    try {
      this.logger.info(`Cloning repository...`);

      const git = simpleGit();
      await git.clone(authenticatedRepoUrl, localPath, branch ? ["--branch", branch, "--depth", "1"] : []);

      if (!fs.existsSync(localPath)) {
        throw new Error(`Error: Directory not found: ${localPath}`);
      }

      this.logger.info(`Repository successfully cloned! Now configuring sparse checkout.`);

      await git.cwd(localPath);
      await git.raw(['sparse-checkout', 'init', '--cone']);
      await git.raw(['sparse-checkout', 'set', folderPath]);

      this.logger.info(`Sparse checkout configured for: ${folderPath}`);

      // Return files from the partially cloned repository
      return await this.returnFilesFromLocalPath(path.join(localPath, folderPath));
    } catch (error) {
      this.logger.error(`Error during partial clone: ${error}`);
      throw new Error(`Error during partial clone: ${error}`);
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

        if (entry.name === ".git") continue;

        if (entry.isDirectory()) {
          parentTree[entry.name] = {};
          await readDirectory(fullPath, parentTree[entry.name]);
        } else {
          const extension = path.extname(entry.name).toLowerCase().replace(".", "");

          if (notAllowedFiles.includes(extension) || notAllowedFilenames.includes(entry.name)) {
            this.logger.info(`Ignoring file: ${entry.name}`);
            continue;
          }

          const mimeType = mime.lookup(entry.name) ||
            (extension === "ts" || extension === "tsx" ? "application/typescript" : "application/octet-stream");
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
              name: `${entry.name}.txt`,
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

          parentTree[entry.name] = null;
        }
      }
    };

    await readDirectory(localPath, tree);
    const structure = JSON.stringify(tree, null, 4).replace(/"/g, "");

    await fs.promises.rm(localPath, { recursive: true, force: true });
    return { files, structure };
  }
}
