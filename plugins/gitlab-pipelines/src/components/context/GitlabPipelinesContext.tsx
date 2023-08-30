import { createContext} from "react";


export type GitlabPipelinesContextType = {
  branch: string | null,
  setBranchState: (branch: string) => void
};

export const GitlabPipelinesContext = createContext<GitlabPipelinesContextType>(null!);