/* eslint-disable @backstage/no-undeclared-imports */
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../../utils';


/**
 *  @public
 */

export const ResourcePickerFieldSchema = makeFieldSchemaFromZod(
    z.object({}),
    z.object({
        catalogFilter: z.object({
            kind: z.array(z.string()).optional().describe('List of key-value filter expression for entities'),
            allowedResources: z.array(z.string().optional().describe('List of allowed resources')),
            type: z.string().optional().describe('List of type filter expression for entities')
        }),
    })
)

/**
 * The input props that can be specified under `ui:options` for the
 * `ResourcePicker` field extension.
 *
 * @public
 */

export type ResourcePickerUiOptions = typeof ResourcePickerFieldSchema;

export type ResourcePickerProps = typeof ResourcePickerFieldSchema.type;

export const ResourcePickerSchema = ResourcePickerFieldSchema.schema;