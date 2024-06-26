import { Entity } from '@backstage/catalog-model';
import { KUBERNETES_ANNOTATION, KUBERNETES_LABEL_SELECTOR_QUERY_ANNOTATION } from '../utils/constants/annotations';

export const isKubernetesAvailable = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.[KUBERNETES_ANNOTATION]) ||
    Boolean(entity.metadata.annotations?.[KUBERNETES_LABEL_SELECTOR_QUERY_ANNOTATION]);