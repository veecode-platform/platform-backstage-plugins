import React, { useContext } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles, Tooltip } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../../hooks';
// import { entityMock } from '../../../mocks/component';
import { GitlabPipelinesContext } from '../../context/GitlabPipelinesContext';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

type JobActionsProps = {
  id: string,
  variable: string,
  status: string
}

const useStyles = makeStyles(theme => (({
  button: {
    padding: '0 1.2rem',
    background: theme.palette.info.main,
    borderRadius: '5px',
    fontSize: '.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: '#F5F5F5',
    cursor: 'pointer'
  },
  inProgress: {
    animation: '$spin 2s linear infinite'
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  boxInfo: {
    padding: '1rem',
    fontSize: '12px',
    borderRadius: '8px',
    background: '#60a5fa40',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '.5rem'
  },
  buttonDocs: {
    alignSelf: 'flex-end',
    background: '#f5f5f5',
    color: '#151515',
    fontSize: '10px',
    '&:hover': {
      background: '#f5f5f5'
    }
  }
})));

export const JobActions = ({ id, variable, status }: JobActionsProps) => {

  const { entity } = useEntity();  
  const { projectName } = useEntityAnnotations(entity as Entity);
  const { runNewPipeline, cancelPipeline, jobsByAnnotation, setJobsByAnnotation } = useContext(GitlabPipelinesContext);
  const classes = useStyles();

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

  const handleClickActions = (status: string) => {
    if (status !== GitlabPipelinesStatus.running) handleStartJob();
    else handleStopJob();
  }

  return (
    <>
      {status.toLocaleLowerCase() === GitlabPipelinesStatus.running && (
          <Tooltip title="Stop" placement="top">
            <RefreshIcon
              onClick={() => handleClickActions(GitlabPipelinesStatus.running)}
              className={classes.inProgress}
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

          <Tooltip title="Run Again" placement="top">
            <CachedIcon
              onClick={() => handleClickActions(status)}
            />
          </Tooltip>

        )
      }

    </>
  )
}