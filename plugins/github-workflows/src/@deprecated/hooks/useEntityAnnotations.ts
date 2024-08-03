import { ANNOTATION_LOCATION, ANNOTATION_SOURCE_LOCATION, Entity } from '@backstage/catalog-model';
import { GITHUB_ANNOTATION, WORKFLOW_ANNOTATION } from '../../utils/constants/annotations';
import gitUrlParse from 'git-url-parse';

export const useEntityAnnotations = (entity: Entity) => {

  const projectName =
    entity?.metadata.annotations?.[GITHUB_ANNOTATION] ?? '';

  const workflowsList =
    entity?.metadata.annotations?.[WORKFLOW_ANNOTATION] ?? '';
    
  const location = 
    entity?.metadata.annotations?.[ANNOTATION_SOURCE_LOCATION] ??
    entity?.metadata.annotations?.[ANNOTATION_LOCATION];
  const hostname = location?.startsWith('url:')
  ? gitUrlParse(location.slice(4)).resource
  : 'github.com';

    if (!workflowsList) {
      return {
        projectName,
        workflows: null,
        hostname
      };
    }

  const workflows = workflowsList.includes(',') ? workflowsList.split(/\s*,\s*/g) : [workflowsList];
  
  return {
    projectName,
    workflows,
    hostname
  };
};
