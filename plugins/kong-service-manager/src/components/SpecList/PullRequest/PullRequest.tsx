import React from 'react'
import { usePullRequestStyles } from './styles'
import { useKongServiceManagerContext } from '../../../context';
import { BoxComponent, ButtonComponent } from '../../shared';
import { ANNOTATION_LOCATION } from '@backstage/catalog-model';
import { checkGitProvider } from '../../../utils/helpers/checkGitProvider';
import { useParams } from 'react-router-dom';
import { Box, TextField } from '@material-ui/core';
import { Content } from '@backstage/core-components';
import { extractGitHubInfo } from '../../../utils/helpers/extractGithubInfo';
import { useNavigate } from 'react-router-dom';

export const PullRequest = () => {
  
  const [title, setTitle] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const { specName } = useParams();
  const { root, pullRequestCard,input, cancel,submit, footer } = usePullRequestStyles();
  const { selectedSpecState, pluginsToSpecState,applyKongPluginsToSpec } = useKongServiceManagerContext();
  const location  = selectedSpecState?.metadata.annotations?.[ANNOTATION_LOCATION] as string;
  const provider = checkGitProvider(location!);
  const navigate = useNavigate();

  const writeTitle = ()  => {
      switch(provider){
        case 'Github':
          {
            const { file } = extractGitHubInfo(location)
            return setTitle(`Update to ${file}`)
          }
        default:
          return null
      }
  }

  const goBack = () => {
    navigate(-1)
  }

  const preparatePullRequest = ()=>{
   if(pluginsToSpecState){
    applyKongPluginsToSpec(specName as string,title,message,location,pluginsToSpecState)
   }
  }

  React.useEffect(()=>{
    if(provider){
      writeTitle()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[provider])

  React.useEffect(()=>{
    if(pluginsToSpecState.length > 0){
      const plugins : string[] = pluginsToSpecState.flatMap(item => item.name);
      setMessage(`Add/Update Kong plugins to spec: \n\n${plugins.map(plugin => `✔️ ${plugin}\n`).join('')}`)
    }
  },[pluginsToSpecState])

  return (
    <BoxComponent title={`Commit to ${provider}`} goBack noSelectInstance>
      <Content className={root}>
        <Box className={pullRequestCard}>
          <TextField 
           className={input}
           id="title" 
           label="Title" 
           variant="outlined" 
           fullWidth  
           value={title} 
           onChange={(e) => setTitle(e.target.value)} 
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
           onChange={(e) => setMessage(e.target.value)} 
           />
          <div className={footer}>
            <ButtonComponent
              classes={cancel}
              handleClick={goBack}
             > 
             Cancel
            </ButtonComponent>
            <ButtonComponent
              classes={submit}
              handleClick={preparatePullRequest}
             > 
              Create Pull Request
            </ButtonComponent>
          </div>
        </Box>
      </Content>
    </BoxComponent>
  )
}
