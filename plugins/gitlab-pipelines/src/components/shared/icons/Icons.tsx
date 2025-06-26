import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export const WarningIcon = () => (
  <ErrorIcon style={{ fontSize: '20', color: 'orange' }} />
);

export const RecordIcon = () => (
  <RadioButtonCheckedIcon style={{ fontSize: '20', color: '#cdcdcd' }} />
);

export const CheckOkIcon = () => (
  <CheckCircleIcon style={{ fontSize: '22', color: 'green' }} />
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
