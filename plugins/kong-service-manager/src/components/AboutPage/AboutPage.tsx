import { Box, List, ListItem, ListItemText, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme=>({
  container:{
    background: theme.palette.background.paper,
    backdropFilter: 'blur(13.5px)',
    '-webkit-backdrop-filter': 'blur(13.5px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px'
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary
  },
}));

export const AboutPage = () => {

  const {container, title} = useStyles();

  return (
    <Box className={container}>
      <Toolbar>
        <Typography variant="h6" className={title}>Configuration</Typography>
      </Toolbar>
      <Box>
        <List>
          <ListItem>
            <ListItemText>teste</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}
