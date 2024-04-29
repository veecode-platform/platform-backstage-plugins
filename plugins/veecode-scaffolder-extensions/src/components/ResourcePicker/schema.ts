/* eslint-disable @backstage/no-undeclared-imports */
/*
 * Copyright 2021 The Backstage Authors
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

import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../../utils';

/**
 * @public
 */
export const resourceQueryFilterExpressionSchema = z.record(
  z
    .string()
    .or(z.object({ exists: z.boolean().optional() }))
    .or(z.array(z.string())),
);

/**
 * @public
 */
export const ResourcePickerFieldSchema = makeFieldSchemaFromZod(
  z.object({}),
  z.object({
    defaultKind: z
      .string()
      .optional()
      .describe(
        'The default entity kind. Options of this kind will not be prefixed.',
      ),
    catalogFilter: z
      .array(resourceQueryFilterExpressionSchema)
      .or(resourceQueryFilterExpressionSchema)
      .optional()
      .describe('List of key-value filter expression for entities'),
  }),
);

/**
 * The input props that can be specified under `ui:options` for the
 * `ResourcePicker` field extension.
 *
 * @public
 */
export type ResourcePickerUiOptions =
  typeof ResourcePickerFieldSchema.uiOptionsType;

  export type ResourcePickerProps = typeof ResourcePickerFieldSchema.type;

export const ResourcePickerSchema = ResourcePickerFieldSchema.schema;

export type ResourcePickerFilterQuery = z.TypeOf<
  typeof resourceQueryFilterExpressionSchema
>;

export type ResourcePickerFilterQueryValue =
  ResourcePickerFilterQuery[keyof ResourcePickerFilterQuery];
