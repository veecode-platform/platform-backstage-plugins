import { Entity } from '@backstage/catalog-model';
import { isZoraAvailable } from './isZoraAvailable';

const isClusterKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'cluster';

export const isZoraCluster = (entity: Entity) =>
  isClusterKind(entity) && isZoraAvailable(entity) ? true : false;
