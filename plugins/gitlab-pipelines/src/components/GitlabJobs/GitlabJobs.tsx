import React from 'react'
import { Grid } from '@material-ui/core'
import { AllJobsComponent } from './AllJobsComponent'
import { GitlabPipelinesProvider } from '../../context'

export const GitlabJobs = () => {

    return (
        <GitlabPipelinesProvider>
            <Grid item >
                <AllJobsComponent/>
            </Grid>
        </GitlabPipelinesProvider>
    )
}