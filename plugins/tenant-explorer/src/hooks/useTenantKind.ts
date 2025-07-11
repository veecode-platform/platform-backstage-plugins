import { Entity } from '@backstage/catalog-model';

export const isTenantKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'tenant';
