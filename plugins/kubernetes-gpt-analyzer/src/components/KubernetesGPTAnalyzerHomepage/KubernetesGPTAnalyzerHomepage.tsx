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
import { KubernetesGPTAnalyzerHomepageProps } from './types';
import { PLUGIN_DOCS } from '../../utils/constants/docs';


export const KubernetesGPTAnalyzerHomepage : React.FC<KubernetesGPTAnalyzerHomepageProps> = ({intervalMs}) => {

  const [errorsCount, setErrorsCount] = React.useState<number>(0);
  const { entity } = useEntity();
  const { clusterName } = useEntityAnnotations(entity);
  const {kubernetesResults, error, loading } = useKubernetesResults({clusterName,intervalMs});
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
        {error ? <PluginNotConfigured message={error} url={PLUGIN_DOCS}/> 
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
