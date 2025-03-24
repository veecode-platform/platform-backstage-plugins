import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import  Typography  from '@mui/material/Typography';
import ListSubheader  from '@mui/material/ListSubheader';
import { PluginIcon } from '../../../assets/plugin-icon';
import { usePluginListStyles } from './styles';
import type { PluginListComponentProps } from './types';
import { useVeeContext } from '../../../context';
import { setPlugins } from '../../../context/state';

export const PluginList : React.FC<PluginListComponentProps> = (props) => {

  const [checked, setChecked] = React.useState([""]);
  const { data } = props;
  const { instructionsDispatch } = useVeeContext();
  const { root,titleBar,listItemWrapper, listItemStyles, iconImg } = usePluginListStyles();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    
    const pluginData = data.find(plugin => plugin.name  === value && plugin);
    if(pluginData){
      const newPluginData = [...data, pluginData];
      instructionsDispatch(setPlugins(newPluginData));
    }
  };


  return (
    <List 
      className={root}
      subheader={<ListSubheader className={titleBar}>
        <Typography variant="subtitle1">Select plugins to add to the template</Typography>
      </ListSubheader>}
      >
      {data.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item.name}`;
        return (
          <ListItem
            className={listItemWrapper}
            key={item.id}
            onClick={handleToggle(item.name)}
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
                <Typography>
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