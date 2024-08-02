import React from 'react';
import { IconButton } from "@material-ui/core"
import { InfoButtonProps } from './types';
import InfoIcon from '@material-ui/icons/Info';
import { addNodeInfo } from '../state';

export const InfoButton : React.FC<InfoButtonProps> = (props) => {
     const{info,toggleDrawer,nodeInfoDispatch}=props;

     const handleClick = () => {
        nodeInfoDispatch(addNodeInfo(info))
        toggleDrawer(true)
     }

    return (<IconButton
        key="open"
        title="More info"
        onClick={handleClick}
        color="inherit"
    >
        <InfoIcon />
    </IconButton>)
}