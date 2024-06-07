import type { Entity } from '@backstage/catalog-model';
import schema from '../schema/Infracost.v1alpha1.schema.json';
import { ajvCompiledJsonSchemaValidator } from '../utils';

/**
 * Backstage Infracost kind Entity. Represents a single, individual piece of software.
 *
 *
 * @public
 */
export interface InfracostEntityV1alpha1 extends Entity {
  apiVersion: 'veecode.backstage.io/v1alpha1' | 'backstage.io/v1alpha1' | 'backstage.io/v1beta1';
  kind: 'Infracost';
  spec: {
    type: string;
    lifecycle: string;
    owner: string;
    subcomponentOf?: string;
    dependsOn?: string[];
    system?: string;
    estimate:string;
  };
}

/**
 * {@link KindValidator} for {@link InfracostEntityV1alpha1}.
 *
 * @public
 */
export const InfracostEntityV1alpha1Validator =
  ajvCompiledJsonSchemaValidator(schema);