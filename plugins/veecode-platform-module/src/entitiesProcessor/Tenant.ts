/* eslint-disable @backstage/no-undeclared-imports */
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

import {
  Entity,
  getCompoundEntityRef,
  parseEntityRef,
  RELATION_OWNED_BY,
  RELATION_OWNER_OF,
} from '@backstage/catalog-model';
import { RELATION_PROVIDED_BY } from '../relations';
import {
  CatalogProcessor,
  CatalogProcessorEmit,
  processingResult,
} from '@backstage/plugin-catalog-node';
import { LocationSpec } from '@backstage/plugin-catalog-common';
import { TenantEntityV1alpha1, TenantEntityV1alpha1Validator } from '../kinds';

/**
 * Adds support for @veecode specific entity kind: tenant to the catalog.
 *
 * @public
 */
export class TenantEntitiesProcessor implements CatalogProcessor {
  getProcessorName(): string {
    return 'TenantEntitiesProcessor';
  }

  private readonly validators = [TenantEntityV1alpha1Validator];

  async validateEntityKind(entity: Entity): Promise<boolean> {
    for (const validator of this.validators) {
      if (await validator.check(entity)) {
        return true;
      }
    }

    return false;
  }

  async postProcessEntity(
    entity: Entity,
    _location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity> {
    const selfRef = getCompoundEntityRef(entity);

    if (
      (entity.apiVersion === 'backstage.io/v1alpha1' ||
        entity.apiVersion === 'veecode.backstage.io/v1alpha1') &&
      entity.kind === 'Tenant'
    ) {
      const tenant = entity as TenantEntityV1alpha1;

      const target = tenant.spec.owner;
      const controlPlane = tenant.spec.providedBy;

      if (target) {
        const targetRef = parseEntityRef(target, {
          defaultKind: 'Group',
          defaultNamespace: selfRef.namespace,
        });
        emit(
          processingResult.relation({
            source: selfRef,
            type: RELATION_OWNED_BY,
            target: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
          }),
        );
        emit(
          processingResult.relation({
            source: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
            type: RELATION_OWNER_OF,
            target: selfRef,
          }),
        );
      }

      if (controlPlane) {
        const targetRef = parseEntityRef(controlPlane, {
          defaultKind: 'Tenant',
          defaultNamespace: selfRef.namespace,
        });

        emit(
          processingResult.relation({
            source: selfRef,
            type: RELATION_PROVIDED_BY,
            target: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
          }),
        );
      }
    }
    return entity;
  }
}
