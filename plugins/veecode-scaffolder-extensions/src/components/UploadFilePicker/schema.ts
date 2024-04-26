/* eslint-disable @backstage/no-undeclared-imports */
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../../utils';


/**
 *  @public
 */

export const UploadFileFieldPickerSchema = makeFieldSchemaFromZod(
    // z.string(),
    z.object({
        file: z.instanceof(FileList).transform(list=>list.item(0)),
        format: z.string().nonempty('Format is required').describe('Format used YAML or JSON ')
    })
)

/**
 * The input props that can be specified under `ui:options` for the
 * `UploadFilePicker` field extension.
 *
 * @public
 */

export type UploadFilePickerUiOptions = typeof UploadFileFieldPickerSchema;

export type UploadFilePickerProps = typeof UploadFileFieldPickerSchema.type;

export const UploadFilePickerSchema = UploadFileFieldPickerSchema.schema;
