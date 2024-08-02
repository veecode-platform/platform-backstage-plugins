import { Entity } from '@backstage/catalog-model';
import { CLUSTER_INSTRUCTIONS, CLUSTER_MODE, CLUSTER_NAME } from '../utils/constants';

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
