import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum'
import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from '@backstage/core-components'

type WorkFlowStatusProps = {
    status?: string,
    conclusion?: string
}

export const WorkFlowStatus = ({status, conclusion}:WorkFlowStatusProps) => {
  
    if(!status) return null;
    
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
            return (
                <>
                  <StatusPending /> Queued
                </>
            );
        case StatusWorkflowEnum.inProgress:
            return (
                <>
                    <StatusRunning /> In progress
                </>
            );
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()){
                case StatusWorkflowEnum.skipped || StatusWorkflowEnum.canceled:
                    return (
                        <>
                            <StatusAborted /> Aborted
                        </>
                    );
                case StatusWorkflowEnum.timeOut:
                    return (
                        <>
                          <StatusWarning /> Timed out
                        </>
                      );
                case StatusWorkflowEnum.failure:
                    return (
                        <>
                          <StatusError /> Error
                        </>
                      );
                        default:
                return (
                    <>
                    <StatusOK /> Completed
                    </>
          );                  
        }
        default: 
            return (
                <>
                    <StatusPending/> Pending
                </>
            )
    }
}
