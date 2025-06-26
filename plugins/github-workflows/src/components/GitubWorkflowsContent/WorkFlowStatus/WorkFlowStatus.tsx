import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import ReportOffOutlined from '@material-ui/icons/ReportOffOutlined';
import { Loading } from './loading';
import { Queued } from './queued';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import { WorkFlowStatusProps } from './types';

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
          <ErrorIcon style={{ fontSize: '20px', color: 'orange' }} />{' '}
          {!icon && 'Please wait'}
        </div>
      );
    case StatusWorkflowEnum.actionRequired:
      return (
        <div style={styles}>
          <ErrorIcon style={{ fontSize: '20px', color: 'orange' }} />{' '}
          {!icon && 'Workflow dynamic'}
        </div>
      );
    case StatusWorkflowEnum.failure:
    case StatusWorkflowEnum.timeOut:
      return (
        <div style={styles}>
          <CancelIcon style={{ fontSize: '20px', color: '#E2524B' }} />{' '}
          {!icon && 'Error'}
        </div>
      );
    case StatusWorkflowEnum.aborted:
      return (
        <div style={styles}>
          <ReportOffOutlined style={{ fontSize: '20px', color: '#cdcdcd' }} />{' '}
          {!icon && 'Aborted'}
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
              <ReportOffOutlined
                style={{ fontSize: '22px', color: '#cdcdcd' }}
              />{' '}
              {!icon && 'Aborted'}
            </div>
          );
        case StatusWorkflowEnum.timeOut:
        case StatusWorkflowEnum.actionRequired:
        case StatusWorkflowEnum.stale:
        case StatusWorkflowEnum.neutral:
          return (
            <div style={styles}>
              <ErrorIcon style={{ fontSize: '20px', color: 'orange' }} />{' '}
              {!icon && 'Timed out'}
            </div>
          );
        case StatusWorkflowEnum.failure:
        case null:
          return (
            <div style={styles}>
              <CancelIcon style={{ fontSize: '20px', color: '#E2524B' }} />{' '}
              {!icon && 'Error'}
            </div>
          );
        default:
          return (
            <div style={styles}>
              <CheckCircleIcon style={{ fontSize: '20px', color: '#61AB5A' }} />{' '}
              {!icon && 'Completed'}
            </div>
          );
      }
    default:
      return (
        <div style={styles}>
          <PlayCircleFilled style={{ fontSize: '22px', color: '#cdcdcd' }} />
          {!icon && 'Run Workflow'}
        </div>
      );
  }
};
