import React, { useContext, useEffect, useState } from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, Tooltip } from '@material-ui/core';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import { WorkflowDispatchParameters, WorkflowResultsProps } from '../../utils/types';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../hooks';
import { ModalComponent } from '../ModalComponent';
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { githubWorkflowsTranslationRef } from '../../translation';

type WorkFlowActionsProps = {
    workflowId?: number,
    status?: string,
    conclusion?: string
    parameters?: WorkflowDispatchParameters[] | []
}

const useStyles = makeStyles({
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
  });

export const WorkFlowActions = ({workflowId, status, conclusion, parameters}:WorkFlowActionsProps) => {

    const { entity } = useEntity();  
    const { projectName } = useEntityAnnotations(entity as Entity);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [workFlowSelected, setWorkFlowSelected] = useState<WorkflowResultsProps>();
    const {inputsWorkflowsParams,  workflowsState, setWorkflowsState , handleStartWorkflowRun, handleStopWorkflowRun } = useContext(GithubWorkflowsContext);
    const classes = useStyles();
    const errorApi = useApi(errorApiRef);
    const {t} = useTranslationRef(githubWorkflowsTranslationRef);

    useEffect(() => {
      if (workflowsState) {
        const workFlowFilter = workflowsState.find((w: WorkflowResultsProps) => w.id === workflowId);
        setWorkFlowSelected(workFlowFilter);
      }
    }, [workflowsState, workflowId]);

    if(!status) return null;

    const handleShowModal = () => {
      setShowModal(!showModal)
    }

    const handleStartWorkflow = async () => {
      setWorkflowsState((prevWorkflowsState) => {
        if (prevWorkflowsState) {
          const updatedWorkflows = prevWorkflowsState.map((workflow) => {
            if (workflow.id === workFlowSelected?.id) {
              return {
                ...workflow,
                status: StatusWorkflowEnum.queued,
                conclusion: undefined,
              };
            }
            return workflow;
          });
          return updatedWorkflows;
        }
        return prevWorkflowsState;
      });

      const response = await handleStartWorkflowRun(workFlowSelected?.id as number, projectName);
         if(response){
           setWorkflowsState((prevWorkflowsState) => {
             if (prevWorkflowsState) {
               const updatedWorkflows = prevWorkflowsState.map((workflow) => {
                 if (workflow.id === workFlowSelected?.id) {
                   return {
                     ...workflow,
                     status: response.status,
                     conclusion: response.conclusion,
                     lastRunId: response.id
                   };
                 }
                 return workflow;
               });
               return updatedWorkflows;
             }
             return prevWorkflowsState;
           });
         }
    }

    const handleClickActions = async (statusParams:string) : Promise<void> =>  {
       try{
          if(workFlowSelected){
            switch (statusParams) {
              case StatusWorkflowEnum.completed:
              case StatusWorkflowEnum.success:
              case StatusWorkflowEnum.failure:
              case StatusWorkflowEnum.aborted:
              case StatusWorkflowEnum.skipped:
              case StatusWorkflowEnum.canceled:
              case StatusWorkflowEnum.timeOut:
              case StatusWorkflowEnum.default:
                if(parameters && parameters.length > 0 && !inputsWorkflowsParams){
                  return setShowModal(true)
                }
                return handleStartWorkflow();;
              case StatusWorkflowEnum.inProgress:
                await handleStopWorkflowRun(workFlowSelected.lastRunId as number, projectName);
                setWorkflowsState((prevWorkflowsState) => {
                  if (prevWorkflowsState) {
                    const updatedWorkflows = prevWorkflowsState.map((workflow) => {
                      if (workflow.id === workFlowSelected.id) {
                        return {
                          ...workflow,
                          status: StatusWorkflowEnum.completed,
                          conclusion: StatusWorkflowEnum.canceled,
                        };
                      }
                      return workflow;
                    });
                    return updatedWorkflows;
                  }
                  return prevWorkflowsState;
                });
                return Promise.resolve();;
              default:
                break;
            }
          }
       }
       catch (e:any) {
        errorApi.post(e)
       }
       return Promise.resolve();
    }
    
    return(
      <>
        {status.toLocaleLowerCase() === StatusWorkflowEnum.queued && (
           <Tooltip title={t('actions.tooltip.wait')} placement="right">
           <TimerIcon
             onClick={()=>handleClickActions(StatusWorkflowEnum.queued)}
             />
         </Tooltip>
        )}

        {status.toLocaleLowerCase() === StatusWorkflowEnum.inProgress && (
          <Tooltip title={t('actions.tooltip.stop')} placement="right">
               <RefreshIcon 
                  className={classes.inProgress} 
                  onClick={()=>handleClickActions(StatusWorkflowEnum.inProgress)}
                   />
              </Tooltip>
        )}

        {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.skipped) && (
          <Tooltip title={t('actions.tooltip.tryAgain')} placement="right">
            <HighlightOffIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.skipped)}
            />
          </Tooltip>
        )}

        {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.canceled) && (
          <Tooltip title={t('actions.tooltip.tryAgain')} placement="right">
          <HighlightOffIcon
            onClick={()=>handleClickActions(StatusWorkflowEnum.canceled)}
          />
          </Tooltip>
        )}

        {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.timeOut) && (
          <Tooltip title={t('actions.tooltip.reRun')} placement="right">
            <TimerIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.timeOut)}
            />
          </Tooltip>
        )}

{       (status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.aborted) && (
          <Tooltip title={t('actions.tooltip.reRun')} placement="right">
            <TimerIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.timeOut)}
            />
          </Tooltip>
        )}

        {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.failure) && (
          <Tooltip title={t('actions.tooltip.reRun')} placement="right">
            <ReplayIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.failure)}
            />
          </Tooltip>
        )}

        {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.success) && (
          <Tooltip title={t('actions.tooltip.reRun')} placement="right">
            <SyncIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.success)}
            />
          </Tooltip>
        )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.completed) && (
          <Tooltip title={t('actions.tooltip.reRun')} placement="right">
            <SyncIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.success)}
            />
          </Tooltip>
        )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.default) && (
          <Tooltip title={t('actions.tooltip.runWorkflow')} placement="right">
            <ReplayIcon
              onClick={() => handleClickActions(StatusWorkflowEnum.success)}
            />
          </Tooltip>
        )}

        {
          showModal && (
            <ModalComponent
              open={showModal}
              handleModal={handleShowModal}
              parameters={parameters ? parameters : []}
              handleStartWorkflow={handleStartWorkflow}
            />
          )
        }
        
      </>
    )
}