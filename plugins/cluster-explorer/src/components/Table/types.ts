import { Entity, CompoundEntityRef } from '@backstage/catalog-model';

/** @public */
export interface CatalogTableRow {
  entity: Entity;
  resolved: {
    name: string;
    partOfSystemRelationTitle?: string;
    partOfSystemRelations: CompoundEntityRef[];
    ownedByRelationsTitle?: string;
    ownedByRelations: CompoundEntityRef[];
  };
}