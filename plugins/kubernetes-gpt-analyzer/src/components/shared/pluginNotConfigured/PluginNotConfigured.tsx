import React from 'react';
import { Content, EmptyState } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import { InfoBox } from '../../shared';
import { PluginNotConfiguredProps } from './types';
import { PLUGIN_DOCS } from '../../../utils/constants/docs';

export const PluginNotConfigured : React.FC<PluginNotConfiguredProps> = (props) => {

    const { message, url } = props;

    return (
      <Content>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <EmptyState
              title="Kubernetes GPT Analyzer not configured"
              missing="info"
              description="Something went wrong, probably your application is not configured to use this plugin..."
              action={
                <InfoBox
                  message={
                    message ??
                    'The Plugin is not configured, please take a look at our documentation to configure it correctly.'
                    }
                    url={url ?? PLUGIN_DOCS}
                    />
              }
            />
          </Grid>
        </Grid>
      </Content>
    );
}
