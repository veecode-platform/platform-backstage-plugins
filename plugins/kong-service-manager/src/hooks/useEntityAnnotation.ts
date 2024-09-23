import { Entity } from '@backstage/catalog-model';
import { KONG_SERVICE_INSTANCE_ANNOTATION, KONG_SERVICE_NAME_ANNOTATION, KONG_SERVICE_SPEC_ANNOTATION } from '../utils/constants/kongAnnotations';


export const useEntityAnnotation = (entity: Entity) => {
    const serviceName = entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION] ?? null;
    const kongInstance = entity.metadata.annotations?.[KONG_SERVICE_INSTANCE_ANNOTATION] ?? null;
    const kongSpec = entity.metadata.annotations?.[KONG_SERVICE_SPEC_ANNOTATION];

    if (!kongInstance) {
        return {
          serviceName,
          kongInstance: null,
        };
      }

    if (!kongSpec) {
     return {
         serviceName,
         kongInstance,
         kongSpecs: null
    };
    }

    const kongInstances = kongInstance?.includes(',') ? kongInstance.split(/\s*,\s*/g) : [kongInstance];
    const kongSpecs = kongSpec?.includes(',') ? kongSpec.split(/\s*,\s*/g) : [kongSpec];

    return {
        serviceName,
        kongInstances,
        kongSpecs
    }
}