import { Box, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { SelectInstance } from '../../SelectInstance';

interface BoxComponentProps {
    title: string,
    children: ReactNode | React.JSX.Element
}

const useStyles = makeStyles(theme=>({
  container:{
    background: theme.palette.background.paper,
    backdropFilter: 'blur(13.5px)',
    '-webkit-backdrop-filter': 'blur(13.5px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px'
  },
  toolbar:{
    paddingBottom: theme.spacing(2)
  },
  titlebar: {
    flexGrow: 1,
    color: theme.palette.text.primary
  },
}));



export const BoxComponent = ({title,children}:BoxComponentProps) => {

  const { container,toolbar, titlebar } = useStyles();

  return (
    <Box className={container}>
    <Toolbar className={toolbar}>
      <Typography variant="h6" className={titlebar}>{title}</Typography>
      <SelectInstance/>
    </Toolbar>

      {children}
 
  </Box>
  )
}
