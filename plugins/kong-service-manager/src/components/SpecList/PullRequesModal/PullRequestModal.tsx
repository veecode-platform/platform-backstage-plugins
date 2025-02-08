import {Box,CircularProgress,Fade,Modal,Paper,TextField,Tooltip,Typography} from '@material-ui/core';
import React from 'react';
import { PullRequestModalProps } from './types';
import { usePullRequestStyles } from './styles';
import { MdClose } from 'react-icons/md';
import { ButtonComponent } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { checkGitProvider } from '../../../utils/helpers/checkGitProvider';
import { ANNOTATION_LOCATION } from '@backstage/catalog-model';
import { useKongServiceManagerContext } from '../../../context';
import { FeedbackComponent } from '../../shared/FeedbackComponent';
import { addPullRequestResponse, initialPullRequestResponseState, PullRequestResponseReducer } from './state';
import { PullRequestResponse } from '../../../utils/types';
import { HttpMethod } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { transformPath } from '../../../utils/helpers/transformPath';


export const PullRequestModal: React.FC<PullRequestModalProps> = props => {
  const [title, setTitle] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [ showFeedback, setShowFeedback ] = React.useState<boolean>(false);
  const [ pullRequestResponseState, pullRequestResponseDispatch ] = React.useReducer(PullRequestResponseReducer,initialPullRequestResponseState);
  const [ processingData, setProcessingData ] = React.useState<boolean>(false);
  const { show, handleCloseModal,route } = props;
  const { modalOnBlur,modalContent,modalBody,container,titleBar,titleContent,modalHeader,closeModal,content,pullRequestCard,input,footer,spinner,cancel,submit } = usePullRequestStyles();
  const navigate = useNavigate();
  const { entity, kongSpecs, pluginsToSpecState,applyKongServicePluginsToSpec,applyKongRoutePluginsToSpec } = useKongServiceManagerContext();
  const location = entity?.metadata.annotations?.[
    ANNOTATION_LOCATION
  ] as string;
  const provider = checkGitProvider(location!);

  const goBack = () => navigate(-1);

  const preparatePullRequest = async () => {
    if (pluginsToSpecState && kongSpecs) {
      setProcessingData(true)
      let response : PullRequestResponse;
      if(route) {
        response = await applyKongRoutePluginsToSpec(
          kongSpecs[0] as string,
          title,
          message,
          location,
          route.path,
          route.method.toLowerCase() as HttpMethod,
          pluginsToSpecState,
        );
      }
      else{
        response = await applyKongServicePluginsToSpec(
          kongSpecs[0] as string,
          title,
          message,
          location,
          pluginsToSpecState,
        );
      }

      if (response) {
        pullRequestResponseDispatch(addPullRequestResponse({
          status: response.status === 201 ? 'success':'error',
          message: response.message,
        }));
        setShowFeedback(true);
        setTimeout(()=>{
          setShowFeedback(false);
          handleCloseModal()
        },3000);
      }

    }
  };

  React.useEffect(() => {
    if (provider) {
     setTitle(`Update to ${kongSpecs![0] as string}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kongSpecs]);

  React.useEffect(() => {
    if (pluginsToSpecState.length > 0) {
      const plugins: string[] = pluginsToSpecState.flatMap(item => item.name);
      if(route){
        setMessage(
          `Add/Update Kong plugins to path: ${transformPath(route.path)}, method: ${route.method.toString()} \n\n${plugins
            .map(plugin => `✔️ ${plugin}\n`)
            .join('')}`,
        );
      }
      else {
        setMessage(
          `Add/Update Kong plugins to spec: \n\n${plugins
            .map(plugin => `✔️ ${plugin}\n`)
            .join('')}`,
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
