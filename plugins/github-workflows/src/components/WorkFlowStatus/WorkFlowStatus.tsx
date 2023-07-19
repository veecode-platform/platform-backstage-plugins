import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum'
import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from '@backstage/core-components'

type WorkFlowStatusProps = {
    status?: string,
    conclusion?: string,
    icon?: boolean
}

export const WorkFlowStatus = ({status, conclusion, icon}:WorkFlowStatusProps) => {
  
    if(!status) return null;
    
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
            return (
                <>
                  <StatusPending /> {!icon && "Queued"}
                </>
            );
        case StatusWorkflowEnum.inProgress:
            return (
                <>
                    <StatusRunning /> {!icon && "In progress"}
                </>
            );
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()){
                case StatusWorkflowEnum.skipped:
                case StatusWorkflowEnum.canceled:
                case StatusWorkflowEnum.aborted:
                    return (
                        <>
                            <StatusAborted /> {!icon && "Aborted"}
                        </>
                    );
                case StatusWorkflowEnum.timeOut:
                    return (
                        <>
                          <StatusWarning /> {!icon && "Timed out"}
                        </>
                      );
                case StatusWorkflowEnum.failure:
                    return (
                        <>
                          <StatusError /> {!icon && "Error"}
                        </>
                      );
                default:
                return (
                    <>
                        <StatusOK /> {!icon && "Completed"}
                    </>
                    );                  
        }
        default: 
            return (
                <>
                    <StatusPending/> {!icon && "Pending"}
                </>
            )
    }
}
