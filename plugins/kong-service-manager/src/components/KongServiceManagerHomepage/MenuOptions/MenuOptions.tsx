import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { useMenuOptionsStyles } from './styles';

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
    {
       label: 'Specs',
       link: 'all-specs'
    }
]


export const MenuOptions = () => {
  
  const [activeLink, setActiveLink] = React.useState('');
  const classes = useMenuOptionsStyles();

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