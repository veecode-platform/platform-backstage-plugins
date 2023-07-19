import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

type WorkFlowActionsProps = {
    status?: string,
    conclusion?: string
}

export const WorkFlowActions = ({status, conclusion}:WorkFlowActionsProps) => {
  
    if(!status) return null;
    
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
            return <TimerIcon/>
        case StatusWorkflowEnum.inProgress:
            return <HourglassEmptyIcon/>
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
