import React from 'react'
import { Job, Step } from '../../../utils/types'
import { Box, Fade, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@material-ui/core'
import { useModalStyle } from './style'
import { WorkFlowStatus } from '../../WorkFlowStatus'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { calculateDuration } from '../../../utils/common';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import BlockIcon from '@material-ui/icons/Block';

dayjs.extend(relativeTime);
dayjs.extend(duration);

type JobModalProps = {
    job: Job,
    show: boolean,
    handleCloseModal: () => void
}

type HeaderComponentProps = {
    jobName: string,
    jobStatus: string,
    jobConclusion: string,
    jobStartedAt: string,
    jobCompletedAt: string
}

type StepsListComponentsProps = {
    steps: Step[]
}

const HeaderComponent : React.FC<HeaderComponentProps> = (props) => {
    const {jobName, jobStatus, jobConclusion, jobStartedAt, jobCompletedAt } = props;
    const { modalHeader,subtitle } = useModalStyle();
    return (
        <div className={modalHeader}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                {jobName}
            </Typography>
            <div className={subtitle}>
                <WorkFlowStatus status={jobStatus} conclusion={jobConclusion} icon/>
                <Typography variant="subtitle2" color="textSecondary"> 
                    {jobConclusion} to <time>{dayjs(jobStartedAt).fromNow()}</time> in <time>{calculateDuration(jobStartedAt, jobCompletedAt)}</time>
                </Typography> 
            </div>
        </div>
    )
}

const StepsListComponent : React.FC<StepsListComponentsProps> = (props) => {
    const {steps} = props;
    const {jobsList,jobListItem} = useModalStyle();
    return (
      <List className={jobsList}>
        {steps.map(step => (
          <ListItem key={step.number} className={jobListItem}>
            <ListItemAvatar>
              {step.conclusion === 'success' ? (<CheckCircleIcon color="disabled" /> ) : (
                <>
                  {step.conclusion === 'failure' ? (<CancelIcon color="error" />) : (<BlockIcon color="disabled" />)}
                </>
              )}
            </ListItemAvatar>
            <ListItemText primary={step.name} />
            <Typography variant="subtitle1">
              <time> {calculateDuration(step.started_at!, step.completed_at!)}</time>
            </Typography>
          </ListItem>
        ))}
      </List>
    );
}

export const JobModal : React.FC<JobModalProps> = (props) => {
  const { job, show, handleCloseModal } = props;
  const { modalOnBlur,modalContent} = useModalStyle();
  // eslint-disable-next-line no-console
  console.log(job)

  return (
    <Modal
      open={show}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-job-details"
      aria-describedby="modal-modal-jobs-details-and-steps"
      className={modalOnBlur}
      closeAfterTransition
     >
        <Fade in={show}>
          <Box className={modalContent}>
            <HeaderComponent
             jobName={job.name}
             jobStatus={job.status}
             jobConclusion={job.conclusion!}
             jobStartedAt={job.started_at}
             jobCompletedAt={job.completed_at!} />
            <StepsListComponent 
              steps={job.steps!} />
          </Box>
        </Fade>
    </Modal>
  )
}
