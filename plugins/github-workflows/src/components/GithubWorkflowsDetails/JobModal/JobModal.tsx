import '../../shared/globalstyle.css';
import React, { useState } from 'react'
import { Accordion, AccordionSummary, Box, CircularProgress, Fade, List, ListItem, ListItemAvatar, ListItemText, Modal, Tooltip, Typography, Zoom } from '@material-ui/core'
import { useModalStyles } from './styles'
import { WorkFlowStatus } from '../../WorkFlowStatus'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { calculateDuration } from '../../../utils/helpers';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import BlockIcon from '@material-ui/icons/Block';
import useAsync from 'react-use/lib/useAsync'
import { useGithuWorkflowsContext } from '../../../context'
import { useEntity } from '@backstage/plugin-catalog-react'
import { useEntityAnnotations } from '../../../hooks'
import { Entity } from '@backstage/catalog-model'
import { InfoBox } from '../../shared'
import { LogViewer, Progress } from '@backstage/core-components'
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum'
import { HeaderComponentProps, JobLogsComponentProps, JobModalProps, StepsListComponentsProps } from '../types';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const HeaderComponent : React.FC<HeaderComponentProps> = (props) => {
    const {jobName, jobStatus, jobConclusion, jobStartedAt, jobCompletedAt } = props;
    const { modalHeader,subtitle } = useModalStyles();
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
    const {jobsList,jobListItem} = useModalStyles();
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

const JobLogsComponent : React.FC<JobLogsComponentProps> = (props) => {

    const {jobId,running } = props;
    const {downloadJobLogs} = useGithuWorkflowsContext();
    const { entity } = useEntity();
    const { projectName,hostname } = useEntityAnnotations(entity as Entity);
    const [jobLogs,setJobLogs] = useState<string>('No Values Found');
    const [open, setOpen] = React.useState(false);
    const {AccordionLogs,button,modalLog,modalLogContainer,log,normalLogContainer} = useModalStyles();

    const { loading, error } = useAsync(async (): Promise<void> => {
        const logs = await downloadJobLogs(hostname,projectName,jobId);
        const logText =  String(logs);
        setJobLogs(logText);
      }, []);

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    if(error) return <InfoBox message="❌ Logs Not Found" />

    if(loading) return <Progress/>

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }} disabled={running} className={AccordionLogs}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              IconButtonProps={{
                className: button,
              }}
            >
            <Typography variant="button">
                {loading ? <CircularProgress /> : `Job Log`}
            </Typography>
            <Tooltip title="Open Log" TransitionComponent={Zoom} arrow>
                <DescriptionIcon
                onClick={event => {
                    event.stopPropagation();
                    handleOpen();
                }}
                style={{ marginLeft: 'auto' }}
                />
            </Tooltip>
            <Modal
                className={modalLog}
                onClick={event => event.stopPropagation()}
                open={open}
                onClose={handleClose}
             >
                <Fade in={open}>
                <div className={modalLogContainer}>
                    <LogViewer
                    text={jobLogs ?? 'No Values Found'}
                    classes={{ root: log }}
                    />
                </div>
                </Fade>
            </Modal>
            </AccordionSummary>
            {jobLogs && (
            <div className={normalLogContainer}>
                <LogViewer text={jobLogs} classes={{ root: log }} />
            </div>
            )}
        </Accordion>
    )
}

export const JobModal : React.FC<JobModalProps> = (props) => {
  const { job, show, handleCloseModal } = props;
  const { modalOnBlur,modalContent} = useModalStyles();

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

            <JobLogsComponent 
              jobId={job.id} 
              running={
                (job.status === StatusWorkflowEnum.queued && true) 
                ?? (job.status === StatusWorkflowEnum.inProgress ? true : false)
              }
              />
          </Box>
        </Fade>
    </Modal>
  )
}
