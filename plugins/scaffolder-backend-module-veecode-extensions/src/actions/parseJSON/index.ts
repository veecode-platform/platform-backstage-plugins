/* eslint-disable @backstage/no-undeclared-imports */
/*
 * Copyright 2022 Larder Software Limited
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

import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { InputError } from '@backstage/errors';
import { JsonSpec } from './types';

export function parseJsonAction() {
  return createTemplateAction<{
    resource: string;
  }>({
    id: 'veecode-platform:extensions:parseJSON',
    description:
      'Parse the Json object. The result can be read from the `result` step output.',
    supportsDryRun: true,
    schema: {
      input: {
        type: 'object',
        required: ['resource'],
        properties: {
          resource: {
            title: 'Indicate the object you want to parse',
            description: 'Lembre-se que este precisa estar transformado em string',
            type: 'string',
          }
        },
      },
      output: {
        type: 'object',
        properties: {
          result: {
            title: 'Output result from parseJSON',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      let parsed : JsonSpec;

      try{
        parsed = JSON.parse(ctx.input.resource)
      }
      catch(error){
        throw new InputError(`Invalid object passed to publisher, ${error}`);      
      }

      ctx.output('result', parsed);
    },
  });
}