
import React from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { StatusComponent } from '../../StatusComponent';
import { truncateString } from '../../../utils/helpers';
import { JobActions } from '../JobActions';
import { useJobItemStyles } from './styles';
import { JobProps } from './types';

export const JobItem : React.FC<JobProps>= (props) => {

  const { id, name, variable, tooltip, status} = props;
  const classes = useJobItemStyles();

  return (
    <Box
      className={classes.job}
    >
      <StatusComponent
        status={status}
        icon
      />

      <Tooltip title={tooltip as string} placement="top">
        <Typography
          className={classes.name}
        >
          {truncateString(name, 13)}
        </Typography>
      </Tooltip>

      <Box
        role="button"
        className={classes.clickable}>
        <JobActions
          id={id}
          variable={variable}
          status={status}
        />
      </Box>

    </Box>
  )
}
