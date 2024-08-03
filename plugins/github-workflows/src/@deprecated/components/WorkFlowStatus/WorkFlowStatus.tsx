import React from 'react';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdPlayCircle } from "react-icons/md";
import { PiWarningOctagon } from "react-icons/pi";
import { Loading } from './loading';
import { Queued } from './queued';

type WorkFlowStatusProps = {
    status?: string,
    conclusion?: string,
    icon?: boolean
}

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.7rem'
}

export const WorkFlowStatus : React.FC<WorkFlowStatusProps> = ({ status, conclusion, icon }) => {

    if (!status) return null;
   
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
        case StatusWorkflowEnum.pending:
        case StatusWorkflowEnum.waiting:
            return (
                <div style={styles}>
                    <Queued/> {!icon && "Queued"}
                </div>
            );
        case StatusWorkflowEnum.actionRequired:
        case StatusWorkflowEnum.neutral:
        case StatusWorkflowEnum.stale:
        case StatusWorkflowEnum.requested:
            return (
                <div style={styles}>
                    <RiErrorWarningFill size={20} color="orange" /> {!icon && "Please wait"}
                </div>
            );
        case StatusWorkflowEnum.failure:
        case StatusWorkflowEnum.timeOut:
            return (
                <div style={styles}>
                    <IoCloseCircle size={20} color="#E2524B"/> {!icon && "Error"}
                </div>
            );
        case StatusWorkflowEnum.aborted:
            return (
                <div style={styles}>
                    <PiWarningOctagon size={20} color="#cdcdcd"/> {!icon && "Aborted"}
                </div>
            );
        case StatusWorkflowEnum.inProgress:
            return (
                <div style={styles}>
                    <Loading/> {!icon && "In progress"}
                </div>
            );
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()) {
                case StatusWorkflowEnum.skipped:
                case StatusWorkflowEnum.canceled:
                case StatusWorkflowEnum.aborted:
                case StatusWorkflowEnum.default:
                    return (
                        <div style={styles}>
                            <PiWarningOctagon size={22} color="#cdcdcd" /> {!icon && "Aborted"}
                        </div>
                    );
                case StatusWorkflowEnum.timeOut:
                case StatusWorkflowEnum.actionRequired:
                case StatusWorkflowEnum.stale:
                case StatusWorkflowEnum.neutral:
                    return (
                        <div style={styles}>
                            <RiErrorWarningFill size={20} color="orange" /> {!icon && "Timed out"}
                        </div>
                    );
                case StatusWorkflowEnum.failure:
                case null:
                    return (
                        <div style={styles}>
                            <IoCloseCircle size={20} color="#E2524B"/> {!icon && "Error"}
                        </div>
                    );
                default:
                    return (
                        <div style={styles}>
                            <FaCircleCheck size={20} color="#61AB5A"/> {!icon && "Completed"}
                        </div>
                    );
            }
        default:
            return (
                <div style={styles}>
                    <MdPlayCircle size={22} color="#cdcdcd"/>{!icon && "Run Workflow"}
                </div>
            )
    }
}
