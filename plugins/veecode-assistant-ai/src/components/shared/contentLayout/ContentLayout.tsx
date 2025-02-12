import React from 'react';
import type { ContentLayoutProps } from './types';
import { useContentLayoutStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import VeeCodeAILogo from "../../../assets/veecodeAI.png";

export const ContentLayout: React.FC<ContentLayoutProps> = props => {
  const { title, children } = props;
  const { root, titleBar,titleContent, logo, body } = useContentLayoutStyles();

  return (<Box className={root}>
    <div className={titleBar}>
      <div className={titleContent}>
        <Typography variant="h6"> {title} </Typography>
      </div>
      <img src={VeeCodeAILogo} alt="" className={logo} />
     </div>
     <Divider/>
    <div className={body}>
     {children}
    </div>
    </Box>);
};
