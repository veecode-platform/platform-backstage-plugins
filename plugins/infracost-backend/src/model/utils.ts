/* eslint-disable @backstage/no-undeclared-imports */

import { entityKindSchemaValidator, KindValidator } from '@backstage/catalog-model';

// TODO(freben): Left here as a compatibility helper. It would be nicer to
// just export the inner validator directly. However, all of the already
// exported kind validators have the `KindValidator` signature which is
// different. So let's postpone that change until a later time.
export function ajvCompiledJsonSchemaValidator(schema: unknown): KindValidator {
  let validator: undefined | ((data: unknown) => any);
  return {
    async check(data) {
      if (!validator) {
        validator = entityKindSchemaValidator(schema);
      }
      return validator(data) === data;
    },
  };
}