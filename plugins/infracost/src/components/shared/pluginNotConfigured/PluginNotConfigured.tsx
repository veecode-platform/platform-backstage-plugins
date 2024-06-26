import React from 'react';
import { CodeSnippet, Content, EmptyState, InfoCard } from '@backstage/core-components';
import { Grid, Typography } from '@material-ui/core';
import { PluginNotConfiguredProps } from './types';
import { PLUGIN_DOCS } from '../../../utils/constants/infracost';
import { ANNOTATION_INFRACOST_PROJECT } from '../../../utils/constants/annotations';
import { InfoBox } from '../infoBox';
import { useEntity } from '@backstage/plugin-catalog-react';
import { usePluginNotConfiguredStyles } from './styles';

export const PluginNotConfigured : React.FC<PluginNotConfiguredProps> = (props) => {

    const { url, message } = props;
    const { entity } = useEntity();
    const { annotation } = usePluginNotConfiguredStyles();

    return (
      <Content>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <EmptyState
              title="Infracost not configured"
              missing="field"
              description="Something went wrong, probably your application is not configured to use this plugin..."
              action={
                <>
                  <InfoBox
                    message={
                      message ??
                       <Typography variant="body1">
                           Missing the annotation 
                             <strong className={annotation}>{ANNOTATION_INFRACOST_PROJECT}</strong> 
                             please take a look at our documentation.
                       </Typography>
                    }
                    url={url ?? PLUGIN_DOCS}
                  />
                  <InfoCard title="Configuration">
                       <CodeSnippet 
                         text={`apiVersion: backstage.io/v1alpha1\nkind: ${entity.kind}\nmetadata:\n  name: ${entity.metadata.name}\n  description: ${entity.metadata.description ?? 'example description'}\n  annotations:\n    infracost/project: xxxxxx\n`} 
                         language="yaml" 
                         showCopyCodeButton 
                         />
                  </InfoCard>
                </>
              }
            />
          </Grid>
        </Grid>
      </Content>
    );
}
