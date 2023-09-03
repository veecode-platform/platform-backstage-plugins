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

type PipelineActionsProps = {
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
    background: '#60a5fa40'
  },
  buttonDocs: {
    background: '#f5f5f5',
    color: '#151515',
    margin: '1rem .5rem .5rem .5rem',
    fontSize: '10px',
    '&:hover': {
      background: '#f5f5f5'
    }
  }
})));

export const PipelineActions = ({ status }: PipelineActionsProps) => {

  // const { entity } = useEntity();  
  const { projectName } = useEntityAnnotations(entityMock as Entity);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { triggerToken, runPipelineWithTrigger, cancelPipeline } = useContext(GitlabPipelinesContext);
  const classes = useStyles();
  const errorApi = useApi(errorApiRef);

  if (!status) return null;

  const handleShowModal = () => setShowModal(!showModal);

  const handleStartPipeline = async () => {
    handleShowModal();
    if (triggerToken) await runPipelineWithTrigger(projectName, triggerToken);
  }

  const handleStopPipeline = async () => await cancelPipeline(projectName);

  const handleClickActions = (status: string) => {
    try {
      if (status !== GitlabPipelinesStatus.running) handleStartPipeline();
      else handleStopPipeline();
    }
    catch (e: any) {
      errorApi.post(e)
    }
  }

  return (
    <>
      {status.toLocaleLowerCase() === GitlabPipelinesStatus.running && (

        <Box
          className={classes.button}
          role="button"
          onClick={() => handleClickActions(GitlabPipelinesStatus.running)}
        >
          <p>Cancel Pipeline</p>
          <Tooltip title="Stop" placement="top">
            <RefreshIcon
              className={classes.inProgress}
            />
          </Tooltip>
        </Box>
      )}
      {(status.toLocaleLowerCase() !== GitlabPipelinesStatus.running && status.toLocaleLowerCase() !== GitlabPipelinesStatus.success) &&
        (
          <Box
            className={classes.button}
            onClick={() => handleClickActions(status)}
            role="button"
          >
            <p>Run Pipeline</p>
            <Tooltip title="Run" placement="top">
              <PlayArrowIcon />
            </Tooltip>
          </Box>
        )
      }
      {(status.toLocaleLowerCase() === GitlabPipelinesStatus.success) &&
        (
          <Box
            className={classes.button}
            onClick={() => handleClickActions(status)}
            role="button"
          >
            <p>Run Pipeline</p>
            <Tooltip title="Run Again" placement="top">
              <CachedIcon />
            </Tooltip>
          </Box>
        )
      }

      {
        showModal && (
          <ModalComponent
            open={showModal}
            title="Run Gitlab Pipeline"
            subtitle={(<Box className={classes.boxInfo}>
              ℹ️ In order to get your pipeline running, you need to set a token in the
              Trigger Pipelines section of your Gitlab. If you haven't already,
              here's how to do it:
              <Button
                href="https://docs.gitlab.com/ee/ci/triggers/index.html"
                className={classes.buttonDocs}
                target='_blank'
              >
                Gitlab Docs
              </Button>
            </Box>)}
            modalType="Pipeline"
            handleModal={handleShowModal}
            handleStartAction={handleStartPipeline}
          />
        )
      }

    </>
  )
}