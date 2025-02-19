import type { FileContent } from '@veecode-platform/backstage-plugin-vee-common';
import fs from 'fs';
import path from 'path';

/**
 * Recreates the file structure locally based on the `relativePath`.
 * @param files - Array of File objects with the `relativePath` metadata.
 * @param basePath - Base directory where the files will be recreated.
 */
export async function recreateFileStructure(files: FileContent[], basePath: string) {
  for (const file of files) {
    const relativePath = (file as any).relativePath; // Get the original path
    const fullPath = path.join(basePath, relativePath);

    // Create directories, if necessary
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });

    // Saves the contents of the file in the local directory
    const content = file.content;
    await fs.promises.writeFile(fullPath, content, 'utf-8');
  }
}
