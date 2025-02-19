import React from "react";
import { MarkdownRendererProps } from "./type";
import { useMarkdowRendererStyles } from "./styles";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlockComponent } from "../codeBlock/CodeBlock";

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const { wrapper } = useMarkdowRendererStyles();

  return (
    <div className={wrapper}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (!className) {
              return (
                <code {...props} style={{ backgroundColor: "#313131", padding: "2px 4px", borderRadius: "4px", color: "#FAFAFA" }}>
                  {children}
                </code>
              );
            }
            return (
              <CodeBlockComponent language={language} code={String(children).trim()}/>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};
