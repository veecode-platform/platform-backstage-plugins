import { Box, Tooltip, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { StatusComponent } from '../../StatusComponent';
import { truncateString } from '../../../utils/commons';
import { JobActions } from '../JobActions';

type JobProps = {
  id: number,
  name: string,
  status?: string
}

const useStyles = makeStyles(theme => ({
  workflow: {
    padding: '.8rem 3rem',
    background: 'transparent',
    border: `1px solid ${theme.palette.border}`,
    borderRadius: '30px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: theme.palette.text.primary,
    minWidth: '235px',
  },
  name:{
    cursor: 'pointer'
  },
  clickable: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.7rem'
  }
}));

export const JobItem = ({ id, name, status}: JobProps) => {

  const classes = useStyles();

  return (
    <Box
      className={classes.workflow}
    >
      <StatusComponent
        status={status}
        icon
      />

      <Tooltip title={name} placement="top">
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
          jobId={id}
          status={status}
        />
      </Box>

    </Box>
  )
}
