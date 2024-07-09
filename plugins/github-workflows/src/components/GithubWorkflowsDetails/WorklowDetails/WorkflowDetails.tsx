import { Chip, Grid, Paper,Typography } from '@material-ui/core';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { calculateDuration, truncateString } from '../../../utils/helpers';
import { useWorkflowDetailsStyles } from '../styles';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { WorkflowDetailsProps } from '../types';

dayjs.extend(relativeTime);
dayjs.extend(duration);


export const WorkflowDetails: React.FC<WorkflowDetailsProps> = (props) => {
  const { runStartedAt,status,conclusion,updatedAt,avatar,author, branch, headCommit,repo } = props; 
  const { workflowDetailsNavbar,itemContent,itemWrapper,workflowInfo, avatarImg,link } = useWorkflowDetailsStyles();

  return (
    <Paper variant="outlined" className={workflowDetailsNavbar}>
      <Grid container direction='row' alignItems='center'>
        <Grid item lg={4} className={itemContent}>
          <div className={itemWrapper}>
              <Typography variant="subtitle2" color="textSecondary"> Triggered to <time>{dayjs(runStartedAt).fromNow()}</time> </Typography>
              <div className={workflowInfo}>
                <img src={avatar} alt="" className={avatarImg} />
                <Typography variant="subtitle1">{author}</Typography>
                <a href={`https://github.com/${repo}/commit/${headCommit}`} target="_blank" className={link}>
                  {truncateString(headCommit, 7)}
                </a>
                <Chip variant='default' label={branch}/>
              </div>
          </div>
        </Grid>
        <Grid item lg={2} className={itemContent}>
          <div className={itemWrapper}>
            <Typography variant="subtitle2" color="textSecondary" align='center'>Status</Typography>
            <Typography variant="h6" align='center'>
              <WorkFlowStatus status={status} conclusion={conclusion} icon/>
              {conclusion}
             </Typography>
          </div>
        </Grid>
        <Grid item lg={2} className={itemContent}>
          <div className={itemWrapper}>
            <Typography variant="subtitle2" color="textSecondary" align='center'>Total duration</Typography>
            <Typography variant="h6" align='center'>{calculateDuration(runStartedAt, updatedAt)}</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}