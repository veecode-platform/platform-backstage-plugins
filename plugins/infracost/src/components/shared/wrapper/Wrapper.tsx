import React from 'react';
import { Box } from '@material-ui/core'
import { useWrapperStyles } from './styles'
import { WrapperProps } from './types';

export const Wrapper : React.FC<WrapperProps> = (props) => {
 
  const {children, styles} = props;
  const { root } = useWrapperStyles();

  return <Box className={root} style={ styles ?? {}}>{children}</Box>
  
}
