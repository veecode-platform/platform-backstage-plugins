import React from 'react'
import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from '@backstage/core-components'
import { GitlabPipelinesStatus } from '../../utils/enums/GitlabPipelinesStatus'

type PipelineStatusProps = {
    status?: string,
    icon?: boolean
}

export const StatusComponent = ({ status, icon }: PipelineStatusProps) => {

    if (!status) return null;

    switch (status.toLocaleLowerCase()) {
        case GitlabPipelinesStatus.pending:
        case GitlabPipelinesStatus.waitingForResource:
        case GitlabPipelinesStatus.pendingApproval:
        case GitlabPipelinesStatus.scheduled:
        case GitlabPipelinesStatus.approvalPending:
            return (
                <>
                    <StatusPending /> {!icon && "Pending"}
                </>
            );
        case GitlabPipelinesStatus.preparing:
            return (
                <>
                    <StatusWarning /> {!icon && "Please wait"}
                </>
            );
        case GitlabPipelinesStatus.failed:
        case GitlabPipelinesStatus.failedWithWarnings:
        case GitlabPipelinesStatus.approvalBlocked:
            return (
                <>
                    <StatusError /> {!icon && "Error"}
                </>
            );
        case GitlabPipelinesStatus.canceled:
        case GitlabPipelinesStatus.skipped: 
        case GitlabPipelinesStatus.blocked:   
            return (
                <>
                    <StatusAborted /> {!icon && "Aborted"}
                </>
            );
        case GitlabPipelinesStatus.running:
            return (
                <>
                    <StatusRunning /> {!icon && "In progress"}
                </>
            );
        case GitlabPipelinesStatus.created:
        case GitlabPipelinesStatus.manualyCreated:
            return (
                <>
                    <StatusOK /> {!icon && "Created"}
                </>
            );
        case GitlabPipelinesStatus.success:
        case GitlabPipelinesStatus.manual:
            return (
                <>
                    <StatusOK /> {!icon && "Success"}
                </>
            );
        default:
            return (
                <>
                    <StatusPending /> {!icon && "Pending"}
                </>
            )
    }
}
