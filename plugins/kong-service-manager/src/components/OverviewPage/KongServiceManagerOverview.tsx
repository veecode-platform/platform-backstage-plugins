/* eslint-disable @backstage/no-undeclared-imports */
import { Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useOutlet } from 'react-router-dom';
import { MenuOptions } from './MenuOptions';

const useStyles = makeStyles(theme=>({
  divider: {
    'border-left': `1px solid ${theme.palette.border}`
  }
}))

export const KongServiceManagerOverview = () => {

  const outlet = useOutlet();
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <MenuOptions/>
        </Grid>
        <Grid item lg={9} className={classes.divider}>
          {outlet}
        </Grid>
      </Grid>
    </Container>
  )
}