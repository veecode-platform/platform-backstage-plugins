import { ANNOTATION_LOCATION, ANNOTATION_SOURCE_LOCATION, Entity } from '@backstage/catalog-model';
import { JobAnnotationProps } from '../utils/types';
import { GitlabPipelinesStatus } from '../utils/enums/GitlabPipelinesStatus';
import { GITLAB_ANNOTATION, GITLAB_JOBS_ANNOTATION } from '../utils/constants';
import gitUrlParse from 'git-url-parse';

export const useEntityAnnotations = (entity: Entity) => {
  const projectName =
    entity?.metadata.annotations?.[GITLAB_ANNOTATION] ?? '';
  const JobsList =
    entity?.metadata.annotations?.[GITLAB_JOBS_ANNOTATION] ?? '';  
  const location = 
    entity?.metadata.annotations?.[ANNOTATION_SOURCE_LOCATION] ??
    entity?.metadata.annotations?.[ANNOTATION_LOCATION];
  const hostname = location?.startsWith('url:')
  ? gitUrlParse(location.slice(4)).resource
  : 'gitlab.com';

    if (!JobsList) {
      return {
        projectName,
        jobsAnnotations: null,
        hostname
      };
    }

  const jobsAnnotationList = JobsList.includes(',') ? JobsList.split(',') : [JobsList];

  const jobsAnnotations: JobAnnotationProps[] = jobsAnnotationList.map(item => {
    const [label, varValue] = item.split(':');
    return { id: label, label, var: varValue, status: GitlabPipelinesStatus.success };
  });
  
  return {
    projectName,
    jobsAnnotations,
    hostname
  };

};
