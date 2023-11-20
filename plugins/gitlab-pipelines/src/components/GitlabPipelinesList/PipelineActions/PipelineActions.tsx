import React, { useContext, useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import CachedIcon from '@material-ui/icons/Cached';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Box, Button, makeStyles, Tooltip } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../../hooks';
// import { entityMock } from '../../../mocks/component';
import { GitlabPipelinesContext } from '../../context/GitlabPipelinesContext';
import { ModalComponent } from '../../ModalComponent/ModalComponent';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';
import { Pipeline } from '../../../utils/types';

type PipelineActionsProps = {
  status?: string
}

const useStyles = makeStyles(theme => (({
  button: {
    padding: '0 1.2rem',
    background: theme.palette.info.main,
    minHeight: '46px',
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
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#60a5fa40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export const PipelineActions = ({ status }: PipelineActionsProps) => {

  const { entity } = useEntity();  
  const { projectName } = useEntityAnnotations(entity as Entity);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { variablesParams, runNewPipeline, cancelPipeline , listAllPipelines, setPipelineListState} = useContext(GitlabPipelinesContext);
  const classes = useStyles();

  if (!status) return null;

  const handleShowModal = () => setShowModal(!showModal);

  const updateData = async () => {
    const data = await listAllPipelines(projectName);
    setPipelineListState(data as Pipeline[]);
  }

  const handleStartPipeline = async () => {
    if (variablesParams) {
      await runNewPipeline(projectName, variablesParams);
      await updateData();
    }
  }

  const handleStopPipeline = async () => {
    await cancelPipeline(projectName);
    await updateData();
  }

  const handleClickActions = (status: string) => {
      if (status !== GitlabPipelinesStatus.running) handleShowModal();
      else handleStopPipeline();
  }

  return (
    <>
      {status.toLocaleLowerCase() === GitlabPipelinesStatus.running && (

        <Box
          className={classes.button}
          role="button"
          onClick={() => handleClickActions(status)}
        >
          <p>Cancel Pipeline</p>
          <Tooltip title="Stop" placement="top">
            <RefreshIcon
              className={classes.inProgress}
            />
          </Tooltip>
        </Box>
      )}

      {status.toLocaleLowerCase() === GitlabPipelinesStatus.pending && (

      <Box
        className={classes.button}
        role="button"
        aria-disabled={true}
      >
        <p>Please await ...</p>
        <Tooltip title="await... pending" placement="top">
          <AccessTimeIcon />
        </Tooltip>
      </Box>
      )}
      {(status.toLocaleLowerCase() !== GitlabPipelinesStatus.running
        && status.toLocaleLowerCase() !== GitlabPipelinesStatus.pending 
        && status.toLocaleLowerCase() !== GitlabPipelinesStatus.success) &&
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
              ℹ️ Insert the variables according to the Jobs you want to run.
              <Button
                href="https://docs.gitlab.com/ee/ci/variables/index.html"
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