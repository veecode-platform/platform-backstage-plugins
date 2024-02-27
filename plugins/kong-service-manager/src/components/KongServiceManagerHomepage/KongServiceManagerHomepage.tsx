/* eslint-disable @backstage/no-undeclared-imports */
import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { MenuOptions } from './MenuOptions';
import { Route, Routes} from 'react-router';
import { AboutPage } from '../AboutPage';
import { RoutesList } from '../RoutesList';
import { PluginsList } from '../PluginsList';

const useStyles = makeStyles(theme=>({
  divider: {
    borderLeft: `1px solid ${theme.palette.divider}`
  }
}))

export const KongServiceManagerHomepage = () => {

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item lg={2}>
          <MenuOptions/>
        </Grid>
        <Grid item lg={10} className={classes.divider}>
          <Routes>
            <Route path="" element={<AboutPage/>} />   
            <Route path="all-routes" element={<RoutesList/>} /> 
            <Route path="all-plugins" element={<PluginsList/>} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  )
}