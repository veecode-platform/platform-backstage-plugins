import React from 'react';
import { InfoCard } from '@backstage/core-components';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';


const useStyles = makeStyles(theme => ({
  title:{
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
  workflowsGroup:{
      width: '95%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '2rem 1rem',
      gap: '1.5rem',
      overflow: 'auto',
      '&::-webkit-scrollbar' : {
        width: '10px',
        height: '4px'
      },
      '&::-webkit-scrollbar-thumb' : {
        borderRadius: '50px',
        background: theme.palette.grey[600],

      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        height: '2px'
      }
  },

}));

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
        <Typography className={classes.workflowsGroup}>
          <WorkFlowItem status="ok"> Update-SO  </WorkFlowItem>
          <WorkFlowItem status="ok"> Build-image  </WorkFlowItem>
          <WorkFlowItem status="ok"> Deploy-project </WorkFlowItem>
        </Typography>
      </InfoCard>
    </Paper>
  )
}

export const ButtonWorkFlow = () => {

}