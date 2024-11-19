import { OpenAIClient } from '../openAIClient';
import { IVectorStoreManager } from '../types';

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
    try {
      /**
       * file map
       */
      const fileIds = await Promise.all(
        files.map(async file => {
          const uploadFile = await this.client.files.create({
            file,
            purpose: 'assistants',
          });
          return uploadFile.id;
        }),
      );

      await Promise.all(
        fileIds.map(fileId =>
          this.client.beta.vectorStores.files.create(vectorStoreId, {
            file_id: fileId,
          }),
        ),
      );
    } catch (error: any) {
      throw new Error(
        `Erro to upload vectorStore ID ${vectorStoreId}:  ${error}`,
      );
    }
  }

  async deleteVectorStore(vectorStoreId: string) {
    try {
      const response = await this.client.beta.vectorStores.del(vectorStoreId);
      this.logger.info(`VectorStore deleted, ID: ${vectorStoreId}`);
      return response;
    } catch (error: any) {
      throw new Error(
        `Erro to delete vectorStore ID ${vectorStoreId}:  ${error}`,
      );
    }
  }
}
