import React from 'react';
import { CodeBlockProps } from './types';
import { CodeBlock, dracula } from "react-code-blocks";

export const CodeBlockComponent : React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
      <CodeBlock
        text={code}
        language={language}
        theme={dracula} 
        showLineNumbers={false}
      />
  );
}