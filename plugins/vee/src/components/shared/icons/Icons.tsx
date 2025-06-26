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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ReviewsIcon from '@mui/icons-material/Reviews';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Code from '@mui/icons-material/Code';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Folder from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';

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
  <InfoIcon style={{ fontSize: '26px', color: '#2D7DFD' }} />
);

export const DropDownIcon = () => <ArrowDropDownIcon />;

export const DropUpIcon = () => <ArrowDroUpIcon />;

export const UserIcon = () => <AccountCircleIcon />;

export const AddIcon = () => <Add style={{ fontSize: '20px' }} />;

export const RemoveIcon = () => <Remove style={{ fontSize: '20px' }} />;

export const ArrowBackIcon = () => (
  <UndoIcon style={{ cursor: 'pointer', color: '#CDCDCD', fontSize: '26px' }} />
);

export const StarsIcon = () => (
  <AutoAwesomeIcon
    color="secondary"
    style={{ fontSize: '20px', marginLeft: '1rem' }}
  />
);

export const ReviewMessageIcon = () => (
  <ReviewsIcon color="secondary" style={{ fontSize: '40px' }} />
);

export const ResetIcon = () => <RestartAltIcon />;

export const EditIcon = () => <Edit style={{ fontSize: '18px' }} />;

export const TrashIcon = () => <DeleteIcon style={{ fontSize: '18px' }} />;

export const CheckIcon = () => <Check style={{ fontSize: '18px' }} />;

export const CancelIconOutline = () => (
  <DoDisturbIcon style={{ fontSize: '18px', color: 'red' }} />
);

export const CodeIcon = () => <Code />;

export const FileDownloadIcon = () => <SimCardDownloadIcon />;

export const FileIcon = () => (
  <InsertDriveFileIcon style={{ fontSize: '20px' }} />
);

export const FolderIcon = () => (
  <Folder style={{ fontSize: '20px', color: '#F2B669' }} />
);

export const ExpandMoreIcon = () => <ExpandMore />;
export const ChevronRightIcon = () => <ChevronRight />;
