/* eslint-disable @backstage/no-undeclared-imports */
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../../utils';


/**
 *  @public
 */

export const OptionsPickerFieldSchema = makeFieldSchemaFromZod(
    z.string(),  // return
    z.object({
        // options: z.string().array().optional().describe('Set the options'),
        key: z.string().nonempty('Set the Key').describe('Set the key'),
        subKey: z.string().nonempty('Set the subKey').describe('Set the subkey'),
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
