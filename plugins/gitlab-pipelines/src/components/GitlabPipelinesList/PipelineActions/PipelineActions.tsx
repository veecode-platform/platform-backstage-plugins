import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import CachedIcon from '@material-ui/icons/Cached';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Box, Button, Tooltip } from '@material-ui/core';
import { ModalComponent } from '../../ModalComponent/ModalComponent';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';
import { Pipeline } from '../../../utils/types';
import { useGitlabPipelinesContext } from '../../../context';
import { usePipelineActionsStyles } from './styles';
import { PipelineActionsProps } from './types';


export const PipelineActions : React.FC<PipelineActionsProps> = (props) => {

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { variablesParams, runNewPipeline, cancelPipeline , listAllPipelines, setPipelineListState} = useGitlabPipelinesContext();
  const classes = usePipelineActionsStyles();
  const { status } = props;

  if (!status) return null;

  const handleShowModal = () => setShowModal(!showModal);

  const updateData = async () => {
    const data = await listAllPipelines();
    setPipelineListState(data as Pipeline[]);
  }

  const handleStartPipeline = async () => {
    if (variablesParams) {
      await runNewPipeline(variablesParams);
      await updateData();
    }
  }

  const handleStopPipeline = async () => {
    await cancelPipeline();
    await updateData();
  }

  const handleClickActions = (statusValue: string) => {
      if (statusValue !== GitlabPipelinesStatus.running) handleShowModal();
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