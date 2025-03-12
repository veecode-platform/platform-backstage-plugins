import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { ListComponentProps } from './types';
import { useListComponentStyles } from './styles';
import { PluginIcon } from '../../../../assets/plugin-icon';
import  Typography  from '@mui/material/Typography';

export const ListComponent : React.FC<ListComponentProps> = (props) => {

  const [checked, setChecked] = React.useState(['']);
  const { data } = props;
  const { root,listItemStyles,iconImg } = useListComponentStyles();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      className={root}
    >
      {data.map( item => (
        <ListItem key={item.id} className={listItemStyles}>
          <ListItemIcon className={iconImg}>
            {item.icon ? item.icon : PluginIcon}
          </ListItemIcon>
          <ListItemText 
            id={`switch-list-label-${item.name}`} 
            primary={<Typography variant="h6">
              {item.name}
            </Typography>} 
            />
            <Switch
             edge="end"
             onChange={handleToggle(item.name)}
             checked={checked.includes(item.name)}
             slotProps={{
                input: {
                    'aria-labelledby': `switch-list-label-${item.name}`,
                }
             }}
            />
      </ListItem>
      ))}
    </List>
  );
}