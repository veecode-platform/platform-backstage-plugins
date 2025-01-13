import React from 'react';
import { CodeBlockProps } from './types';
import { CopyBlock, dracula } from "react-code-blocks";

export const CodeBlockComponent : React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
      <CopyBlock
        text={code}
        language={language}
        theme={dracula} 
        showLineNumbers={false}
        codeBlock 
      />
  );
}