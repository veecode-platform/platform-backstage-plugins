import { Box, Paper, Tooltip, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Job } from '../../../../utils/types'
import { calculateDuration, getFileNameToPath } from '../../../../utils/helpers'
import { useWorkflowDetailsStyles } from '../styles'
import { WorkFlowStatus } from '../../WorkFlowStatus'
import { JobModal } from '../JobModal'
import { JobsComponentProps } from '../types'

export const JobsComponent : React.FC<JobsComponentProps> = (props) => {

  const {path,event,jobs} = props
  const title = getFileNameToPath(path);
  const [ showModalSteps,setShowModalSteps ] = useState<boolean>(false);
  const [ jobSelected, setJobSelected] = useState<Job|null>(null);
  const {jobsSection, jobsContent,jobItem,jobDuration} = useWorkflowDetailsStyles();

  const handleToggleModal = () => setShowModalSteps(!showModalSteps);

  const handleClickAction = (job:Job) => {
    if(job){
      setJobSelected(job);
      handleToggleModal();
    }
  }

  return (
    <>
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
              onClick={() => handleClickAction(j)}
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

      {jobSelected && (
        <JobModal
          job={jobSelected!}
          show={showModalSteps}
          handleCloseModal={handleToggleModal}
        />
      )}
    </>
  );
}
