import { Entity } from '@backstage/catalog-model';
import { CLUSTER_INSTRUCTIONS } from '../utils/constants';

export const isClusterInstructionsAvailable = (entity: Entity) =>
  !!entity?.metadata.annotations?.[CLUSTER_INSTRUCTIONS];
