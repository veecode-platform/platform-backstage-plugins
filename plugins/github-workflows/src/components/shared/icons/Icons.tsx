import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import ReportOffOutlined from '@material-ui/icons/ReportOffOutlined';

export const WarningIcon = () => (
  <ErrorIcon style={{ fontSize: '20', color: 'orange' }} />
);

export const RecordIcon = () => (
  <RadioButtonCheckedIcon style={{ fontSize: '20', color: '#cdcdcd' }} />
);

export const CheckOkIcon = () => (
  <CheckCircleIcon style={{ fontSize: '22', color: '#61AB5A' }} />
);

export const CancelIconOutline = () => (
  <CancelIcon style={{ fontSize: '20px', color: '#E2524B' }} />
);

export const PlayCircleIcon = () => (
  <PlayCircleFilled style={{ fontSize: '22px', color: '#cdcdcd' }} />
);

export const ReportOffIcon = () => (
  <ReportOffOutlined style={{ fontSize: '22px', color: '#cdcdcd' }} />
);

export const CircleChevronsRight = () => (
  <ChevronRightOutlined style={{ fontSize: '20', color: '#cdcdcd' }} />
);

export const CircleCloseOutline = () => (
  <HighlightOffIcon style={{ fontSize: '20', color: '#E2524B' }} />
);

export const ClockIcon = () => (
  <AccessTimeIcon style={{ fontSize: '22', color: '#eab308' }} />
);
