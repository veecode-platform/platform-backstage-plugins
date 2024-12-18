import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export function extractFilesFromMessage(content: string): FileContent[] {
    const fileRegex = /---START FILE---\nName: (.+?)\nContent:\n([\s\S]+?)\n---END FILE---/g;
    const files: { name: string; content: string }[] = [];
    let match = fileRegex.exec(content);

    while (match !== null) {
      files.push({ name: match[1], content: match[2] });
      match = fileRegex.exec(content);
    }
    
    return files;
  }