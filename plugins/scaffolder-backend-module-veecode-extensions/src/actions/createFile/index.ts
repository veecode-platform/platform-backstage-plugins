/* eslint-disable @backstage/no-undeclared-imports */
/*
 * Copyright 2021 Larder Software Limited
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
import { resolveSafeChildPath } from '@backstage/backend-common';
import fs from 'fs-extra';
import { InputError } from '@backstage/errors';
import { decodeBase64 } from '../utils/decodeBase64';


export function createFileAction() {
  return createTemplateAction<{
    path: string;
    content: string;
    format: string;
  }>({
    id: 'veecode-platform:extensions:createFile',
    description: 'Create a file in your project with a defined name and format so that the content can be properly processed.',
    supportsDryRun: true,
    schema: {
      input: {
        required: ['path', 'content'],  // The Format is not yet mandatory because both yaml and json are handled in the same way
        type: 'object',
        properties: {
          path: {
            title: 'Path',
            description: 'Relative path',
            type: 'string',
          },
          content: {
            title: 'Content',
            description: 'This will be the content of the file',
            type: 'string',
          },
          format: {
            title: 'Set the file format',
            description: 'Accepted formats: JSON or YAML*',
            type: 'string'
          },
        },
      },
      output: {
        type: 'object',
        properties: {
          path: {
            title: 'Path',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      const destFilepath = resolveSafeChildPath(
        ctx.workspacePath,
        ctx.input.path,
      );

      let formattedContent = ctx.input.content;
      if (ctx.input.content && ctx.input.format) {                 // When it opens up to more formats, we should have talks here
        try {
          const content = decodeBase64(ctx.input.content)
          formattedContent = content;
        } catch (error) {
            throw new InputError(`Invalid file passed to publisher, ${error}`); 
        }
      }
      fs.outputFileSync(destFilepath, formattedContent);

      ctx.output('path', destFilepath);
    },
  });
}