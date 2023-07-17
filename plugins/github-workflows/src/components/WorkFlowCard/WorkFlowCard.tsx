import React from 'react';
import { InfoCard } from '@backstage/core-components';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { Button } from './Button';


const useStyles = makeStyles({
    title:{
      paddingLeft: '1.5rem',
      fontSize: '1.5rem'
    },
    cards:{
        width: '90%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        gap: '1.5rem'
    }
  });

export const WorkFlowCard = () => {
  
  const classes = useStyles();

  const TitleBar = (
    <>
      <span className={classes.title}>Workflows</span>
    </>
    )

  return (
    <Paper>
      <InfoCard title={TitleBar}>
        <Typography className={classes.cards}>
         <Button />
         <Button />
         <Button />
        </Typography>
      </InfoCard>
    </Paper>
  )
}

export const ButtonWorkFlow = () => {

}