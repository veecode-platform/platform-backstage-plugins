import { Entity } from '@backstage/catalog-model';
import { CLUSTER_NAME } from '../utils/constants/annotations';


export const useEntityAnnotations = (entity: Entity) => {
 
  const clusterName =
    entity?.metadata.annotations?.[CLUSTER_NAME] || entity.metadata?.name;

  return { clusterName }

};
