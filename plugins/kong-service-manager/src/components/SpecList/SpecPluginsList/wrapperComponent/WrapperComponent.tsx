import React from 'react';
import { WrapperComponentProps } from './types';
import { Box, IconButton, Typography } from '@material-ui/core';
import { useWrapperComponentStyles } from './styles';
import { ArrowBackIcon } from '../../../shared';

export const WrapperComponent: React.FC<WrapperComponentProps> = props => {
  const { root, content, titleBar } = useWrapperComponentStyles();
  const { title, buttonBack, handleBack, children } = props;
  return (
    <div className={root}>
      <Box className={content}>
        <div className={titleBar}>
          <Typography variant="h6">{title}</Typography>
          {buttonBack && (
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </div>
        {children}
      </Box>
    </div>
  );
};
