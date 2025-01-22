import React from 'react';
import { Typography,  Paper, Box } from '@material-ui/core';
import { useZoraWrapperStyles } from './styles';
import { ClusterIssuesTableComponent } from './clusterIssues/clusterIssuesTableComponent';
import { ZoraLogo } from "../../assets/logo";
import { ClusterVulnerabilitiesTableComponent } from './clusterVulnerabilities/clusterVulnerabilitiesTableComponent';
import { useEntity } from '@backstage/plugin-catalog-react';


export const ExampleComponent = () => {
  const { container,  titleBar } = useZoraWrapperStyles();
  const { entity } = useEntity();

  const clusterName = entity?.metadata.annotations?.['veecode/cluster-name'] || entity.metadata?.name;

  return (
    <div style={{ padding: "24px" }}>
      <Paper className={container}>
        <Box className={titleBar}>
          <ZoraLogo />
          <Typography variant="h6">Zora OSS</Typography>
        </Box>

        <Box style={{ padding: "24px" }}>
          <Typography style={{ marginBottom: "8px" }} variant='h5'>Summary</Typography>

          <Box>
            <Paper style={{padding: "1rem"}}>
            <Typography style={{ marginBottom: "8px" }} variant='h6'>Cluster name: {clusterName}</Typography>
            </Paper>
          </Box>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
            <ClusterVulnerabilitiesTableComponent clusterName={clusterName}/>
            <ClusterIssuesTableComponent clusterName={clusterName}/>
          </div>
        </Box>
      </Paper>
    </div>

  )
}

