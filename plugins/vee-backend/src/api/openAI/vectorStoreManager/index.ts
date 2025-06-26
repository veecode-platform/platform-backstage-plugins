import { FileContent } from '@veecode-platform/backstage-plugin-vee-common';
import { recreateFileStructure } from '../../../utils/helpers/recreateFileStructure';
import { OpenAIClient } from '../openAIClient';
import { IVectorStoreManager } from '../types';
import fs from 'fs';
import path from 'path';

export class VectorStoreManager
  extends OpenAIClient
  implements IVectorStoreManager
{
  async createVector(name: string) {
    try {
      this.logger.info('Creating vectorStore...');
      const vectorStore = await this.client.vectorStores.create({
        name,
        expires_after: { anchor: 'last_active_at', days: 1 },
      });
      this.logger.info(`New vectorStore Created: ${vectorStore.id}`);
      return vectorStore.id;
    } catch (error: any) {
      throw new Error(`Error creating vectorStore: ${error.message}`);
    }
  }

  async uploadFiles(vectorStoreId: string, files: FileContent[]) {
    const basePath = './output';
    const CHUNK_SIZE = 10;

    if (!Array.isArray(files)) {
      throw new Error(`'files' must be an array. Received: ${typeof files}`);
    }
    if (files.length === 0) {
      throw new Error('No files to upload');
    }

    try {
      // Filters empty files before recreating the structure
      const nonEmptyFiles = files.filter(
        file => file.content.trim().length > 0,
      );
      if (nonEmptyFiles.length === 0) {
        throw new Error('All files are empty and cannot be uploaded');
      }

      // Recreate the file structure in the local directory
      await recreateFileStructure(nonEmptyFiles, basePath);

      // Read the recreated files
      const preparedFiles = await this.readFilesFromDirectory(basePath);

      // Split files into chunks
      const chunks = [];
      for (let i = 0; i < preparedFiles.length; i += CHUNK_SIZE) {
        chunks.push(preparedFiles.slice(i, i + CHUNK_SIZE));
      }

      // Process each chunk
      for (const chunk of chunks) {
        const fileIds = await Promise.all(
          chunk.map(async file => {
            const uploadFile = await this.client.files.create({
              file,
              purpose: 'assistants',
            });
            return uploadFile.id;
          }),
        );

        // Upload with attempts
        await this.uploadWithRetries(vectorStoreId, fileIds, 5);
      }

      return {
        status: 'ok',
        message: 'Vector store successfully created!',
      };
    } catch (error: any) {
      throw new Error(
        `Error while uploading files to VectorStore ID ${vectorStoreId}: ${error.message}`,
      );
    } finally {
      await fs.promises.rm(basePath, { recursive: true, force: true });
    }
  }

  private async uploadWithRetries(
    vectorStoreId: string,
    fileIds: string[],
    maxRetries: number,
  ) {
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        await Promise.all(
          fileIds.map(fileId =>
            this.client.vectorStores.files.create(vectorStoreId, {
              file_id: fileId,
            }),
          ),
        );
        return; // Upload successful, exit loop
      } catch (error: any) {
        if (error.status === 409) {
          this.logger.warn(
            `Conflict detected for VectorStore ${vectorStoreId} while uploading chunk. Retrying... (${
              retry + 1
            }/${maxRetries})`,
          );
          await new Promise(resolve => setTimeout(resolve, 2000 * (retry + 1))); // Delay
        } else {
          throw error; // Error not related to conflict
        }
      }
    }

    throw new Error(
      `Failed to upload chunk after ${maxRetries} retries due to conflicts.`,
    );
  }

  private async readFilesFromDirectory(dir: string): Promise<File[]> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const allFiles: File[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const nestedFiles = await this.readFilesFromDirectory(fullPath);
        allFiles.push(...nestedFiles);
      } else {
        const content = await fs.promises.readFile(fullPath);
        if (content.length > 0) {
          const file = new File([content], path.relative(dir, fullPath), {
            type: 'text/plain',
          });
          allFiles.push(file);
        } else {
          this.logger.warn(`File is empty and will be skipped: ${entry.name}`);
        }
      }
    }

    return allFiles;
  }

  async deleteVectorStore(vectorStoreId: string) {
    try {
      const response = await this.client.vectorStores.delete(vectorStoreId);
      this.logger.info(`VectorStore deleted, ID: ${vectorStoreId}`);
      return {
        status: 'ok',
        ...response,
      };
    } catch (error: any) {
      throw new Error(
        `Error deleting VectorStore ID ${vectorStoreId}: ${error.message}`,
      );
    }
  }
}
