import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, Tooltip } from '@material-ui/core';

type WorkFlowActionsProps = {
    status?: string,
    conclusion?: string
}

const useStyles = makeStyles({
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
  });

export const WorkFlowActions = ({status, conclusion}:WorkFlowActionsProps) => {
    
    const classes = useStyles();

    if(!status) return null;
    
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
            return (
              <Tooltip title="Please wait" placement="right">
                <TimerIcon/>
              </Tooltip>
            );
        case StatusWorkflowEnum.inProgress:
            return (
              <Tooltip title="Stop" placement="right">
               <RefreshIcon className={classes.inProgress}/>
              </Tooltip>
            )
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()){
                case StatusWorkflowEnum.skipped:
                case StatusWorkflowEnum.canceled:
                    return (
                    <Tooltip title="Try again" placement="right">
                    <HighlightOffIcon/>
                    </Tooltip>);
                case StatusWorkflowEnum.timeOut:
                    return  (
                    <Tooltip title="Re-run" placement="right">
                      <TimerIcon/>
                    </Tooltip>
                    );
                case StatusWorkflowEnum.failure:
                    return ( 
                      <Tooltip title="Re-run" placement="right">
                        <ReplayIcon/>
                      </Tooltip>
                      );
                default:
                return (
                  <Tooltip title="Re-run" placement="right">
                    <SyncIcon/> 
                  </Tooltip>
                );              
        }
        default: 
            return (<Tooltip title="Is pending, wait..." placement="right">
              <TimerIcon/>
              </Tooltip>);
    }
}
