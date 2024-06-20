/* eslint-disable no-console */
import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useKubernetesResults } from '../../hooks/useKubernetesResults';
import { useKubernetesGPTAnalyzerHomepageStyles } from './styles';
import { LoadingProgress } from '../shared';
import { SuccessfulAnalysis } from './SuccessfulAnalysis';
import { ErrorAnalysis } from './ErrorAnalysis';
import KubernetesIcon from '../../assets/kubernetesIcon';
import { useEntity } from '@backstage/plugin-catalog-react';
import { PluginNotConfigured } from './pluginNotConfigured';


export const KubernetesGPTAnalyzerHomepage = () => {

  const [errorsCount, setErrorsCount] = React.useState<number>(0);
  const { entity } = useEntity();
  const { clusterName } = useEntityAnnotations(entity);
  const {kubernetesResults, error, loading } = useKubernetesResults({clusterId: clusterName});
  const { container,content, titleBar } = useKubernetesGPTAnalyzerHomepageStyles();

  React.useEffect(()=>{
    if(kubernetesResults){
      setErrorsCount(kubernetesResults.items.length)
    }
    // Clean up state
    return () => setErrorsCount(0)
  },[kubernetesResults])

  return (
    <Paper className={container}>
      <Box className={titleBar}>
        <KubernetesIcon />
        <Typography variant="h6">Kubernetes GPT Analyzer</Typography>
      </Box>
      <div className={content}>
        {error ? <PluginNotConfigured message={error} url="/"/> 
            : (
                  <>
                    {loading ? <LoadingProgress /> : (
                        <>
                          {errorsCount === 0 ? <SuccessfulAnalysis /> : 
                            (
                              <ErrorAnalysis
                                errors={errorsCount}
                                messages={kubernetesResults.items}
                              />
                            )}
                        </>
                      )}
                  </>
                )
          }
      </div>
    </Paper>
  );
};
