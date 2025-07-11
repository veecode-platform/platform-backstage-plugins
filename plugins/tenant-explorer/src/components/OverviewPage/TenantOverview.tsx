import { Grid } from '@material-ui/core';
import { Content } from '@backstage/core-components';

import { useState } from 'react';
import { DrawerComponent } from '../DrawerComponent';

export const TenantOverview = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleDrawer = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Content>
      <Grid container spacing={4} direction="row">
        <DrawerComponent isOpen={showOptions} toggleDrawer={toggleDrawer} />
        <h1>Content here</h1>
      </Grid>
    </Content>
  );
};
