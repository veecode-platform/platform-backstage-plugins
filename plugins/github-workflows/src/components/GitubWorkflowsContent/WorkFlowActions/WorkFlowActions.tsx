import React from 'react';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Tooltip } from '@material-ui/core';
import { WorkflowResultsProps } from '../../../utils/types';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { ModalComponent } from '../../ModalComponent';
import { IoMdTime } from "react-icons/io";
import { useWorkflowActionsStyles } from './styles';
import { WorkFlowActionsProps } from './types';
import { useGithuWorkflowsContext } from '../../../context';
import { updateWorkflows } from '../../../context/state';


export const WorkFlowActions: React.FC<WorkFlowActionsProps> = (props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [workFlowSelected, setWorkFlowSelected] = React.useState<WorkflowResultsProps>();
  const { cardsView, workflowsByAnnotation,inputsParamsState, allWorkflowsState, dispatchWorkflows, handleStartWorkflowRun, handleStopWorkflowRun, listAllWorkflows } = useGithuWorkflowsContext();
  const { buttonWait, waitResponse, inProgress } = useWorkflowActionsStyles();
  const errorApi = useApi(errorApiRef);
  const inputs = workflowsByAnnotation ? workflowsByAnnotation : [];
  const { workflowId, status, conclusion, parameters } = props;

  const handleShowModal = React.useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const updateWorkflowState = (workflowIdParam: number) => {
    // eslint-disable-next-line prefer-const
    let intervalId: NodeJS.Timeout;

    const checkWorkflowStatus = async () => {
      await listAllWorkflows( cardsView ? inputs : []);

      if (allWorkflowsState) {
        const workflowNewState = allWorkflowsState.find(w => w.id === workflowIdParam);
        if (workflowNewState) {
          dispatchWorkflows(updateWorkflows(workflowNewState));

          if (workflowNewState.status === StatusWorkflowEnum.completed) {
            clearInterval(intervalId);
          }
        }
      }
    };
    intervalId = setInterval(checkWorkflowStatus, 2000);
  };

  const handleStartWorkflow = async () => {
    if (status === StatusWorkflowEnum.pending || status === StatusWorkflowEnum.queued) return;

    dispatchWorkflows(updateWorkflows({
      ...workFlowSelected,
      status: StatusWorkflowEnum.queued,
      conclusion: undefined,
    } as WorkflowResultsProps));

    const response = await handleStartWorkflowRun(workFlowSelected?.id as number);
    if (response && workFlowSelected && workFlowSelected.id) {
      setTimeout(() => {
        updateWorkflowState(workFlowSelected.id as number);
      }, 10000);
    }
  };

  const handleClickActions = async (statusParams: string): Promise<void> => {
    try {
      if (workFlowSelected) {
        switch (statusParams) {
          case StatusWorkflowEnum.completed:
          case StatusWorkflowEnum.success:
          case StatusWorkflowEnum.failure:
          case StatusWorkflowEnum.aborted:
          case StatusWorkflowEnum.skipped:
          case StatusWorkflowEnum.canceled:
          case StatusWorkflowEnum.timeOut:
          case StatusWorkflowEnum.default:
            if (parameters && parameters.length > 0 && !inputsParamsState) {
              return setShowModal(true);
            }
            return handleStartWorkflow();
          case StatusWorkflowEnum.inProgress:
            await handleStopWorkflowRun(workFlowSelected.lastRunId as number);
            dispatchWorkflows(updateWorkflows({
              ...workFlowSelected,
              status: StatusWorkflowEnum.completed,
              conclusion: StatusWorkflowEnum.canceled,
            } as WorkflowResultsProps));
            return Promise.resolve();
          default:
            break;
        }
      }
    } catch (e: any) {
      errorApi.post(e);
    }
    return Promise.resolve();
  };

  React.useEffect(() => {
    const workFlowFilter = allWorkflowsState.find((w: WorkflowResultsProps) => w.id === workflowId);
    setWorkFlowSelected(workFlowFilter);
  }, [allWorkflowsState, workflowId]);

  if (!status) return null;

  return (
    <>
      {status.toLocaleLowerCase() === StatusWorkflowEnum.queued && (
        <Tooltip title="Please wait" placement="right">
          <button className={buttonWait} disabled>
            <IoMdTime
              className={waitResponse}
              onClick={() => handleClickActions(StatusWorkflowEnum.queued)}
            />
          </button>
        </Tooltip>
      )}

      {status.toLocaleLowerCase() === StatusWorkflowEnum.inProgress && (
        <Tooltip title="Stop" placement="right">
          <RefreshIcon
            className={inProgress}
            onClick={() => handleClickActions(StatusWorkflowEnum.inProgress)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.skipped) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.skipped)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.canceled) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.canceled)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.timeOut) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.timeOut)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.aborted) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.aborted)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.failure) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.failure)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.success) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.success)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.completed) && (
        <Tooltip title="Run Workflow" placement="right">
          <SyncIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.success)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.default) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.default)}
          />
        </Tooltip>
      )}

      {showModal && (
        <ModalComponent
          open={showModal}
          handleModal={handleShowModal}
          parameters={parameters ? parameters : []}
          handleStartWorkflow={handleStartWorkflow}
        />
      )}
    </>
  );
};
