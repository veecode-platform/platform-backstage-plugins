/* eslint-disable @backstage/no-undeclared-imports */
import React from 'react'
import { Grid } from '@material-ui/core'
import { GithubWorkflowsProvider } from '../context/GithubWorkflowsProvider'
import { Route, Routes } from 'react-router-dom'
import GithubWorkflowsDetails from '../GithubWorkflowsDetails/GithubWorkflowsDetails'
import WorkflowTable from './WorkFlowTable/WorkflowTable'

const WorkflowTableContent = (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <WorkflowTable />
    </Grid>
  </Grid>
);          

export const GithubWorkflowsList = () => {

    return (
        <GithubWorkflowsProvider>
            <Routes>
                <Route path="/" element={WorkflowTableContent}/>
                <Route path="/:id" element={<GithubWorkflowsDetails/>}/>
            </Routes>
        </GithubWorkflowsProvider>
    )
}