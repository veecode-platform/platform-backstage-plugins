import { Entity } from "@backstage/catalog-model";
import { WORKFLOW_ANNOTATION } from "./useEntityAnnotations";

export const isGithubWorkflowsAvailable = (entity: Entity) =>
  entity?.metadata.annotations?.[WORKFLOW_ANNOTATION];