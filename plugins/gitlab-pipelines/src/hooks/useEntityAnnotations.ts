import { Entity } from '@backstage/catalog-model';

export const useEntityAnnotations = (entity: Entity) => {
  const projectName =
    entity?.metadata.annotations?.['gitlab.com/project-slug'] ?? '';
 
  return {
    projectName
  };

};
