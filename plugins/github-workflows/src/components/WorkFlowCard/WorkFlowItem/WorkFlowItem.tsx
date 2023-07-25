import { Box, Tooltip, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { truncateString } from '../../../utils/common';
import { WorkFlowActions } from '../../WorkFlowActions';

type WorkFlowItemProps = {
  id: number,
  workflowName: string,
  conclusion?:string,
  status?: string,
}

const useStyles = makeStyles(theme =>({
    workflow:{
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
    clickable:{
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inProgress:{
      animation: '$spin 2s linear infinite'
    },
    '@keyframes spin':{
      '0%':{
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  }));

export const WorkFlowItem = ({id, status,conclusion, workflowName}:WorkFlowItemProps) => {

  const classes = useStyles();

  return (
    <Box 
      className={classes.workflow}
      >
      <WorkFlowStatus
        status={status}
        conclusion={conclusion ? conclusion : ''}
        icon
      />
      <Tooltip title={workflowName} placement="top">
        <Typography>
          {truncateString(workflowName,13)}
        </Typography>
      </Tooltip>
      <Box
        role="button"
        className={classes.clickable}>
        <WorkFlowActions
            status={status}
            conclusion={conclusion}
            workflowId={id}/>
      </Box>
    </Box>
  )
}
