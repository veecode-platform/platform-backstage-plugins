import React from 'react';
import { CodeBlock } from 'react-code-block';
import { CodeBlockProps } from './types';
import { themeVariables } from '../../../utils/constants/theme';

export const CodeBlockComponent : React.FC<CodeBlockProps> = ({ children, language, className }) => {
  return (
    <CodeBlock code={children} language={language}>
      <CodeBlock.Code className={className} 
       style={
         { 
            backgroundColor: themeVariables.codeBlock.dark,
            maxWidth: '50vw',
            padding: '1rem',
            overflowX: 'auto'
          }
        }>
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
    </CodeBlock>
  );
}