import { Entity } from '@backstage/catalog-model';
import { KONG_SERVICE_INSTANCE_ANNOTATION, KONG_SERVICE_NAME_ANNOTATION, KONG_SERVICE_SPEC_ANNOTATION } from '../utils/constants/kongAnnotations';


export const useEntityAnnotation = (entity: Entity) => {
    const serviceName = entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION] ?? null;
    const kongInstance = entity.metadata.annotations?.[KONG_SERVICE_INSTANCE_ANNOTATION] ?? null;
    const kongSpec = entity.metadata.annotations?.[KONG_SERVICE_SPEC_ANNOTATION];


    const kongInstances = () => {
      if(kongInstance){
        if(kongInstance.includes(',')){
          return kongInstance.split(/\s*,\s*/g);
        }
        return [kongInstance]
      }
      return null;
    }

    const kongSpecs = () => {
      if(kongSpec){
        if(kongSpec.includes(',')){
          return kongSpec.split(/\s*,\s*/g)
        }
        return [kongSpec];
      }
      return null
    }

    return {
        serviceName,
        kongInstances: kongInstances(),
        kongSpecs: kongSpecs()
    }
}