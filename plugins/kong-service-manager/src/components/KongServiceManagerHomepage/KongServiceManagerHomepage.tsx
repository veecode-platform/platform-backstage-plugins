/* eslint-disable @backstage/no-undeclared-imports */
import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { MenuOptions } from './MenuOptions';
import { Route, Routes} from 'react-router';
import { AboutPage } from '../AboutPage';
import { RoutesList } from '../RoutesList';
import { PluginsList } from '../PluginsList';
import { KongServiceManagerProvider } from '../context';
import { ModalComponent } from '../ModalComponent';

const useStyles = makeStyles(theme=>({
  divider: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export const KongServiceManagerHomepage = () => {

  const classes = useStyles();

  return (
    <KongServiceManagerProvider>
      <Container maxWidth="xl">
        <ModalComponent/>
        <Grid container spacing={4}>
          <Grid item lg={2} className={classes.divider}>
            <MenuOptions />
          </Grid>
          <Grid item lg={10}>
            <Routes>
              <Route path="" element={<AboutPage />} />
              <Route path="all-routes" element={<RoutesList />} />
              <Route path="all-plugins" element={<PluginsList />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </KongServiceManagerProvider>
  );
}