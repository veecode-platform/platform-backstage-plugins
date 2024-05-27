/* eslint-disable @backstage/no-undeclared-imports */
import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { MenuOptions } from './MenuOptions';
import { Route, Routes} from 'react-router';
import { AboutPage } from '../AboutPage';
import { RoutesList } from '../RoutesList';
import { PluginsList } from '../PluginsList';
import { KongServiceManagerProvider } from '../../context';


const useStyles = makeStyles(theme=>({
  content:{
    [theme.breakpoints.down('md')]: {
      minWidth: '60vw',
      overflowX: 'scroll'
     }
  },
  divider: {
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      borderRight: `1px solid transparent`
     }
  }
}))

export const KongServiceManagerHomepage = () => {

  const {content, divider} = useStyles();

  return (
    <KongServiceManagerProvider>
      <Container maxWidth="xl">
        <Grid container spacing={4} className={content}>
          <Grid item lg={2} className={divider}>
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