import { Box, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { SelectInstance } from '../../SelectInstance';
import { SearchBar } from '../../PluginsList/SearchBar';

interface BoxComponentProps {
    title: string,
    searchBar?: boolean,
    children: ReactNode | React.JSX.Element
}

const useStyles = makeStyles(theme=>({
  container:{
    background: theme.palette.background.paper,
    backdropFilter: 'blur(13.5px)',
    '-webkit-backdrop-filter': 'blur(13.5px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
  },
  toolbar:{
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  titlebar: {
    flexGrow: 1,
    color: theme.palette.text.primary
  },
  search:{
    position: 'absolute',
    top: '2.5rem'
  }
}));



export const BoxComponent = ({title, searchBar, children}:BoxComponentProps) => {

  const { container,toolbar, titlebar, search } = useStyles();

  return (
    <Box className={container}>
    <Toolbar className={toolbar}>
      <Typography variant="h6" className={titlebar}>{title}</Typography>
      {searchBar && (<div className={search}><SearchBar/></div>)}
      <SelectInstance/>
    </Toolbar>
      {children}
  </Box>
  )
}
