import { Entity } from '@backstage/catalog-model';

export const WORKFLOW_ANNOTATION = 'github.com/workflows';

export const useEntityAnnotations = (entity: Entity) => {
  const workflowsList =
    entity?.metadata.annotations?.[WORKFLOW_ANNOTATION] ?? '';
  const projectName =
    entity?.metadata.annotations?.['github.com/project-slug'] ?? '';

  const workflows = workflowsList.includes(',') ? workflowsList.split(',') : [workflowsList];

  return {
    projectName,
    workflows,
  };
};
