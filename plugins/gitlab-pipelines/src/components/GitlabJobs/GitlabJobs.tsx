import { Grid } from '@material-ui/core'
import React from 'react'
import { GitlabPipelinesProvider } from '../context/GitlabPipelinesProvider'
import { AllJobsComponent } from './AllJobsComponent'

export const GitlabJobs = () => {

    return (
        <GitlabPipelinesProvider>
            <Grid container spacing={3} direction="column">
                <Grid item>
                    <AllJobsComponent/>
                </Grid>
            </Grid>
        </GitlabPipelinesProvider>
    )
}