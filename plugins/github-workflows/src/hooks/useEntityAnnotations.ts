import { Entity } from '@backstage/catalog-model';

export const WORKFLOW_ANNOTATION = 'github.com/workflows';
export const GITHUB_ANNOTATION = 'github.com/project-slug'

export const useEntityAnnotations = (entity: Entity) => {

  const projectName =
    entity?.metadata.annotations?.[GITHUB_ANNOTATION] ?? '';
  const workflowsList =
    entity?.metadata.annotations?.[WORKFLOW_ANNOTATION] ?? '';

    if (!workflowsList) {
      return {
        projectName,
        workflows: null,
      };
    }

  const workflows = workflowsList.includes(',') ? workflowsList.split(/\s*,\s*/g) : [workflowsList];
  
  return {
    projectName,
    workflows,
  };
};
