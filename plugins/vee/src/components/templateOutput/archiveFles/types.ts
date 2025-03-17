import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";

export interface ArchivesFileProps {
    data: FileContent[]
}

export interface TreeNode {
    name: string;
    relativePath: string;
    children: TreeNode[];
    isFile: boolean;
    file?: FileContent;
  }