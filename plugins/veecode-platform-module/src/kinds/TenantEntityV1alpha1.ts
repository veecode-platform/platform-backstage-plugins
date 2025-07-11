/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Entity } from '@backstage/catalog-model';
import schema from '../schema/kinds/Tenant.v1alpha1.schema.json';
import { ajvCompiledJsonSchemaValidator } from './util';

/**
 * Backstage catalog Tenant kind Entity. Represents a single, individual piece of software.
 *
 * @remarks
 *
 * See {@link https://backstage.io/docs/features/software-catalog/system-model}
 *
 * @public
 */
export interface TenantEntityV1alpha1 extends Entity {
  apiVersion:
    | 'veecode.backstage.io/v1alpha1'
    | 'backstage.io/v1alpha1'
    | 'backstage.io/v1beta1';
  kind: 'Tenant';
  spec: {
    type: string;
    lifecycle: string;
    owner: string;
    environment: string;
    providedBy?: string;
    subcomponentOf?: string;
    providesApis?: string[];
    consumesApis?: string[];
    dependsOn?: string[];
    system?: string;
  };
}

/**
 * {@link KindValidator} for {@link TenantEntityV1alpha1}.
 *
 * @public
 */
export const TenantEntityV1alpha1Validator =
  ajvCompiledJsonSchemaValidator(schema);
