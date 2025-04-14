import React from "react";
import type { Meta } from "@storybook/react";
import { CodeSnippet,CodeSnippetProps } from "./CodeSnippet";
import { Box } from "@mui/material";


export default {
    title: 'Components/CodeSnippet',
    component: CodeSnippet,
    args:{
        code: 'console.log("hello world!)',
        language: 'javascript'
    },
    argTypes:{
        code: { control: 'text' },
        language: { control: 'text'},
        className: { control: "text" }
    },
    decorators: [
      (Story) => {
        return (<Box sx={{ maxWidth: '60vw'}}>{Story()}</Box>)
      }
    ]
} as Meta<CodeSnippetProps>;


export const Default = (args: CodeSnippetProps) => (
    <CodeSnippet
     code={args.code}
     language={args.language}
     />
)