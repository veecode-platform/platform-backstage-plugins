import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";

export interface ArchivesFileProps {
    data: FileContent[];
    handleCode: (lang: string, code: string) => void
}

export interface TreeNode {
    name: string;
    relativePath: string;
    children: TreeNode[];
    isFile: boolean;
    file?: FileContent;
  }