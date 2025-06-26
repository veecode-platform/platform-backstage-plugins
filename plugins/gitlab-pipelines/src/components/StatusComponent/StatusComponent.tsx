import React from 'react';
import { GitlabPipelinesStatus } from '../../utils/enums/GitlabPipelinesStatus';
import { PipelineStatusProps } from './types';
import { Loading } from './loading';
import {
  WarningIcon,
  RecordIcon,
  CheckOkIcon,
  CircleChevronsRight,
  CircleCloseOutline,
  ClockIcon,
} from '../shared';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.7rem',
};

export const StatusComponent: React.FC<PipelineStatusProps> = props => {
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
          <ClockIcon /> {!icon && 'Pending'}
        </div>
      );
    case GitlabPipelinesStatus.preparing:
      return (
        <div style={styles}>
          <WarningIcon /> {!icon && 'Please wait'}
        </div>
      );
    case GitlabPipelinesStatus.failed:
    case GitlabPipelinesStatus.failedWithWarnings:
    case GitlabPipelinesStatus.approvalBlocked:
      return (
        <div style={styles}>
          <CircleCloseOutline /> {!icon && 'Error'}
        </div>
      );
    case GitlabPipelinesStatus.canceled:
    case GitlabPipelinesStatus.skipped:
    case GitlabPipelinesStatus.blocked:
      return (
        <div style={styles}>
          <CircleChevronsRight /> {!icon && 'Skipped'}
        </div>
      );
    case GitlabPipelinesStatus.running:
      return (
        <div style={styles}>
          <Loading /> {!icon && 'In progress'}
        </div>
      );
    case GitlabPipelinesStatus.created:
    case GitlabPipelinesStatus.manualyCreated:
      return (
        <div style={styles}>
          <RecordIcon /> {!icon && 'Created'}
        </div>
      );
    case GitlabPipelinesStatus.success:
    case GitlabPipelinesStatus.manual:
      return (
        <div style={styles}>
          <CheckOkIcon /> {!icon && 'Success'}
        </div>
      );
    default:
      return (
        <div style={styles}>
          <ClockIcon /> {!icon && 'Pending'}
        </div>
      );
  }
};
