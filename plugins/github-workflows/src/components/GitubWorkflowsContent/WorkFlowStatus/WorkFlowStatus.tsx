import React from 'react';
import { Loading } from './loading';
import { Queued } from './queued';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import { WorkFlowStatusProps } from './types';
import {
  CancelIconOutline,
  CheckOkIcon,
  PlayCircleIcon,
  ReportOffIcon,
  WarningIcon,
} from '../../shared';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.7rem',
};

export const WorkFlowStatus: React.FC<WorkFlowStatusProps> = props => {
  const { status, conclusion, icon } = props;

  if (!status) return null;

  switch (status.toLocaleLowerCase()) {
    case StatusWorkflowEnum.queued:
    case StatusWorkflowEnum.pending:
    case StatusWorkflowEnum.waiting:
      return (
        <div style={styles}>
          <Queued /> {!icon && 'Queued'}
        </div>
      );
    case StatusWorkflowEnum.neutral:
    case StatusWorkflowEnum.stale:
    case StatusWorkflowEnum.requested:
      return (
        <div style={styles}>
          <WarningIcon /> {!icon && 'Please wait'}
        </div>
      );
    case StatusWorkflowEnum.actionRequired:
      return (
        <div style={styles}>
          <WarningIcon /> {!icon && 'Workflow dynamic'}
        </div>
      );
    case StatusWorkflowEnum.failure:
    case StatusWorkflowEnum.timeOut:
      return (
        <div style={styles}>
          <CancelIconOutline /> {!icon && 'Error'}
        </div>
      );
    case StatusWorkflowEnum.aborted:
      return (
        <div style={styles}>
          <ReportOffIcon /> {!icon && 'Aborted'}
        </div>
      );
    case StatusWorkflowEnum.inProgress:
      return (
        <div style={styles}>
          <Loading /> {!icon && 'In progress'}
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
              <ReportOffIcon /> {!icon && 'Aborted'}
            </div>
          );
        case StatusWorkflowEnum.timeOut:
        case StatusWorkflowEnum.actionRequired:
        case StatusWorkflowEnum.stale:
        case StatusWorkflowEnum.neutral:
          return (
            <div style={styles}>
              <WarningIcon /> {!icon && 'Timed out'}
            </div>
          );
        case StatusWorkflowEnum.failure:
        case null:
          return (
            <div style={styles}>
              <CancelIconOutline /> {!icon && 'Error'}
            </div>
          );
        default:
          return (
            <div style={styles}>
              <CheckOkIcon /> {!icon && 'Completed'}
            </div>
          );
      }
    default:
      return (
        <div style={styles}>
          <PlayCircleIcon />
          {!icon && 'Run Workflow'}
        </div>
      );
  }
};
