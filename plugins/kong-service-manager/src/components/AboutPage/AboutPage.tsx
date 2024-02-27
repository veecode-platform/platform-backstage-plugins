import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react';
import { BoxComponent } from '../shared';

const useStyles = makeStyles(theme=>({
  listComponent:{
    background: theme.palette.background.default
  }
}));

export const AboutPage = () => {

  const { listComponent } = useStyles();

 return (
    <BoxComponent title="Configuration">
      <List className={listComponent}>
        <ListItem>
          <ListItemText>teste</ListItemText>
        </ListItem>
      </List>
    </BoxComponent>
  )
}
