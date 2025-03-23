import type { TemplateOutputProps } from "../types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";

export async function downloadTemplateFolder (templateOutputState:TemplateOutputProps) {
    if (!templateOutputState) return;

    const zip = new JSZip();
    const folder = zip.folder(templateOutputState.templateName);

    if (folder) {
        templateOutputState.files.forEach((file: FileContent) => {
            folder.file(file.relativePath!, file.content);
        });
    }


    try {
        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `${templateOutputState.templateName}.zip`);
    } catch (error:any) {
        throw new Error("Error generating ZIP file:", error.message);
    }
};