import {
  Box,
  CircularProgress,
  Fade,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { PullRequestModalProps } from './types';
import { usePullRequestStyles } from './styles';
import { MdClose } from 'react-icons/md';
import { ButtonComponent } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { checkGitProvider } from '../../../utils/helpers/checkGitProvider';
import { ANNOTATION_LOCATION } from '@backstage/catalog-model';
import { useKongServiceManagerContext } from '../../../context';
import { extractGitHubInfo } from '../../../utils/helpers/extractGithubInfo';
import { FeedbackComponent } from '../../shared/FeedbackComponent';
import { addPullRequestResponse, initialPullRequestResponseState, PullRequestResponseReducer } from './state';

export const PullRequestModal: React.FC<PullRequestModalProps> = props => {
  const [title, setTitle] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [ showFeedback, setShowFeedback ] = React.useState<boolean>(false); // false
  const [ pullRequestResponseState, pullRequestResponseDispatch ] = React.useReducer(PullRequestResponseReducer,initialPullRequestResponseState);
  const [ processingData, setProcessingData ] = React.useState<boolean>(false);
  const { specName, show, handleCloseModal } = props;
  const { modalOnBlur,modalContent,modalBody,container,titleBar,titleContent,modalHeader,closeModal,content,pullRequestCard,input,footer,spinner,cancel,submit } = usePullRequestStyles();
  const navigate = useNavigate();
  const { selectedSpecState, pluginsToSpecState, applyKongPluginsToSpec } = useKongServiceManagerContext();
  const location = selectedSpecState?.metadata.annotations?.[
    ANNOTATION_LOCATION
  ] as string;
  const provider = checkGitProvider(location!);

  const writeTitle = () => {
    switch (provider) {
      case 'Github': {
        const { file } = extractGitHubInfo(location);
        return setTitle(`Update to ${file}`);
      }
      default:
        return null;
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const preparatePullRequest = async () => {
    if (pluginsToSpecState) {
      setProcessingData(true)
      const response = await applyKongPluginsToSpec(
        specName as string,
        title,
        message,
        location,
        pluginsToSpecState,
      );

      if (response && response.status === 201) {
        pullRequestResponseDispatch(addPullRequestResponse({
          status: response.status === 201 ? 'success':'error',
          message: response.message,
        }));
        setProcessingData(false)
        setShowFeedback(true);
        setTimeout(()=>{
          setShowFeedback(false);
          handleCloseModal()
        },2500);
      }
    }
  };

  React.useEffect(() => {
    if (provider) {
      writeTitle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  React.useEffect(() => {
    if (pluginsToSpecState.length > 0) {
      const plugins: string[] = pluginsToSpecState.flatMap(item => item.name);
      setMessage(
        `Add/Update Kong plugins to spec: \n\n${plugins
          .map(plugin => `✔️ ${plugin}\n`)
          .join('')}`,
      );
    }
  }, [pluginsToSpecState]);

  return (
  <>
    <Modal
      open={show}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-pull-request-card"
      aria-describedby="modal-modal-create-pull-request"
      className={modalOnBlur}
      closeAfterTransition
    >
      <Fade in={show}>
        <Box className={modalContent}>
          <div className={modalBody}>
            <Paper className={container}>
              <Box className={titleBar}>
                <Typography
                  variant="h6"
                  className={titleContent}
                >{`Commit to ${provider}`}</Typography>
                <div className={modalHeader}>
                  <Tooltip title="Close">
                    <MdClose
                      size={32}
                      className={closeModal}
                      onClick={handleCloseModal}
                    />
                  </Tooltip>
                </div>
              </Box>
              <div className={content}>
                <Box className={pullRequestCard}>
                  <TextField
                    className={input}
                    id="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <TextField
                    className={input}
                    id="message"
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={12}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <div className={footer}>
                    <ButtonComponent 
                      classes={cancel} 
                      handleClick={goBack}
                      isDisabled={processingData}
                      >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent
                      classes={submit}
                      handleClick={preparatePullRequest}
                      isDisabled={processingData}
                    >
                      {processingData ? 
                        (<><CircularProgress className={spinner} size={20} /> Creating ...</>) 
                        : (<>Create Pull Request</>)}                     
                    </ButtonComponent>
                  </div>
                </Box>
              </div>
            </Paper>
          </div>
          {showFeedback && 
            (<FeedbackComponent 
              variant={pullRequestResponseState!.status} 
              message={pullRequestResponseState!.message} 
              />)}
        </Box>
      </Fade>
    </Modal>
   
  </>
  );
};
