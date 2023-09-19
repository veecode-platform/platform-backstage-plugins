import { Entity } from "@backstage/catalog-model";
import { GITLAB_ANNOTATION, GITLAB_JOBS_ANNOTATION } from "./useEntityAnnotations";

export const isGitlabAvailable = (entity: Entity) =>
  !!entity?.metadata.annotations?.[GITLAB_ANNOTATION];

export const isGitlabJobsAvailable = (entity: Entity) =>
!!entity?.metadata.annotations?.[GITLAB_JOBS_ANNOTATION];