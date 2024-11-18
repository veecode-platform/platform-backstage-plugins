import { OpenAIClient } from "../openAIClient";
import { IVectorStoreManager } from "../types";


export class VectorStoreManager extends OpenAIClient implements IVectorStoreManager {
  async createVector(name: string) {
    /**
     * create a new vector store
     */
    const vectorStore = await this.client.beta.vectorStores.create({
      name,
      expires_after: { anchor: "last_active_at", days: 1 },
    });

    return vectorStore.id;
  }

  async uploadFiles(vectorStoreId: string, files: File[]) {
    /**
     * file map
     */
    const fileIds = await Promise.all(
      files.map(async (file) => {
        const uploadFile = await this.client.files.create({
          file,
          purpose: "assistants",
        });
        return uploadFile.id;
      })
    );

    /**
     * Upload files to this vector store
     */
    await Promise.all(
      fileIds.map((fileId) =>
        this.client.beta.vectorStores.files.create(vectorStoreId, {
          file_id: fileId,
        })
      )
    );
  }
}
