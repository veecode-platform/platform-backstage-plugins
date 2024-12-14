import type { Entity } from "@backstage/catalog-model";
import { ANNOTATION_ENGINE, ANNOTATION_LOCATION } from "../utils/constants/annotations";

export const useEntityAnnotation = (entity:Entity) => {

    if(!entity) return { 
        location: null,
        projectName: null,
        engine: null
    }
    
    const location = entity.metadata.annotations![ANNOTATION_LOCATION];
    const projectName = entity.metadata.name;
    const engine = entity.metadata.annotations![ANNOTATION_ENGINE] ?? "openAI";

    return {
        location,
        projectName,
        engine
    }
}