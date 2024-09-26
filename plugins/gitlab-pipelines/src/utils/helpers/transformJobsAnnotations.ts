import { GitlabPipelinesStatus } from "../enums/GitlabPipelinesStatus";
import { JobAnnotationProps } from "../types";

export function transformJobsAnnotations(value:string) : JobAnnotationProps[] {
    let result;
  
    try {
      result = JSON.parse(value); 
    } catch (e) {
      result = null; 
    }
  
    if (!result) {

      const jobsWithoutSpace = value.replace(/\s+/g, '');
      const jobsArray = jobsWithoutSpace.split(',');
      const jobsObj = jobsArray.map((j) => {
        const [label, varValue] = j.split(':');
        return {
          id: label,
          label: label,
          tooltip: label,
          var: varValue,
          status: GitlabPipelinesStatus.success,
        };
      });
      return jobsObj;
    }
  
    return result.map((r:JobAnnotationProps) => ({
      ...r,
      id: r.label,
      status: GitlabPipelinesStatus.success,
    }));
  }