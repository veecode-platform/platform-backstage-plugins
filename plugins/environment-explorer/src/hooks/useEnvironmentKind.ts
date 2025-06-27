import { Entity } from '@backstage/catalog-model';

export const isEnvironmentKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'environment';
