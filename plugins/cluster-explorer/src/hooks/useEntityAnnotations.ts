import { Entity } from '@backstage/catalog-model';

export const CLUSTER_INSTRUCTIONS = 'cluster/instructions';
export const CLUSTER_NAME = 'veecode/cluster-name';
export const CLUSTER_MODE = 'veecode/cluster-mode';

export const useEntityAnnotations = (entity: Entity) => {
  const instructions =
    entity?.metadata.annotations?.[CLUSTER_INSTRUCTIONS] ?? null;
 
  const clusterName =
    entity?.metadata.annotations?.[CLUSTER_NAME] || entity.metadata?.name;

  const clusterMode = entity?.metadata.annotations?.[CLUSTER_MODE] ?? null;

  return {
    instructions,
    clusterName,
    clusterMode
  };

};
