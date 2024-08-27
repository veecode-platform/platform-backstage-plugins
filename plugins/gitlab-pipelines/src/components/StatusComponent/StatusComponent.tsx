import React from 'react'
import { GitlabPipelinesStatus } from '../../utils/enums/GitlabPipelinesStatus'
import { PipelineStatusProps } from './types';
import { RiErrorWarningFill } from 'react-icons/ri';
import { PiRecordFill } from 'react-icons/pi';
import { Loading } from './loading';
import { FcOk } from 'react-icons/fc';
import { TbCircleChevronsRight } from "react-icons/tb";
import { CgCloseO } from "react-icons/cg";
import { TbClockHour3 } from "react-icons/tb";

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.7rem'
}

export const StatusComponent : React.FC<PipelineStatusProps> = (props) => {

    const { status, icon } = props;

    if (!status) return null;

    switch (status.toLocaleLowerCase()) {
        case GitlabPipelinesStatus.pending:
        case GitlabPipelinesStatus.waitingForResource:
        case GitlabPipelinesStatus.pendingApproval:
        case GitlabPipelinesStatus.scheduled:
        case GitlabPipelinesStatus.approvalPending:
            return (
                <div style={styles}>
                    <TbClockHour3 size={22} color="#eab308"/> {!icon && "Pending"}
                </div>
            );
        case GitlabPipelinesStatus.preparing:
            return (
                <div style={styles}>
                    <RiErrorWarningFill size={20} color="orange" /> {!icon && "Please wait"}
                </div>
            );
        case GitlabPipelinesStatus.failed:
        case GitlabPipelinesStatus.failedWithWarnings:
        case GitlabPipelinesStatus.approvalBlocked:
            return (
                <div style={styles}>
                     <CgCloseO size={20} color="#E2524B"/> {!icon && "Error"}
                </div>
            );
        case GitlabPipelinesStatus.canceled:
        case GitlabPipelinesStatus.skipped: 
        case GitlabPipelinesStatus.blocked:   
            return (
                <div style={styles}>
                    <TbCircleChevronsRight size={20} color="#cdcdcd"/> {!icon && "Skipped"}
                </div>
            );
        case GitlabPipelinesStatus.running:
            return (
                <div style={styles}>
                    <Loading/> {!icon && "In progress"}
                </div>
            );
        case GitlabPipelinesStatus.created:
        case GitlabPipelinesStatus.manualyCreated:
            return (
                <div style={styles}>
                    <PiRecordFill size={22} color="#cdcdcd"/> {!icon && "Created"}
                </div>
            );
        case GitlabPipelinesStatus.success:
        case GitlabPipelinesStatus.manual:
            return (
                <div style={styles}>
                    <FcOk size={20} /> {!icon && "Success"} 
                </div>
            );
        default:
            return (
                <div style={styles}>
                    <TbClockHour3 size={22} color="#eab308"/> {!icon && "Pending"}
                </div>
            )
    }
}
