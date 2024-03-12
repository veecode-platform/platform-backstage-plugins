import { Entity } from '@backstage/catalog-model';

export const KONG_SERVICE_NAME_ANNOTATION = 'kong-manager/service-name';
export const KONG_SERVICE_INSTANCE_ANNOTATION = 'kong-manager/instance';

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