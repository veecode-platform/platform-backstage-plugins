import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

export const ExpandIcon = () => (
  <OpenInNewIcon style={{ fontSize: '22px', color: '#B1B1B190' }} />
);

export const ShowIcon = () => <RemoveRedEyeIcon />;

export const HiddenIcon = () => <VisibilityOffIcon />;

export const CircleCloseIcon = () => (
  <CloseIcon
    style={{
      fontSize: '32px',
      color: '#cdcdcd',
      cursor: 'pointer',
      marginRight: '-1rem',
    }}
  />
);

export const CircleInfoIcon = () => (
  <InfoIcon style={{ fontSize: '20px', color: '#2D7DFD' }} />
);
