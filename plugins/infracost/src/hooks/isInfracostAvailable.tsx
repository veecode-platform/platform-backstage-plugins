import { Entity } from '@backstage/catalog-model';
import { ANNOTATION_INFRACOST_PROJECT } from '../utils/constants/annotations';


export const isInfracostAvailable = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.[ANNOTATION_INFRACOST_PROJECT]);