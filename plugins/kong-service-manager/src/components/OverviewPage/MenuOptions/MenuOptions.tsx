import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react';

const MenuOptionsItems = [
    {
        label: 'About',
        link: '/about'
    },
    {
        label: 'Routes',
        link: '/routes'
    },
    {
        label: 'Plugins',
        link: '/plugins'
    },
]

const useStyles = makeStyles(theme => ({
   listComponent: {
    height: '100%',
    'min-height': '70vh'
   },
   listItem: {
    cursor: 'pointer',
    height: '64px',
    'font-weight': 'bold',
    'border-radius': '8px',
    '&:hover':{
        background: theme.palette.background.paper,
    }
   }
}));


export const MenuOptions = () => {

  const classes = useStyles();

  return (
    <List className={classes.listComponent}>
      {MenuOptionsItems.map(i => (
        <ListItem key={i.label} className={classes.listItem}>
          <ListItemText>{i.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}