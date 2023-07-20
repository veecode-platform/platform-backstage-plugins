import React from 'react';
import { InfoCard } from '@backstage/core-components';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
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
      <Typography className={classes.title}>Workflows</Typography>
    </>
    )

  return (
    <Paper>
      <InfoCard title={TitleBar}>
        <Box className={classes.workflowsGroup}>
          <WorkFlowItem status="in_progress" workflowName="Update-SO"/>
          <WorkFlowItem status="warning" conclusion="" workflowName="Build-image"/>
          <WorkFlowItem status="pending" conclusion="" workflowName="Deploy-project"/>
        </Box>
      </InfoCard>
    </Paper>
  )
}

export const ButtonWorkFlow = () => {

}