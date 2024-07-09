import { Box, Tooltip, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { WorkFlowStatus } from '../../../WorkFlowStatus';
import { truncateString } from '../../../../utils/helpers';
import { WorkFlowActions } from '../../../WorkFlowActions';
import SettingsIcon from '@material-ui/icons/Settings';
import { ModalComponent } from '../../../ModalComponent';
import { StatusWorkflowEnum } from '../../../../utils/enums/WorkflowListEnum';
import { useEntity } from '@backstage/plugin-catalog-react';
import { WorkFlowItemProps } from '../types';

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

export const WorkFlowItem : React.FC<WorkFlowItemProps> = ({ id, status, conclusion, workflowName, parameters, lastRunId }) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const classes = useStyles();
  const { entity } = useEntity();

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCICDLogs = (paramsId:string) => {
    const baseUrl = window.location.origin;
    const newUrl = `${baseUrl}/catalog/${entity.metadata.namespace}/${entity.kind.toLowerCase()}/${entity.metadata.name}/ci-cd/${paramsId}`;
    window.location.href = newUrl;
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
              {truncateString(workflowName, 12)}
            </Typography>
        </Tooltip>

        <Box
          role="button"
          className={classes.clickable}>

          {(parameters && parameters?.length > 0 && status !== StatusWorkflowEnum.queued) && (
              <Tooltip title="Add Parameters" placement="top">
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
