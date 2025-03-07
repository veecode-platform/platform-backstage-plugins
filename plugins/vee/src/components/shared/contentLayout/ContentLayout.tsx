import React from 'react';
import type { ContentLayoutProps } from './types';
import { useContentLayoutStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { VeeLogo } from '../../../assets/VeeLogo';


export const ContentLayout: React.FC<ContentLayoutProps> = props => {

  const { label, title, subtitle, styleCustom, children } = props;
  const { root, header, headerWithTitle, labelContent, titleBar, subtitleBox, body } = useContentLayoutStyles();

  return (
    <Box className={root}>
      <div className={`${header} ${title && headerWithTitle}`}>
        { label && (<div className={labelContent}>
           <Typography variant="h6"> {label}</Typography>
        </div>)}
        <div className={titleBar}>
          {title && <Typography variant="h5"> {title}</Typography>}
          {subtitle && (
            <div className={subtitleBox}>
              <Typography variant="subtitle2"> {subtitle}</Typography>
            </div>
          )}
        </div>
        <VeeLogo />
      </div>
      <Divider/>
      <div className={`${body} ${styleCustom ?? ''}`}>
      {children}
      </div>
  </Box>
    );
};
