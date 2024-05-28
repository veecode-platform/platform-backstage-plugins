import { Entity } from '@backstage/catalog-model';
import { KONG_SERVICE_INSTANCE_ANNOTATION, KONG_SERVICE_NAME_ANNOTATION, KONG_SERVICE_WORKSPACE } from '../utils/constants/kongAnnotations';


export const useEntityAnnotation = (entity: Entity) => {
    const serviceName = entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION] ?? null;
    const kongInstance = entity.metadata.annotations?.[KONG_SERVICE_INSTANCE_ANNOTATION] ?? null;
    const workspace = entity.metadata.annotations?.[KONG_SERVICE_WORKSPACE] ?? 'default';

    if (!kongInstance) {
        return {
          serviceName,
          kongInstance: null,
          workspace
        };
      }
  
    const kongInstances = kongInstance.includes(',') ? kongInstance.split(/\s*,\s*/g) : [kongInstance];

    return {
        serviceName,
        kongInstances,
        workspace
    }
}