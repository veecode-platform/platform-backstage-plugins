import { Entity } from '@backstage/catalog-model';

export const CLUSTER_INSTRUCTIONS = 'cluster/instructions';

export const useEntityAnnotations = (entity: Entity) => {
  const instructions =
    entity?.metadata.annotations?.[CLUSTER_INSTRUCTIONS] ?? '';
 

    if (!instructions) {
      return {
        instructions: null,
      };
    }

  
  return {
    instructions
  };

};
