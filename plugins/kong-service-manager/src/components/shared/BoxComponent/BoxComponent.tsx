import { Box, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { SelectInstance } from '../../SelectInstance';
import { SearchBar } from '../SearchBar';
import { BoxComponentProps } from './types';
import { useBoxComponentStyles } from './styles';

export const BoxComponent = ({title, searchBar, children, button }:BoxComponentProps) => {

  const { container,toolbar, titlebar, search, buttonToolbar, content } = useBoxComponentStyles();

  return (
    <Box className={container}>
    <Toolbar className={toolbar}>
      <Typography variant="h6" className={titlebar}>{title}</Typography>
      {searchBar && (<div className={search}><SearchBar/></div>)}
      {button && (<div className={buttonToolbar}>{button}</div>)}
      <SelectInstance/>
    </Toolbar>
    <Box className={content}>
    {children}
    </Box>  
  </Box>
  )
}
