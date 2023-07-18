import { makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { 
  StatusError,
  StatusAborted,
  StatusOK,
  StatusPending,
  StatusRunning,
  StatusWarning } from '@backstage/core-components';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';

type WorkFlowItemProps = {
  children: ReactNode | string,
  status: string,
}

const useStyles = makeStyles(theme =>({
    workflow:{
      padding: '.8rem 3rem',
      background: 'transparent',
      border: `1px solid ${theme.palette.border}`,
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: theme.palette.text.primary,
      minWidth: '235px',
    },
    clickable:{
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }));

export const WorkFlowItem = ({status,children}:WorkFlowItemProps) => {

  const classes = useStyles();

  return (
    <div 
      className={classes.workflow}
      >
      {status === StatusWorkflowEnum.completed && <StatusOK/>}
      {status === StatusWorkflowEnum.error && <StatusError/>}
      {status === StatusWorkflowEnum.pending && <StatusPending/>}
      {status === StatusWorkflowEnum.aborted && <StatusAborted/>}
      {status === StatusWorkflowEnum.running && <StatusRunning/>}
      {status === StatusWorkflowEnum.warning && <StatusWarning/>}
      {children} 
      <span
        className={classes.clickable}>
        {status === StatusWorkflowEnum.completed && <SyncIcon/>}
        {status === StatusWorkflowEnum.error && <ReplayIcon/>}
        {status === StatusWorkflowEnum.pending && <TimerIcon/>}
        {status === StatusWorkflowEnum.aborted && <HighlightOffIcon/>}
        {status === StatusWorkflowEnum.running && <HourglassEmptyIcon/>}
        {status === StatusWorkflowEnum.warning && <ErrorOutlineIcon/>}
      </span>
    </div>
  )
}
