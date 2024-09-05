import { Entity } from '@backstage/catalog-model';
import { KONG_SERVICE_INSTANCE_ANNOTATION, KONG_SERVICE_NAME_ANNOTATION } from '../utils/constants/kongAnnotations';


export const useEntityAnnotation = (entity: Entity) => {
    const serviceName = entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION] ?? null;
    const kongInstance = entity.metadata.annotations?.[KONG_SERVICE_INSTANCE_ANNOTATION] ?? null;


    if (!kongInstance) {
        return {
          serviceName,
          kongInstance: null,
        };
      }
  
    const kongInstances = kongInstance.includes(',') ? kongInstance.split(/\s*,\s*/g) : [kongInstance];

    return {
        serviceName,
        kongInstances
    }
}