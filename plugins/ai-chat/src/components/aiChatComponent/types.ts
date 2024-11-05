export interface DirectoryEditorFile {
    path: string;
    content: string;
  }
  
export interface DirectoryEditor {
    files: DirectoryEditorFile[];
  }
  

export interface Message {
    text: string;
    sender: 'user' | 'ai';
    isCode?: boolean;
  }