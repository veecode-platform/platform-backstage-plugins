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

export function ParseJsonAction() {
  return createTemplateAction<{
    objectString: string;
    option: string;
  }>({
    id: 'veecode-platform:extensions:parseJSON',
    description:
      'Parse the Json object. The result can be read from the `result` step output.',
    supportsDryRun: true,
    schema: {
      input: {
        type: 'object',
        required: ['objectString','option'],
        properties: {
         objectString: {
            title: 'Nos informe o objeto que deseja parsear',
            description: 'Lembre-se que este precisa estar transformado em string',
            type: 'string',
          },
          option: {
            title: 'Qual item voce quer parsear?',
            description: 'informe o item que deseja retornar',
            type: 'string',
          }
        },
      },
      output: {
        type: 'string',
        properties: {
          result: {
            title: 'Output result from parseJSON',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      let parsed;

      try{
        parsed = JSON.parse(ctx.input.objectString)
      }
      catch(error){
        throw new InputError(`Invalid object passed to publisher, ${error}`);      
      }
      
      const results: JsonSpec  = {};
      let result: string = '';

      if (parsed) {
      for (const key in parsed) {
        if (parsed.hasOwnProperty(key)) {
          results[key] = parsed[key];
            }
        }
      }

      if(ctx.input.option){
        result = results[ctx.input.option]
      }

      ctx.output('result', result);
    },
  });
}