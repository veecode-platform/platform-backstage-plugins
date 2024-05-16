import React from 'react'
import { Grid } from '@material-ui/core'
import { GithubWorkflowsProvider } from '../../context/GithubWorkflowsProvider'
import WorkFlowCard from './WorkFlowCard/WorkFlowCard'

export const GithubWorkflowsCards = () => {

 return (
   <GithubWorkflowsProvider>
     <Grid item >
       <WorkFlowCard />
     </Grid>
   </GithubWorkflowsProvider>
  )
}