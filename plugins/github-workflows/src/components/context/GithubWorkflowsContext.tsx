import { createContext} from "react";

export type GithubWorkflowsContextType = {
  branch: string | null,
  setBranchState: (branch: string) => void
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);