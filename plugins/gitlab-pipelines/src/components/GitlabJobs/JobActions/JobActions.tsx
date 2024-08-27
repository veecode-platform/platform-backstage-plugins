import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Tooltip } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../../hooks';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useGitlabPipelinesContext } from '../../../context';
import { JobActionsProps } from './types';
import { useJobActionsStyles } from './styles';


export const JobActions : React.FC<JobActionsProps> = (props) => {

  const { entity } = useEntity();  
  const { projectName } = useEntityAnnotations(entity as Entity);
  const { runNewPipeline, cancelPipeline, jobsByAnnotation, setJobsByAnnotation } = useGitlabPipelinesContext();
  const { inProgress } = useJobActionsStyles();
  const { id, variable, status } = props;

  if (!status) return null;

  const updateData = async () => {
      setTimeout(()=>{
        const updatedJobs = jobsByAnnotation!.map(job => {
          if (job.id === id) {
            return {
              ...job,
              status: GitlabPipelinesStatus.success,
            };
          }
          return job;
        });
        setJobsByAnnotation(updatedJobs);
      },15000)
  }

  const handleStartJob = async () => {
    if (variable) {
      const variableParam = {
        key: variable,
        value: 'true'
      }
      runNewPipeline(projectName, [variableParam]);
      const updatedJobs = jobsByAnnotation!.map(job => {
        if (job.id === id) {
          return {
            ...job,
            status: GitlabPipelinesStatus.running,
          };
        }
        return job;
      });
      setJobsByAnnotation(updatedJobs);
      await updateData()
    }
  }

  const handleStopJob = async () => {
    await cancelPipeline(projectName);
    const updatedJobs = jobsByAnnotation!.map(job => {
      if (job.id === id) {
        return {
          ...job,
          status: GitlabPipelinesStatus.canceled,
        };
      }
      return job;
    });
    setJobsByAnnotation(updatedJobs); 
    // await updateData();
  };

  const handleClickActions = (statusValue: string) => {
    if (statusValue !== GitlabPipelinesStatus.running) handleStartJob();
    else handleStopJob();
  }

  return (
    <>
      {status.toLocaleLowerCase() === GitlabPipelinesStatus.running && (
          <Tooltip title="Stop" placement="top">
            <RefreshIcon
              onClick={() => handleClickActions(GitlabPipelinesStatus.running)}
              className={inProgress}
            />
          </Tooltip>
      )}
      {status.toLocaleLowerCase() === GitlabPipelinesStatus.pending && (
          <Tooltip title="please wait" placement="top">
            <AccessTimeIcon />
          </Tooltip>
      )}
      
      {(status.toLocaleLowerCase() !== GitlabPipelinesStatus.running 
       && status.toLocaleLowerCase() !== GitlabPipelinesStatus.pending 
       && status.toLocaleLowerCase() !== GitlabPipelinesStatus.success
       && status.toLocaleUpperCase() !== GitlabPipelinesStatus.canceled
       ) &&
        (

          <Tooltip title="Run" placement="top">
            <PlayArrowIcon
              onClick={() => handleClickActions(status)}
            />
          </Tooltip>
        )
      }
      {(status.toLocaleLowerCase() === GitlabPipelinesStatus.success) &&
        (

          <Tooltip title="Run" placement="top">
            <PlayArrowIcon
              onClick={() => handleClickActions(status)}
            />
          </Tooltip>

        )
      }

    </>
  )
}