import { Entity } from "@backstage/catalog-model";
import { GITLAB_ANNOTATION } from "./useEntityAnnotations";

export const isGitlabAvailable = (entity: Entity) =>
  !!entity?.metadata.annotations?.[GITLAB_ANNOTATION];