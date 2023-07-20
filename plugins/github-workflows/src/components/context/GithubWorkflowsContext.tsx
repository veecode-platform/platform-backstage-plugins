import { createContext} from "react";
import { Branches } from "../../utils/types";

export type GithubWorkflowsContextType = {
  branches: Branches[],
  setBranches: React.Dispatch<React.SetStateAction<Branches[]>>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);