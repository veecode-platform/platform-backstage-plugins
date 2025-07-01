import { Entity } from '@backstage/catalog-model';

export const isVaultKind = (entity: Entity) =>
  entity?.kind?.toLocaleLowerCase() === 'vault';
