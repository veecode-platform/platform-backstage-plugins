import React from 'react';
import { StepLabel, makeStyles } from '@material-ui/core';
import { LabelFieldProps } from './types';

const useStyles = makeStyles({
    labelWrapper :{
        width: '30%',
        textTransform: 'uppercase'
    }
})

export const LabelField : React.FC<LabelFieldProps> = (props) => {

    const { title } = props;
    const { labelWrapper } = useStyles();

    return(
        <StepLabel 
         className={labelWrapper}>
            {title}
        </StepLabel>
    )
}