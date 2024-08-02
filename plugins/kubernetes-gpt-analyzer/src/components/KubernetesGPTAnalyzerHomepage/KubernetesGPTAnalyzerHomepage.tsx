import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useKubernetesResults } from '../../hooks/useKubernetesResults';
import { useKubernetesGPTAnalyzerWrapperStyles } from './styles';
import { LoadingProgress } from '../shared/LoadingProgress/LoadingProgress'
import { SuccessfulAnalysis } from './SuccessfulAnalysis';
import { ErrorAnalysis } from './ErrorAnalysis';
import KubernetesIcon from '../../assets/kubernetesIcon';
import { useEntity } from '@backstage/plugin-catalog-react';
import { PluginNotConfigured } from '../shared/pluginNotConfigured/PluginNotConfigured';
import { KubernetesGPTAnalyzerHomepageProps, KubernetesGPTAnalyzerWrapperProps } from './types';
import { PLUGIN_DOCS } from '../../utils/constants/docs';


export const KubernetesGPTAnalyzerWrapper : React.FC<KubernetesGPTAnalyzerWrapperProps> = (props) => {

  const { children } = props;
  const { container,content, titleBar } = useKubernetesGPTAnalyzerWrapperStyles();

  return(
    <Paper className={container}>
    <Box className={titleBar}>
      <KubernetesIcon />
      <Typography variant="h6">Kubernetes GPT Analyzer</Typography>
    </Box>
    <div className={content}>
     {children}
    </div>
  </Paper>
  )
}


export const KubernetesGPTAnalyzerHomepage : React.FC<KubernetesGPTAnalyzerHomepageProps>= (props) => {

  const [errorsCount, setErrorsCount] = React.useState<number>(0);
  const { entity } = useEntity();
  const { clusterName } = useEntityAnnotations(entity);
  const { intervalMs } = props;
  const {kubernetesResults, error, loading } = useKubernetesResults({clusterName,intervalMs});

  React.useEffect(()=>{
    if(kubernetesResults){
      setErrorsCount(kubernetesResults.items.length)
    }
    // Clean up state
    return () => setErrorsCount(0)
  },[kubernetesResults]);

  if(loading) return <LoadingProgress />;

  if(error) return <PluginNotConfigured message={error} url={PLUGIN_DOCS}/>;

  if(errorsCount === 0 ) return <SuccessfulAnalysis />;

  return (
      <KubernetesGPTAnalyzerWrapper>
        <ErrorAnalysis
          errors={errorsCount}
          messages={kubernetesResults.items}
        />
      </KubernetesGPTAnalyzerWrapper>
  );
};
