import { Entity } from "@backstage/catalog-model";
import { KONG_SERVICE_NAME_ANNOTATION, KONG_SERVICE_SPEC_ANNOTATION } from "../utils/constants/kongAnnotations";

export const isKongServiceManagerAvailable = (entity:Entity) : boolean => !!entity.metadata.annotations?.[KONG_SERVICE_NAME_ANNOTATION];
export const isKongManagerSpecAvailable = (entity:Entity) : boolean => !!entity.metadata.annotations?.[KONG_SERVICE_SPEC_ANNOTATION];