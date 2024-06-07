/* eslint-disable @backstage/no-undeclared-imports */
import {Entity} from '@backstage/catalog-model';
import { ANNOTATION_INFRACOST_PROJECT } from './constants';

export function isInfracostType(entity:Entity){
    if (entity.kind === "Infracost") {
        const annotations = entity.metadata.annotations;
        if (annotations !== undefined) {
          return annotations[ANNOTATION_INFRACOST_PROJECT] !== undefined
        } 
          return false
      } 
    return false
}