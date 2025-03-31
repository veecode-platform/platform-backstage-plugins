import React from 'react';
import { BundledLanguage, createHighlighter, SpecialLanguage } from 'shiki';
import { allLanguages } from './languages';
import { themeVariables } from '../../utils/constants/themeVariables';
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress } from '@mui/material';

export interface CodeSnippetProps {
    code: string,
    language: string,
    className?: string
};

export interface CodeSnippetRootProps {
    children: React.ReactNode
}

export const useCodeSnippetStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100%',
        overflowY: 'auto', 
        maxHeight: '65vh',
        backgroundColor: themeVariables.codeBlock.dark,
        "&::-webkit-scrollbar": {
            width: "6px",
            height: "4px",
            backgroundColor: themeVariables.background.dark,
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px ${themeVariables.blur.dark}15`,
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeVariables.border.main,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: themeVariables.background.secondary,
            cursor: 'pointer'
          },
    }
});

const highlighter = await createHighlighter({
  themes: ['github-dark-default'],
  langs: allLanguages,
});

const CodeSnippetRoot : React.FC<CodeSnippetRootProps> = ({children}) => {
    const { root } = useCodeSnippetStyles();
    return <Box component="div" className={root}>{children}</Box>
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
 
  const [codeState, setCodeState] = React.useState<string>('');

  React.useEffect(() => {
    const fetchCode = () => {
      try {
        const codeString = highlighter.codeToHtml(code, {
          lang: language as BundledLanguage | SpecialLanguage,
          theme: 'github-dark-default',
        });
       setCodeState(codeString)
      } catch (error) {
       setCodeState("Error");  // TODO
      }
    };

    fetchCode();
  }, [code, language]);

  if (codeState === '')
    return (
      <CodeSnippetRoot>
        <CircularProgress />
      </CodeSnippetRoot>
    ); 

  return (
    <CodeSnippetRoot>
      <div dangerouslySetInnerHTML={{ __html: codeState }} />
    </CodeSnippetRoot>
  );
};