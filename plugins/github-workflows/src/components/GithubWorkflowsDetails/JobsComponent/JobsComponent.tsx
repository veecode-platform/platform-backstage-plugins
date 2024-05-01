import { Box, Paper, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { Job } from '../../../utils/types'
import { calculateDuration, getFileNameToPath } from '../../../utils/common'
import { useStyles } from '../styles'
import { WorkFlowStatus } from '../../WorkFlowStatus'

export type JobsComponentProps = {
    path:string,
    event: string,
    jobs: Job[]
}

export const JobsComponent : React.FC<JobsComponentProps> = (props) => {

  const {path,event,jobs} = props
  const title = getFileNameToPath(path);
  const {jobsSection, jobsContent,jobItem,jobDuration} = useStyles();

  return (
    <Paper variant="outlined" className={jobsSection}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        on: {event}
      </Typography>
      <div className={jobsContent}>
        {jobs.map(j => (
          <Tooltip 
            key={j.id} 
            title="Click to see the steps..."
            arrow
            >
            <Box className={jobItem}>
              <WorkFlowStatus
                status={j.status}
                conclusion={j.conclusion}
                icon
              />
              <Typography variant="body1">{j.name}</Typography>
              <div className={jobDuration}>
                <Typography variant="body1" align="right">
                  {calculateDuration(j.started_at, j.completed_at!)}
                </Typography>
              </div>
            </Box>
          </Tooltip>
        ))}
      </div>
    </Paper>
  );
}
