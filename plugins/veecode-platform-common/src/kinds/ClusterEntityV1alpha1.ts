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
import schema from '../schema/kinds/Cluster.v1alpha1.schema.json';
import { ajvCompiledJsonSchemaValidator } from './util';

/**
 * Adds support for @veecode specific entity kind: cluster to the catalog.
 *
 * @deprecated
 * 
 *  use @veecode-platform-module plugin , see in https://github.com/veecode-platform/platform-backstage-plugins/tree/develop/plugins/veecode-platform-module
 */
export interface ClusterEntityV1alpha1 extends Entity {
  apiVersion: 'veecode.backstage.io/v1alpha1' | 'backstage.io/v1alpha1' | 'backstage.io/v1beta1';
  kind: 'Cluster';
  spec: {
    type: string;
    lifecycle: string;
    owner: string;
    environment: string;
    subcomponentOf?: string;
    providesApis?: string[];
    consumesApis?: string[];
    dependsOn?: string[];
    system?: string;
  };
}

/**
 * {@link KindValidator} for {@link ClusterEntityV1alpha1}.
 *
 * @public
 */
export const ClusterEntityV1alpha1Validator =
  ajvCompiledJsonSchemaValidator(schema);