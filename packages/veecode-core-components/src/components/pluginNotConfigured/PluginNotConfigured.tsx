import React from 'react';
import { Content } from '@backstage/core-components';
import { Grid, Typography } from '@mui/material';
import { InfoBox } from '../infoBox/InfoBox';
import { makeStyles } from '@mui/styles';
import { themeVariables } from '../../utils/constants/themeVariables';
import { PluginNotConfiguredIcon } from '../../icons/plugin-not-configured-icon';

export interface PluginNotConfiguredProps {
    pluginName: string,
    message: string,
    url: string
}

const usePluginNotConfiguredStyles = makeStyles({
    content: {
        backgroundColor: themeVariables.background.main,
        padding: '2rem'
    },
    messageText:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '.5rem',
        color: themeVariables.colors.white
    }
})

export const PluginNotConfigured : React.FC<PluginNotConfiguredProps> = ({ pluginName,message, url }) => {
    
    const { content,messageText } = usePluginNotConfiguredStyles();

    return (
      <Content>
        <Grid container spacing={2}>
          <Grid container className={content}>
            <Grid className={messageText}>
              <Typography variant="h5">{pluginName}</Typography>
              <Typography variant="body1">
                Something went wrong, probably your application is not
                configured to use this plugin...
              </Typography>
              <InfoBox.Root>
                <InfoBox.Message
                  message={
                    message ??
                    'The Plugin is not configured, please take a look at our documentation to configure it correctly.'
                  }
                />
                <InfoBox.Docs url={url} />
              </InfoBox.Root>
            </Grid>
            <Grid>
              <PluginNotConfiguredIcon />
            </Grid>
          </Grid>
        </Grid>
      </Content>
    );
}
