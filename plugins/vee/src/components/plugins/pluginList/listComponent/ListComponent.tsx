import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { PluginIcon } from '../../../../assets/plugin-icon';
import { ListComponentProps } from './types';
import { useListComponentStyles } from './styles';
import  Typography  from '@mui/material/Typography';

export const ListComponent : React.FC<ListComponentProps> = (props) => {

  const [checked, setChecked] = React.useState([""]);
   const { data } = props;
    const { root,listItemWrapper, listItemStyles, iconImg } = useListComponentStyles();

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
    <List className={root}>
      {data.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item.name}`;
        return (
          <ListItem
            className={listItemWrapper}
            key={item.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item.name)}
                checked={checked.includes(item.name)}
                slotProps={{
                    input: {
                       'aria-labelledby': labelId,
                    }
                 }}
              />
            }
            disablePadding
          >
            <ListItemButton className={listItemStyles}>
              <ListItemAvatar className={iconImg}>
                  {item.icon ? item.icon : PluginIcon}
              </ListItemAvatar>
              <ListItemText id={labelId} primary={
                <Typography variant="h6">
                {item.name}
              </Typography>
              } />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}