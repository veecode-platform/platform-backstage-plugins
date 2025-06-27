import { Entity } from '@backstage/catalog-model';

export const isZoraCluster = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'cluster';
