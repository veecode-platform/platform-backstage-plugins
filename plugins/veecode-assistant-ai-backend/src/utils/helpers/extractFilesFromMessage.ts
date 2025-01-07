import mime from 'mime-types';
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export function extractFilesFromMessage(content: string): FileContent[] {
    const fileRegex = /---START FILE---\nName: (.+?)\nContent:\n([\s\S]+?)\n---END FILE---/g;
    const files: FileContent[] = [];
    let match = fileRegex.exec(content);

    while (match !== null) {
        const fileName = match[1];
        const fileContent = match[2];
        
        // Determina o tipo MIME com base na extensão do arquivo
        const mimeType = mime.lookup(fileName) || "application/octet-stream"; // Define um tipo padrão caso o MIME não seja encontrado

        files.push({
            name: fileName,
            content: fileContent,
            type: mimeType,
        });

        match = fileRegex.exec(content);
    }

    return files;
}
