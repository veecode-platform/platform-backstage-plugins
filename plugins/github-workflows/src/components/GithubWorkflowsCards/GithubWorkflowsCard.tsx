import { Grid } from '@material-ui/core'
import React from 'react'
import { GithubWorkflowsProvider } from '../context/GithubWorkflowsProvider'
import { WorkFlowCard } from './WorkFlowCard';

export const GithubWorkflowsCards = () => {

 return (
   <GithubWorkflowsProvider>
     <Grid item >
       <WorkFlowCard />
     </Grid>
   </GithubWorkflowsProvider>
  )
}