import { Entity } from '@backstage/catalog-model';
import { isZoraAvailable } from './isZoraAvailable';

export const isZoraProject = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() !== 'cluster';

export const isZoraCluster = (entity: Entity) =>
  isZoraProject(entity) && isZoraAvailable(entity) ? true : false;
