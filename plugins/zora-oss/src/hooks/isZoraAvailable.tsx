import { Entity } from '@backstage/catalog-model';
import { CLUSTER_NAME } from '../utils/constants/annotations';

export const isZoraAvailable = (entity: Entity) =>
  entity.metadata.annotations?.[CLUSTER_NAME];
