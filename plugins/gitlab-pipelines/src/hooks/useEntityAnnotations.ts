import { Entity } from '@backstage/catalog-model';
import { JobAnnotationProps } from '../utils/types';
import { GitlabPipelinesStatus } from '../utils/enums/GitlabPipelinesStatus';

export const GITLAB_ANNOTATION = 'gitlab.com/project-slug';
export const GITLAB_JOBS_ANNOTATION = 'gitlab.com/jobs';

export const useEntityAnnotations = (entity: Entity) => {
  const projectName =
    entity?.metadata.annotations?.[GITLAB_ANNOTATION] ?? '';
  const JobsList =
    entity?.metadata.annotations?.[GITLAB_JOBS_ANNOTATION] ?? '';  

    if (!JobsList) {
      return {
        projectName,
        jobsAnnotations: null,
      };
    }

  const jobsAnnotationList = JobsList.includes(',') ? JobsList.split(',') : [JobsList];

  const jobsAnnotations: JobAnnotationProps[] = jobsAnnotationList.map(item => {
    const [label, varValue] = item.split(':');
    return { id: label, label, var: varValue, status: GitlabPipelinesStatus.success };
  });
  
  return {
    projectName,
    jobsAnnotations
  };

};
