import React from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { truncateString } from '../../../../utils/helpers';
import { WorkFlowActions } from '../../WorkFlowActions';
import SettingsIcon from '@material-ui/icons/Settings';
import { ModalComponent } from '../../../ModalComponent';
import { StatusWorkflowEnum } from '../../../../utils/enums/WorkflowListEnum';
import { WorkFlowItemProps } from './types';
import { useWorkflowItemStyles } from './styles';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { useGithuWorkflowsContext } from '../../../../context';
import { WorkflowAnnotation } from '../../../../utils/types';

export const WorkFlowItem: React.FC<WorkFlowItemProps> = (props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { entity, workflowsByAnnotation } = useGithuWorkflowsContext();
  const classes = useWorkflowItemStyles();
  const { id, status, conclusion, workflowName, parameters, lastRunId, path } = props;

  const workflow = (path && workflowsByAnnotation)
    ? workflowsByAnnotation.find((w: WorkflowAnnotation) => w.workflow && path.includes(w.workflow as string))
    : undefined;

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCICDLogs = (paramsId: string) => {
    const baseUrl = window.location.origin;
    const newUrl = `${baseUrl}/catalog/${entity.metadata.namespace}/${entity.kind.toLowerCase()}/${entity.metadata.name}/ci-cd/${paramsId}`;
    window.location.href = newUrl;
  };

  return (
    <>
      <Box className={classes.workflow}>
        <WorkFlowStatus
          status={status}
          conclusion={conclusion ? conclusion : ''}
          icon
        />

        <Tooltip title={workflow?.tooltip ?? workflowName} placement="top">
          <Typography
            onClick={() => handleCICDLogs(lastRunId as string)}
            className={classes.name}
          >
            {truncateString(workflow?.label ?? workflowName, 12)}
          </Typography>
        </Tooltip>

        <Box role="button" className={classes.clickable}>
          {parameters &&
          parameters.length > 0 &&
          status !== StatusWorkflowEnum.queued ? (
            <Tooltip title="Add Parameters" placement="top">
              <Box
                role="button"
                className={classes.clickable}
                onClick={handleShowModal}
              >
                <SettingsIcon />
              </Box>
            </Tooltip>
          ) : (
            <WorkFlowActions
              status={status}
              conclusion={conclusion}
              workflowId={id}
              parameters={parameters}
            />
          )}
        </Box>
      </Box>

      {showModal && (
        <ModalComponent
          open={showModal}
          handleModal={handleShowModal}
          parameters={parameters ? parameters : []}
        />
      )}
    </>
  );
};
