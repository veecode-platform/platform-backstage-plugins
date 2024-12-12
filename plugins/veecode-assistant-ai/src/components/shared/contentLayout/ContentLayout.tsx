import React from 'react';
import type { ContentLayoutProps } from './types';
import { useContentLayoutStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import VeeCodeAILogo from "../../../assets/veecodeAI.png";

export const ContentLayout: React.FC<ContentLayoutProps> = props => {
  const { children } = props;
  const { root, titleBar,title, logo, body } = useContentLayoutStyles();

  return (<Box className={root}>
    <div className={titleBar}>
      <div className={title}>
        <Typography variant="h6"> Summary </Typography>
      </div>
      <img src={VeeCodeAILogo} alt="" className={logo} />
     </div>
     <Divider/>
    <div className={body}>
     {children}
    </div>
    </Box>);
};
