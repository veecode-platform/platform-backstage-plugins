import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDroUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import UndoIcon from '@material-ui/icons/Undo';

export const ExpandIcon = () => (
  <OpenInNewIcon
    style={{ fontSize: '26px', color: '#CDCDCD', cursor: 'pointer' }}
  />
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

export const DropDownIcon = () => <ArrowDropDownIcon />;

export const DropUpIcon = () => <ArrowDroUpIcon />;

export const UserIcon = () => <AccountCircleIcon />;

export const AddIcon = () => <Add style={{ fontSize: '20px' }} />;

export const RemoveIcon = () => <Remove style={{ fontSize: '20px' }} />;

export const ArrowBackIcon = () => (
  <UndoIcon style={{ cursor: 'pointer', color: '#CDCDCD', fontSize: '26px' }} />
);
