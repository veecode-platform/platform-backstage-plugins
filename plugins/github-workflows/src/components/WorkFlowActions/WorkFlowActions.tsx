import React, { useContext, useEffect, useState } from 'react'
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, Tooltip } from '@material-ui/core';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import { WorkflowResultsProps } from '../../utils/types';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../hooks';

type WorkFlowActionsProps = {
    workflowId?: number,
    status?: string,
    conclusion?: string
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

export const WorkFlowActions = ({workflowId, status, conclusion}:WorkFlowActionsProps) => {

    const { entity } = useEntity();  
    const { projectName } = useEntityAnnotations(entity as Entity);
    const [workFlowSelected, setWorkFlowSelected] = useState<WorkflowResultsProps>();
    const { branch, workflowsState ,handleStartWorkflowRun, handleStopWorkflowRun } = useContext(GithubWorkflowsContext);
    const classes = useStyles();
    const errorApi = useApi(errorApiRef);

    if(!status) return null;

    useEffect(() => {
      if (workflowsState) {
        const workFlowFilter = workflowsState.find((w: WorkflowResultsProps) => w.id === workflowId);
        setWorkFlowSelected(workFlowFilter);
      }
    }, [workflowsState, workflowId]);

    const handleClickActions = async (status:string) => {
       try{
          if(workFlowSelected){
            switch (status) {
              case StatusWorkflowEnum.completed:
              case StatusWorkflowEnum.failure:
              case StatusWorkflowEnum.aborted:
              case StatusWorkflowEnum.skipped:
              case StatusWorkflowEnum.canceled:
              case StatusWorkflowEnum.timeOut:
              case StatusWorkflowEnum.default:
                await handleStartWorkflowRun( workFlowSelected.id as number, projectName,  branch!);
                return;
              case StatusWorkflowEnum.inProgress:
                await handleStopWorkflowRun(workFlowSelected.lastRunId as number, projectName);
                return;
              default:
                break;
            }
          }
       }
       catch (e:any) {
        errorApi.post(e)
       }
    }
    
    switch (status.toLocaleLowerCase()) {
        case StatusWorkflowEnum.queued:
            return (
              <Tooltip title="Please wait" placement="right">
                <TimerIcon
                  onClick={()=>handleClickActions(StatusWorkflowEnum.queued)}
                  />
              </Tooltip>
            );
        case StatusWorkflowEnum.inProgress:
            return (
              <Tooltip title="Stop" placement="right">
               <RefreshIcon 
                  className={classes.inProgress} 
                  onClick={()=>handleClickActions(StatusWorkflowEnum.inProgress)}
                   />
              </Tooltip>
            )
        case StatusWorkflowEnum.completed:
            switch (conclusion?.toLocaleLowerCase()){
                case StatusWorkflowEnum.skipped:
                    return (
                    <Tooltip title="Try again" placement="right">
                    <HighlightOffIcon
                      onClick={()=>handleClickActions(StatusWorkflowEnum.skipped)}
                     />
                    </Tooltip>);
                case StatusWorkflowEnum.canceled:
                    return (
                    <Tooltip title="Try again" placement="right">
                    <HighlightOffIcon
                      onClick={()=>handleClickActions(StatusWorkflowEnum.canceled)}
                    />
                    </Tooltip>);
                case StatusWorkflowEnum.timeOut:
                    return  (
                    <Tooltip title="Re-run" placement="right">
                      <TimerIcon
                       onClick={()=>handleClickActions(StatusWorkflowEnum.timeOut)}
                      />
                    </Tooltip>
                    );
                case StatusWorkflowEnum.failure:
                    return ( 
                      <Tooltip title="Re-run" placement="right">
                        <ReplayIcon
                         onClick={()=>handleClickActions(StatusWorkflowEnum.failure)}
                         />
                      </Tooltip>
                      );
                default:
                return (
                  <Tooltip title="Re-run" placement="right">
                    <SyncIcon
                     onClick={()=>handleClickActions(StatusWorkflowEnum.default)}
                     /> 
                  </Tooltip>
                );              
        }
        default: 
            return (<Tooltip title="Is pending, wait..." placement="right">
              <TimerIcon/>
              </Tooltip>);
    }
}
