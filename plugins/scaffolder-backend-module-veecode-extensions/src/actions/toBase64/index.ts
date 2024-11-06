import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { InputError } from '@backstage/errors';
import { encodeToBase64 } from '../../utils/encodeToBase64';

export function toBase64Action() {
  return createTemplateAction<{
    path: string;
    content: string;
    format: string;
  }>({
    id: 'veecode-platform:extensions:toBase64',
    description: 'Transform content to base64.',
    supportsDryRun: true,
    schema: {
      input: {
        required: ['content'],
        type: 'object',
        properties: {
          content: {
            title: 'Content',
            description: 'This will be the content...',
            type: 'string',
          },
        },
      },
      output: {
        type: 'object',
        properties: {
          base64result: {
            title: 'Result',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      let formattedContent = ctx.input.content;
      if (ctx.input.content) {                
        try {
          const content = encodeToBase64(ctx.input.content)
          formattedContent = content;
        } catch (error) {
            throw new InputError(`Invalid file passed to publisher, ${error}`); 
        }
      }

      ctx.output('result', formattedContent);
    },
  });
}