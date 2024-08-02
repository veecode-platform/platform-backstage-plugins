import { Drawer, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { useDrawerStyles } from './styles';
import CloseIcon from '@material-ui/icons/Close';
import { InfoCard, StructuredMetadataTable } from '@backstage/core-components';
import { ClusterNodes } from '../../../utils/types';

export type DrawerComponentProps = {
    isOpen: boolean,
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    nodeInfoState: ClusterNodes
}

export const DrawerComponent : React.FC<DrawerComponentProps> = (props) => {

    const { isOpen,toggleDrawer,nodeInfoState } = props;
    const { paper } = useDrawerStyles();

    return (
        <Drawer
        classes={{
            paper: paper,
        }}
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
    >
        <Grid container>
            <Grid item md={12}>
                <IconButton
                    key="dismiss"
                    title="Close the drawer"
                    onClick={() => toggleDrawer(false)}
                    color="inherit"
                >
                    <CloseIcon />
                </IconButton>
            </Grid>

            <Grid item md={12}>
                <InfoCard title="Information">
                    <StructuredMetadataTable metadata={nodeInfoState as ClusterNodes} />
                </InfoCard>
            </Grid>

        </Grid>
    </Drawer>
    )
}