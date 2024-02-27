/* eslint-disable @backstage/no-undeclared-imports */
import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { MenuOptions } from './MenuOptions';
import { Route, Routes} from 'react-router';

const useStyles = makeStyles(theme=>({
  divider: {
    borderLeft: `1px solid ${theme.palette.divider}`
  }
}))

export const KongServiceManagerHomepage = () => {

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item lg={2}>
          <MenuOptions/>
        </Grid>
        <Grid item lg={10} className={classes.divider}>
          <Routes>
            <Route path="" element={<h1>About</h1>} />   
            <Route path="all-routes" element={<h1>All Routes</h1>} /> 
            <Route path="all-plugins" element={<h1>All Plugins</h1>} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  )
}