import React from 'react';
import { CodeSnippet, Content, EmptyState, InfoCard } from "@backstage/core-components"
import { Grid } from "@material-ui/core"
import { InfoBox } from "../../shared"
import { truncateMessage } from "../../../utils/helpers/truncateMessage"
import { ClusterNotConfiguredProps } from './types';

export const ClusterNotConfigured : React.FC<ClusterNotConfiguredProps> = (props) => {

    const { error } = props;

    return (
        <Content>
        <Grid container spacing={2}>
          <InfoBox
            message={truncateMessage(error?.stack as string) ?? "The cluster information could not be loaded. Possible reason: the cluster has been paused or is slow...."}
            url="https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/cluster-explorer"
          />
          <Grid item lg={12} md={12} xs={12}>
            <EmptyState
              title="Cluster not configured"
              missing="field"
              description="You need to add the settings for this cluster to the application's configuration files, like this:"
              action={
                <>
                  <InfoCard title="Configuration">
                       <CodeSnippet 
                         text={`kubernetes:\n  serviceLocatorMethod:\n    type: multiTenant\n  clusterLocatorMethods:\n   - type: "config"\n     clusters:\n       - url: $KUBERNETES_URL\n         name: $NAME\n         authProvider: serviceAccount\n         skipTLSVerify: false\n         skipMetricsLookup: false\n         skipMetricsLookup: false\n         serviceAccountToken: $KUBERNETES_SERVICE_ACCOUNT_TOKEN\n         caData: $KUBERNETES_CERTIFICATE_DATA`} 
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
    )
}