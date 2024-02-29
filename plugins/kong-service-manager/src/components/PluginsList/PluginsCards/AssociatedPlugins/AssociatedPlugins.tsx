import React from 'react';
import { PluginCard, PluginsPerCategoryType } from '../PluginsCards';
import { Box, Typography } from '@material-ui/core';
import { ItemCardGrid } from '@backstage/core-components';
import { useStyles } from '../styles';
import { CardComponent } from '../CardComponent';


interface associatedPluginsProps {
  plugins: PluginsPerCategoryType;
}

const getPlugins = (data:PluginCard[]|[]) => {
  if(data.length >=1){
    const pluginsAvaliable : PluginCard[] = [];
    data.forEach(i => {
      if(i.associated) pluginsAvaliable.push(i)
    });
  return pluginsAvaliable;
  }
  return []
}

export const AssociatedPlugins = ({ plugins }: associatedPluginsProps) => { 

  const { } = useStyles();

  const aiPlugins = getPlugins(plugins.ai.plugins);
  const analiticsPlugins = getPlugins(plugins.analitics.plugins);
  const authPlugins = getPlugins(plugins.auth.plugins);
  const loggingPlugins = getPlugins(plugins.logging.plugins);
  const securityPlugins = getPlugins(plugins.security.plugins);
  const serverlessPlugins = getPlugins(plugins.serverless.plugins);
  const trafficControlPlugins = getPlugins(plugins.trafficControl.plugins);
  const transformationsPlugins = (plugins.transformations.plugins);

  return (
    <>
      {(aiPlugins.some(c => c.associated) && aiPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">AI</Typography>
          <ItemCardGrid>
            {aiPlugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(analiticsPlugins.some(c => c.associated) && analiticsPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Analitics & Monitoring</Typography>
          <ItemCardGrid>
            {analiticsPlugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(authPlugins.some(c => c.associated) && authPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Authentication</Typography>
          <ItemCardGrid>
            {authPlugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(loggingPlugins.some(c => c.associated) && loggingPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Logging</Typography>
          <ItemCardGrid>
            {loggingPlugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(securityPlugins.some(c => c.associated) && securityPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Security</Typography>
          <ItemCardGrid>
            {securityPlugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(serverlessPlugins.some(c => c.associated) && serverlessPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Serverless</Typography>
          <ItemCardGrid>
            {serverlessPlugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {(trafficControlPlugins.some(c => c.associated) && trafficControlPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Traffic Control</Typography>
          <ItemCardGrid>
            {trafficControlPlugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      { (transformationsPlugins.some(c => c.associated)  && transformationsPlugins.length >= 1 )&& (
        <Box>
          <Typography variant="h6">Transformations</Typography>
          <ItemCardGrid>
            {transformationsPlugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
    </>
  );
};
