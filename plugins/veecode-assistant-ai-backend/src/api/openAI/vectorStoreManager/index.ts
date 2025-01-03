import { recreateFileStructure } from '../../../utils/helpers/recreateFileStructure';
import { OpenAIClient } from '../openAIClient';
import { IVectorStoreManager } from '../types';
import fs from 'fs';
import path from 'path';

export class VectorStoreManager extends OpenAIClient implements IVectorStoreManager{

  async createVector(name: string) {
    try {
      this.logger.info('Creating vectorStore...');
      const vectorStore = await this.client.beta.vectorStores.create({
        name,
        expires_after: { anchor: 'last_active_at', days: 1 },
      });
      this.logger.info(`New vectorStore Created: ${vectorStore.id}`);
      return vectorStore.id;
    } catch (error: any) {
      throw new Error(`Erro to create vectorStore:  ${error}`);
    }
  }
  
  async uploadFiles(vectorStoreId: string, files: File[]) {
    const basePath = './output';
    const CHUNK_SIZE = 10; // Número máximo de arquivos por lote
    
    try {
      // Passo 1: Recriar a estrutura de pastas localmente
      await recreateFileStructure(files, basePath);
  
      // Passo 2: Ler os arquivos recriados
      const preparedFiles = await this.readFilesFromDirectory(basePath);
  
      // Passo 3: Dividir em chunks
      const chunks = [];
      for (let i = 0; i < preparedFiles.length; i += CHUNK_SIZE) {
        chunks.push(preparedFiles.slice(i, i + CHUNK_SIZE));
      }
  
      // Passo 4: Enviar cada chunk separadamente
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
  
        // Associar os arquivos ao VectorStore
        await Promise.all(
          fileIds.map(fileId =>
            this.client.beta.vectorStores.files.create(vectorStoreId, {
              file_id: fileId,
            }),
          ),
        );
      }
  
      return {
        status: 'ok',
        message: 'Vector store successfully created!',
      };
    } catch (error) {
      throw new Error(`Erro ao enviar arquivos para o VectorStore ID ${vectorStoreId}: ${error}`);
    } finally {
      await fs.promises.rm(basePath, { recursive: true, force: true });
    }
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
        const file = new File([content], path.relative(dir, fullPath), {
          type: 'text/plain',
        });
        allFiles.push(file);
      }
    }
  
    return allFiles;
  }
  

  async deleteVectorStore(vectorStoreId: string) {
    try {
      const response = await this.client.beta.vectorStores.del(vectorStoreId);
      this.logger.info(`VectorStore deleted, ID: ${vectorStoreId}`);
      return {
        status: "ok",
        ...response
      };
    } catch (error: any) {
      throw new Error(
        `Erro to delete vectorStore ID ${vectorStoreId}:  ${error}`,
      );
    }
  }
}
