import { Entity } from '@backstage/catalog-model';
import { GITHUB_ANNOTATION, GITHUB_INSTANCE, WORKFLOW_ANNOTATION } from '../utils/constants/annotations';

export const useEntityAnnotations = (entity: Entity) => {

  const projectName =
    entity?.metadata.annotations?.[GITHUB_ANNOTATION] ?? '';
  const workflowsList =
    entity?.metadata.annotations?.[WORKFLOW_ANNOTATION] ?? '';
  const hostname =
    entity?.metadata.annotations?.[GITHUB_INSTANCE] ?? 'github.com'

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
