import { Entity } from '@backstage/catalog-model';

export const isDatabaseKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'database';
