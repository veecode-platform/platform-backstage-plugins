import type { FileContent } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import fs from 'fs';
import path from 'path';

/**
 * Recria a estrutura de arquivos localmente com base no `relativePath`.
 * @param files - Array de objetos File com o metadado `relativePath`.
 * @param basePath - Diretório base onde os arquivos serão recriados.
 */
export async function recreateFileStructure(files: FileContent[], basePath: string) {
  for (const file of files) {
    const relativePath = (file as any).relativePath; // Obtém o caminho original
    const fullPath = path.join(basePath, relativePath);

    // Cria os diretórios, se necessário
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });

    // Salva o conteúdo do arquivo no diretório local
    const content = file.content;
    await fs.promises.writeFile(fullPath, content, 'utf-8');
  }
}
