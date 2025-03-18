import React from 'react';
import { CodeBlockProps } from './types';
import { useCodeBlockStyles } from './style';
import { BundledLanguage, createHighlighter, SpecialLanguage } from 'shiki';
import { allLanguages } from '../../../utils/constants/codeblock-languages';

const highlighter = await createHighlighter({
  themes: ['github-dark-default'],
  langs: allLanguages,
})

export const CodeBlockComponent: React.FC<CodeBlockProps> = (props) => {
  const { root } = useCodeBlockStyles();
  const { code, language } = props;
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
       // console.error('Error fetching tokens:', error);
       setCodeState("Error");
      }
    };

    fetchCode(); // Chame a função assíncrona dentro do useEffect
  }, [code, language]);

  if (codeState === '') {
    return <div>Loading...</div>; // TODO
  }

  return (
    <div className={root}>
      <div dangerouslySetInnerHTML={{ __html: codeState }} />
    </div>
  );
};