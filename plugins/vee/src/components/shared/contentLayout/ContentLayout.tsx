import React from 'react';
import type { ContentLayoutProps } from './types';
import { useContentLayoutStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { VeeLogo } from '../../../assets/VeeLogo';


export const ContentLayout: React.FC<ContentLayoutProps> = props => {

  const { title, children } = props;
  const { root, titleBar,titleContent, body } = useContentLayoutStyles();

  return (<Box className={root}>
    <div className={titleBar}>
      <div className={titleContent}>
        <Typography variant="h6"> {title} </Typography>
      </div>
      <VeeLogo />
     </div>
     <Divider/>
    <div className={body}>
     {children}
    </div>
    </Box>);
};
