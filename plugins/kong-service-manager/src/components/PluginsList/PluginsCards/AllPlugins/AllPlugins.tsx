import React from 'react';
import { PluginsPerCategoryType } from '../PluginsCards';
import {Box,Typography,} from '@material-ui/core';
import { ItemCardGrid } from '@backstage/core-components';
import { useStyles } from '../styles';
import { CardComponent } from '../CardComponent';

interface AllPluginsProps {
  plugins: PluginsPerCategoryType;
}

export const AllPlugins = ({ plugins }: AllPluginsProps) => { 

  const { } = useStyles();

  return (
    <>
      {plugins.ai.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">AI</Typography>
          <ItemCardGrid>
            {plugins.ai.plugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.analitics.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Analitics & Monitoring</Typography>
          <ItemCardGrid>
            {plugins.analitics.plugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.auth.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Authentication</Typography>
          <ItemCardGrid>
            {plugins.auth.plugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.logging.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Logging</Typography>
          <ItemCardGrid>
            {plugins.logging.plugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.security.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Security</Typography>
          <ItemCardGrid>
            {plugins.security.plugins.map(c => (
              <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.serverless.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Serverless</Typography>
          <ItemCardGrid>
            {plugins.serverless.plugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.trafficControl.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Traffic Control</Typography>
          <ItemCardGrid>
            {plugins.trafficControl.plugins.map(c => (
             <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.transformations.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Transformations</Typography>
          <ItemCardGrid>
            {plugins.transformations.plugins.map(c => (
            <CardComponent data={c}/>
            ))}
          </ItemCardGrid>
        </Box>
      )}
    </>
  );
};
