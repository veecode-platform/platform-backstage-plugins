import { Entity } from '@backstage/catalog-model';

export const useEntityAnnotations = (entity: Entity) => {
  return entity; // Remove this line if you don't need the entity
  // TODO what to do here?
  // TODO here information can be extracted from the entity's annotations and reused in some component
};
