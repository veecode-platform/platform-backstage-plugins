import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { useMenuOptionsStyles } from './styles';
import { MenuOptionsProps } from './types';

const MenuOptionsItems = [
    {
        label: 'Service',
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


export const MenuOptions  : React.FC<MenuOptionsProps> = (props) => {
  
  const [activeLink, setActiveLink] = React.useState('');
  const classes = useMenuOptionsStyles();
  const { isSpecAvailable } = props;

  return (
    <List className={classes.listComponent}>
      {MenuOptionsItems.map(i => (
        <div key={i.label}>
        { 
           !isSpecAvailable && i.label === "Specs" ? null 
           : (
              <NavLink to={i.link} className={`${classes.link} ${activeLink === i.link ? classes.activeLink : ''}`}>
                <ListItem className={classes.listItem} onClick={()=>setActiveLink(i.link)}>
                  <ListItemText>{i.label}</ListItemText>
                </ListItem>
               </NavLink>)
        } 
        </div>
      ))}
    </List>
  );
}