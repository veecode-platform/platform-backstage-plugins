import React from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum'
import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from '@backstage/core-components'
import { useTranslationRef } from '@backstage/core-plugin-api/alpha'
import { githubWorkflowsTranslationRef } from '../../translation'

type WorkFlowStatusProps = {
    status?: string,
    conclusion?: string,
    icon?: boolean
}

export const WorkFlowStatus = ({ status, conclusion, icon }: WorkFlowStatusProps) => {
    
    const { t } = useTranslationRef(githubWorkflowsTranslationRef);

    if (!status) return null;

    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
        case StatusWorkflowEnum.pending:
        case StatusWorkflowEnum.waiting:
            return (
                <>
                    <StatusPending /> {!icon && t('status.pending')}
                </>
            );
        case StatusWorkflowEnum.actionRequired:
        case StatusWorkflowEnum.neutral:
        case StatusWorkflowEnum.stale:
        case StatusWorkflowEnum.requested:
            return (
                <>
                    <StatusWarning /> {!icon && t('status.wait')}
                </>
            );
        case StatusWorkflowEnum.failure:
        case StatusWorkflowEnum.timeOut:
            return (
                <>
                    <StatusError /> {!icon && t('status.error')}
                </>
            );
        case StatusWorkflowEnum.aborted:
            return (
                <>
                    <StatusAborted /> {!icon && t('status.aborted')}
                </>
            );
        case StatusWorkflowEnum.inProgress:
            return (
                <>
                    <StatusRunning /> {!icon && t('status.inProgress')}
                </>
            );
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()) {
                case StatusWorkflowEnum.skipped:
                case StatusWorkflowEnum.canceled:
                case StatusWorkflowEnum.aborted:
                    return (
                        <>
                            <StatusAborted /> {!icon && t('status.aborted')}
                        </>
                    );
                case StatusWorkflowEnum.timeOut:
                case StatusWorkflowEnum.actionRequired:
                case StatusWorkflowEnum.stale:
                case StatusWorkflowEnum.neutral:
                    return (
                        <>
                            <StatusWarning /> {!icon && t('status.timeout')}
                        </>
                    );
                case StatusWorkflowEnum.failure:
                case null:
                    return (
                        <>
                            <StatusError /> {!icon && t('status.error')}
                        </>
                    );
                default:
                    return (
                        <>
                            <StatusOK /> {!icon && t('status.completed')}
                        </>
                    );
            }
        default:
            return (
                <>
                    <StatusAborted /> {!icon && t('status.runWorkflow')}
                </>
            )
    }
}
