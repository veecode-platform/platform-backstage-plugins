import React from 'react'
import { useAnalysisComponentStyles } from './styles'
import { Box, Typography } from '@material-ui/core';
import { BsStars } from 'react-icons/bs';
import { AnalysisComponentProps } from './types';


export const AnalysisComponent : React.FC<AnalysisComponentProps> = (props) => {

  const { solution } = props;
  const { content, label, message } = useAnalysisComponentStyles();
  const messageRef = React.useRef<HTMLDivElement>(null);

  const typeWrite = (element:HTMLElement) => {
    const textoArray = element.innerHTML.split('');
    element.innerHTML = ' ';
    textoArray.forEach((letra, i) => {
      setTimeout(() => {
        element.innerHTML += letra;
      }, 50 * i);
    });
  };

  React.useEffect(() => {
    if (messageRef.current) {
      typeWrite(messageRef.current);
    }
  }, []);

  return (
    <div className={content}>
      <div className={label}>
        <BsStars size={22}/>
        <Typography variant="h6"> Suggested actions </Typography>
      </div>
      <Box>
        <Typography variant="body1" className={message} ref={messageRef}>
          {solution}
        </Typography>
      </Box>
    </div>
  )
}
