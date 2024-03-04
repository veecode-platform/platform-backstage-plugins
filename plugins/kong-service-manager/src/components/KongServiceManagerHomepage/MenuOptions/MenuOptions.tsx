/* eslint-disable @backstage/no-undeclared-imports */
import React, { useState } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const MenuOptionsItems = [
    {
        label: 'About',
        link: ''
    },
    {
        label: 'Routes',
        link: 'all-routes'
    },
    {
        label: 'Plugins',
        link: 'all-plugins'
    },
]

const useStyles = makeStyles(theme => ({
   listComponent: {
    height: '100%',
    minHeight: '70vh',
   },
   link:{
    color: theme.palette.text.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   },
   activeLink:{
    borderRadius: '8px',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    '&:before': {
      content: '""',
      width: '3px',
      height: '30px',
      backgroundColor: theme.palette.link,
      borderRadius: '3px',
      position: 'absolute',
      left: 0,
    },
   },
   listItem: {
    cursor: 'pointer',
    height: '64px',
    fontWeight: 700,
    borderRadius: '8px',
    paddingLeft: theme.spacing(4),
    '&:hover':{
        background: '#CDCDCD90',
    },
   }
}));


export const MenuOptions = () => {

  const classes = useStyles();
  const [activeLink, setActiveLink] = useState('');

  return (
    <List className={classes.listComponent}>
      {MenuOptionsItems.map(i => (
        <NavLink key={i.label} to={i.link} className={`${classes.link} ${activeLink === i.link ? classes.activeLink : ''}`}>
          <ListItem className={classes.listItem} onClick={()=>setActiveLink(i.link)}>
            <ListItemText>{i.label}</ListItemText>
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
}