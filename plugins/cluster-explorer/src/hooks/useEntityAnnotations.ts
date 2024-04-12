import { Entity } from '@backstage/catalog-model';

export const CLUSTER_INSTRUCTIONS = 'cluster/instructions';
const CLUSTER_NAME = 'veecode/cluster-name';

export const useEntityAnnotations = (entity: Entity) => {
  const instructions =
    entity?.metadata.annotations?.[CLUSTER_INSTRUCTIONS] ?? null;
 
  const clusterName =
    entity?.metadata.annotations?.[CLUSTER_NAME] || entity.metadata?.name;

  return {
    instructions,
    clusterName
  };

};
