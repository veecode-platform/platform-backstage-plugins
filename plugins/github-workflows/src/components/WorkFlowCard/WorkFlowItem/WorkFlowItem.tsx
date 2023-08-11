import { Box, Tooltip, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { truncateString } from '../../../utils/common';
import { WorkFlowActions } from '../../WorkFlowActions';
import { WorkflowDispatchParameters } from '../../../utils/types';
import SettingsIcon from '@material-ui/icons/Settings';
import { ModalComponent } from '../../ModalComponent';
import { useNavigate } from 'react-router-dom';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';

type WorkFlowItemProps = {
  id: number,
  workflowName: string,
  conclusion?: string,
  status?: string,
  parameters?: WorkflowDispatchParameters[] | [],
  lastRunId?: string
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

export const WorkFlowItem = ({ id, status, conclusion, workflowName, parameters, lastRunId }: WorkFlowItemProps) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCICDLogs = (id:string) => {
    navigate(`ci-cd/${id}`)
  }

  return (
    <>
      <Box
        className={classes.workflow}
      >
        <WorkFlowStatus
          status={status}
          conclusion={conclusion ? conclusion : ''}
          icon
        />

        <Tooltip title={workflowName} placement="top">
            <Typography 
              onClick={()=>handleCICDLogs(lastRunId as string)}
              className={classes.name}
              >
              {truncateString(workflowName, 13)}
            </Typography>
        </Tooltip>

        <Box
          role="button"
          className={classes.clickable}>

          {(parameters && parameters?.length > 0 && status !== StatusWorkflowEnum.queued) && (
              <Tooltip title={"Add Parameters"} placement="top">
                  <Box
                    role="button"
                    className={classes.clickable}
                    onClick={handleShowModal}
                  >
                    <SettingsIcon />
                  </Box>
                </Tooltip>) }

            <WorkFlowActions
              status={status}
              conclusion={conclusion}
              workflowId={id} 
              parameters={parameters}
              />
        </Box>

      </Box>

      {
        showModal && (
          <ModalComponent
            open={showModal}
            handleModal={handleShowModal}
            parameters={parameters ? parameters : []}
          />
        )
      }
    </>
  )
}
