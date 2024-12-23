/**
 * Converte o formato { "filePath": "content" } para um array de objetos File[].
 * @param repoData - Objeto com os dados do repositório no formato { [fileName]: fileContent }.
* @returns - Um array de objetos File[] que preservam a estrutura de pastas.
*/
export function convertRepoDataToFiles(repoData: { [filePath: string]: string }): File[] {
    return Object.entries(repoData).map(([filePath, content]) => {
      const blob = new Blob([content], { type: 'text/plain' }); // Define o tipo de conteúdo como texto.
      const fileName = filePath.replace(/\//g, '_'); // Substitui '/' por '_' para evitar problemas com File API.
      const relativePath = filePath; // Adiciona o caminho original como metadado.
      const file = new File([blob], fileName, { type: 'text/plain' });
      // Adiciona o caminho original como propriedade personalizada (se necessário no backend)
      (file as any).relativePath = relativePath;
      return file;
    });
  }
