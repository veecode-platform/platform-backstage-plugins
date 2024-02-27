import { Box, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface BoxComponentProps {
    title: string,
    children: ReactNode
}

const useStyles = makeStyles(theme=>({
  container:{
    background: theme.palette.background.paper,
    backdropFilter: 'blur(13.5px)',
    '-webkit-backdrop-filter': 'blur(13.5px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px'
  },
  titlebar: {
    flexGrow: 1,
    color: theme.palette.text.primary
  },
}));



export const BoxComponent = ({title,children}:BoxComponentProps) => {

  const { container, titlebar } = useStyles();

  return (
    <Box className={container}>
    <Toolbar>
      <Typography variant="h6" className={titlebar}>{title}</Typography>
    </Toolbar>
    <Box>
      {children}
    </Box>
  </Box>
  )
}
