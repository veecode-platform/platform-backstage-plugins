import { StepLabel, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    labelWrapper :{
        width: '30%'
    }
})

export const LabelField = ({title}:{title: string}) => {

    const { labelWrapper } = useStyles();

    return(
        <StepLabel className={labelWrapper}>{title}</StepLabel>
    )
}