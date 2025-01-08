import React from "react";
import { MarkdownRendererProps } from "./type";
import { useMarkdowRendererStyles } from "./styles";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {

   const { wrapper } = useMarkdowRendererStyles();

  return (
    <div className={wrapper}>
     <Markdown remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
    </div>
  );
};