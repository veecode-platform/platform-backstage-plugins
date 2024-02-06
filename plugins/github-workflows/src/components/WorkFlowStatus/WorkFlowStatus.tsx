import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum'
import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from '@backstage/core-components'

type WorkFlowStatusProps = {
    status?: string,
    conclusion?: string,
    icon?: boolean
}

export const WorkFlowStatus = ({ status, conclusion, icon }: WorkFlowStatusProps) => {

    if (!status) return null;

    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
        case StatusWorkflowEnum.pending:
        case StatusWorkflowEnum.waiting:
            return (
                <>
                    <StatusPending /> {!icon && "Queued"}
                </>
            );
        case StatusWorkflowEnum.actionRequired:
        case StatusWorkflowEnum.neutral:
        case StatusWorkflowEnum.stale:
        case StatusWorkflowEnum.requested:
            return (
                <>
                    <StatusWarning /> {!icon && "Please wait"}
                </>
            );
        case StatusWorkflowEnum.failure:
        case StatusWorkflowEnum.timeOut:
            return (
                <>
                    <StatusError /> {!icon && "Error"}
                </>
            );
        case StatusWorkflowEnum.aborted:
            return (
                <>
                    <StatusAborted /> {!icon && "Aborted"}
                </>
            );
        case StatusWorkflowEnum.inProgress:
            return (
                <>
                    <StatusRunning /> {!icon && "In progress"}
                </>
            );
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()) {
                case StatusWorkflowEnum.skipped:
                case StatusWorkflowEnum.canceled:
                case StatusWorkflowEnum.aborted:
                    return (
                        <>
                            <StatusAborted /> {!icon && "Aborted"}
                        </>
                    );
                case StatusWorkflowEnum.timeOut:
                case StatusWorkflowEnum.actionRequired:
                case StatusWorkflowEnum.stale:
                case StatusWorkflowEnum.neutral:
                    return (
                        <>
                            <StatusWarning /> {!icon && "Timed out"}
                        </>
                    );
                case StatusWorkflowEnum.failure:
                case null:
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
                    <StatusAborted /> {!icon && "Run Workflow"}
                </>
            )
    }
}
