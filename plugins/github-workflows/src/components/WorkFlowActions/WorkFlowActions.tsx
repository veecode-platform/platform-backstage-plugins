import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core';

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
            return <TimerIcon/>
        case StatusWorkflowEnum.inProgress:
            return <RefreshIcon className={classes.inProgress}/>
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()){
                case StatusWorkflowEnum.skipped || StatusWorkflowEnum.canceled:
                    return <HighlightOffIcon/>;
                case StatusWorkflowEnum.timeOut:
                    return  <TimerIcon/>;
                case StatusWorkflowEnum.failure:
                    return  <ReplayIcon/>;
                default:
                return <SyncIcon/> ;              
        }
        default: 
            return <TimerIcon/>;
    }
}
