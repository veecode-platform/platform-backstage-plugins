import { Entity } from '@backstage/catalog-model';
import { ANNOTATION_INFRACOST_PROJECT } from '../utils/constants/annotations';

export const useEntityAnnotations = (entity: Entity) => {

  const projectName = entity?.metadata.annotations?.[ANNOTATION_INFRACOST_PROJECT] ?? null;
  
  return {
    projectName
  };
};
