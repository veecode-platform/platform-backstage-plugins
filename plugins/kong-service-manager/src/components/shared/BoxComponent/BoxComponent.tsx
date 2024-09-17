import { Box, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { SelectInstance } from '../../SelectInstance';
import { SearchBar } from '../SearchBar';
import { BoxComponentProps } from './types';
import { useBoxComponentStyles } from './styles';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const BoxComponent = ({title, searchBar, children, button, noSelectInstance, goBack }:BoxComponentProps) => {

  const navigate = useNavigate();
  const { container,toolbar, titlebar, search, buttonToolbar, content,closeButton } = useBoxComponentStyles();

  const handleGoBack = () => navigate(-1);

  return (
    <Box className={container}>
    <Toolbar className={toolbar}>
      <Typography variant="h6" className={titlebar}>{title}</Typography>
      {searchBar && (<div className={search}><SearchBar/></div>)}
      {button && (<div className={buttonToolbar}>{button}</div>)}
      {!noSelectInstance && <SelectInstance/>}
      {goBack && <div className={closeButton}><MdOutlineClose size={32} onClick={handleGoBack}/></div>}
    </Toolbar>
    <Box className={content}>
    {children}
    </Box>  
  </Box>
  )
}
