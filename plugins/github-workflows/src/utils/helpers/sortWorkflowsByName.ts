import { WorkflowResultsProps } from "../types";

 export const sortWorflowsByName = (workflows : WorkflowResultsProps[]) => {
    if ( workflows === null || workflows === undefined) return [];
    return workflows.sort((a, b) => a.name!.localeCompare(b.name!));
  }
  