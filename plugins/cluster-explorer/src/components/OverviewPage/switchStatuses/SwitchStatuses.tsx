import React from 'react';
import { StatusError, StatusOK, StatusWarning } from "@backstage/core-components";
import { SwitchStatusesProps } from './types';

export const SwitchStatuses : React.FC<SwitchStatusesProps> = (props) => {

    const { status } = props;

    switch (status) {
        case "Active":
            return <StatusOK />
        case "Terminating":
            return <StatusError />
        default:
            return <StatusWarning />
    }
}