import { Entity } from '@backstage/catalog-model';

export const isClusterKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'cluster';
