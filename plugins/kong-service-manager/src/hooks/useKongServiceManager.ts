import { Entity } from "@backstage/catalog-model";
import { KONG_SERVICE_NAME_ANNOTATION } from "./useEntityAnnotation";

export const isKongServiceManagerAvailable = (entity:Entity) : boolean => !!entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION];