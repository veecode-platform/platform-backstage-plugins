/* eslint-disable @backstage/no-undeclared-imports */
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../../utils';


/**
 *  @public
 */

export const OptionsPickerFieldSchema = makeFieldSchemaFromZod(
    z.string(), 
    z.object({
        key: z.string().nonempty('Set the Key').describe('Set the key'),
        property: z.string().nonempty('Set the property').describe('Set the property'),
    })
)

/**
 * The input props that can be specified under `ui:options` for the
 * `OptionsPicker` field extension.
 *
 * @public
 */

export type OptionsPickerUiOptions = typeof OptionsPickerFieldSchema;

export type OptionsPickerProps = typeof OptionsPickerFieldSchema.type;

export const OptionsPickerSchema = OptionsPickerFieldSchema.schema;
