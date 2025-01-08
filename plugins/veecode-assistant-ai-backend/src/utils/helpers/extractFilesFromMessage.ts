import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export function extractFilesFromMessage(content: any): FileContent[] {
    return content
        .filter((block: any) => block.type === "file")
        .map((block: any) => ({
            name: block.name,
            content: block.content,
            type: block.mimeType,
        }));
}