import { WorkflowAnnotation } from "../types";

export function transformWorkflows(value:string) : WorkflowAnnotation[] {
    let result;
  
    try {
      result = JSON.parse(value); 
    } catch (e) {
      result = null; 
    }
  
    if (!result) {

      const workflowsWithoutSpace = value.replace(/\s+/g, '');
      const workflowsArray = workflowsWithoutSpace.split(',');
      const workflowsObj = workflowsArray.map((w) => ({
        workflow: w,
      }));
  
      return workflowsObj;
    }
  
    return result; 
  }