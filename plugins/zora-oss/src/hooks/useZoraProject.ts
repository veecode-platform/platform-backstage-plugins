import { Entity } from '@backstage/catalog-model';

export const isZoraProject = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() !== 'cluster';
