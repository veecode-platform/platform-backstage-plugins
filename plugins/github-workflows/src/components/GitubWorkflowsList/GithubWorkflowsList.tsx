import { Grid } from '@material-ui/core'
import React from 'react'
import { WorkflowTable } from '../WorkFlowTable'
import { GithubWorkflowsProvider } from '../context/GithubWorkflowsProvider'

export const GithubWorkflowsList = () => {

    return (
        <GithubWorkflowsProvider>
            <Grid container spacing={3} direction="column">
                <Grid item>
                    <WorkflowTable />
                </Grid>
            </Grid>
        </GithubWorkflowsProvider>
    )
}