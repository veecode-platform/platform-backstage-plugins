import { Box, Tooltip, makeStyles } from '@material-ui/core';
import React from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { truncateString } from '../../../utils/common';

type WorkFlowItemProps = {
  workflowName: string,
  conclusion?:string,
  status?: string,
}

type StatusActionCardProps = {
  status?: string,
  conclusion?: string
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
    },
    inProgress:{
      animation: '$spin 2s linear infinite'
    },
    '@keyframes spin':{
      '0%':{
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  }));

  export const StatusActionCard = ({status,conclusion}:StatusActionCardProps) => {

    const classes = useStyles();

    switch (status?.toLocaleLowerCase()) {
      case StatusWorkflowEnum.failure:
      case StatusWorkflowEnum.canceled:
      case StatusWorkflowEnum.failure:
      case StatusWorkflowEnum.skipped:
      case StatusWorkflowEnum.timeOut:
        return (
          <Tooltip title="Run again" placement="right">
            <ReplayIcon/>
          </Tooltip>
          );
      case StatusWorkflowEnum.queued:
        return (
          <Tooltip title="Is pending, wait..." placement="right">
            <TimerIcon/>
          </Tooltip>);
      case StatusWorkflowEnum.inProgress:
        return (
          <Tooltip title="Stop" placement="right">
            <RefreshIcon className={classes.inProgress}/>
          </Tooltip>
        );
      case StatusWorkflowEnum.aborted:
        return (
          <Tooltip title="Run again" placement="right">
             <PlayCircleOutlineIcon/>
          </Tooltip>
        );
      case StatusWorkflowEnum.completed:
          switch (conclusion?.toLocaleLowerCase()){
            case StatusWorkflowEnum.failure:
            case StatusWorkflowEnum.canceled:
            case StatusWorkflowEnum.failure:
            case StatusWorkflowEnum.skipped:
            case StatusWorkflowEnum.timeOut:
              return (
              <Tooltip title="Run again" placement="right">
                <ReplayIcon/>
              </Tooltip>
              );
            case StatusWorkflowEnum.aborted:
                return (
                  <Tooltip title="Try again" placement="right">
                    <PlayCircleOutlineIcon/>
                  </Tooltip>);
              default:
              return (
              <Tooltip title="Run" placement="right">
                <SyncIcon/>
              </Tooltip>
              ) ;              
      };
      default:
        return (
          <Tooltip title="Run" placement="right">
            <SyncIcon/>
          </Tooltip>
          ) ;  
    }
  }

export const WorkFlowItem = ({status,conclusion, workflowName}:WorkFlowItemProps) => {

  const classes = useStyles();

  return (
    <Box 
      className={classes.workflow}
      >
      <WorkFlowStatus
        status={status}
        conclusion={conclusion ? conclusion : ''}
        icon
      />
      {truncateString(workflowName,13)} 
      <Box
        role="button"
        className={classes.clickable}>
        <StatusActionCard
          status={status}
         />
      </Box>
    </Box>
  )
}
