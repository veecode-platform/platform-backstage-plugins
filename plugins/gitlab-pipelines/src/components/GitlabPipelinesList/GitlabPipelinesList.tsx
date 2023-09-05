import { Grid } from '@material-ui/core'
import React from 'react'
import { GitlabPipelinesProvider } from '../context/GitlabPipelinesProvider'
import { PipelinesTable } from './PipelinesTable'

export const GitlabPipelinesList = () => {

    return (
        <GitlabPipelinesProvider>
            <Grid container spacing={3} direction="column">
                <Grid item>
                    <PipelinesTable/>
                </Grid>
            </Grid>
        </GitlabPipelinesProvider>
    )
}