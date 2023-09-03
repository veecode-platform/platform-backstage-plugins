import React, { useContext, useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import CachedIcon from '@material-ui/icons/Cached';
import { Box, Button, makeStyles, Tooltip } from '@material-ui/core';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
// import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../../hooks/useEntityAnnotations';
import { entityMock } from '../../../mocks/component';
import { GitlabPipelinesContext } from '../../context/GitlabPipelinesContext';
import { ModalComponent } from '../../ModalComponent/ModalComponent';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';

type JobActionsProps = {
  jobId: number,
  status?: string
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

export const JobActions = ({ jobId, status }: JobActionsProps) => {

  // const { entity } = useEntity();  
  const { projectName } = useEntityAnnotations(entityMock as Entity);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { runJob, jobParams, cancelJob } = useContext(GitlabPipelinesContext);
  const classes = useStyles();
  const errorApi = useApi(errorApiRef);

  if (!status) return null;

  const handleShowModal = () => setShowModal(!showModal);

  const handleStartJob = async () => {
    handleShowModal();
    if (jobParams) await runJob(projectName, jobId, [jobParams]);
  }

  const handleStopJob = async () => await cancelJob(projectName,jobId);

  const handleClickActions = (status: string) => {
    try {
      if (status !== GitlabPipelinesStatus.running) handleStartJob();
      else handleStopJob();
    }
    catch (e: any) {
      errorApi.post(e)
    }
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
      {(status.toLocaleLowerCase() !== GitlabPipelinesStatus.running && status.toLocaleLowerCase() !== GitlabPipelinesStatus.success) &&
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

      {
        showModal && (
          <ModalComponent
            open={showModal}
            title="Run Gitlab Job"
            subtitle={(<Box className={classes.boxInfo}>
              ℹ️ To run a Job you need to define this job as manual,
               according to our documentation and create variables 
               so that you can execute them correctly.
              <Button
                href="https://docs.gitlab.com/ee/ci/variables/index.html#define-a-cicd-variable-in-the-ui"
                className={classes.buttonDocs}
                target='_blank'
              >
                Gitlab Docs
              </Button>
            </Box>)}
            modalType="Job"
            handleModal={handleShowModal}
            handleStartAction={handleStartJob}
          />
        )
      }

    </>
  )
}