import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useKubernetesGPTAnalyzerCardStyles } from './styles';
import KubernetesIcon from '../../assets/kubernetesIcon';
import StarsBg from '../../assets/stars-bg.svg';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Progress } from '@backstage/core-components';
import { InfoBox, ReviewMessageIcon, StarsIcon } from '../shared';
import { useEntityAnnotations, useKubernetesResults } from '../../hooks';
import { KubernetesGPTAnalyzerCardProps } from './types';
import { PLUGIN_DOCS } from '../../utils/constants/docs';

export const KubernetesGPTAnalyzerCard: React.FC<
  KubernetesGPTAnalyzerCardProps
> = props => {
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const { entity } = useEntity();
  const { clusterName } = useEntityAnnotations(entity);
  const { intervalMs } = props;
  const { kubernetesResults, error, loading } = useKubernetesResults({
    clusterName,
    intervalMs,
  });
  const { title, options, cardHeader, cardBody, content, notificationIcon } =
    useKubernetesGPTAnalyzerCardStyles();

  const handleOpenAnalyzer = () => {
    const baseUrl = window.location.origin;
    const newUrl = `${baseUrl}/catalog/${
      entity.metadata.namespace
    }/${entity.kind.toLowerCase()}/${
      entity.metadata.name
    }/kubernetes-gpt-analyzer`;
    window.location.href = newUrl;
  };

  React.useEffect(() => {
    if (kubernetesResults) {
      setNotificationsCount(kubernetesResults.items.length);
    }
    // Clean up state
    return () => setNotificationsCount(0);
  }, [kubernetesResults]);

  const TitleBar = (
    <Box className={title}>
      <KubernetesIcon />
      <Typography variant="h6">Kubernetes GPT Analyzer</Typography>
    </Box>
  );

  const ActionsCard = (
    <Box className={options}>
      <Badge badgeContent={notificationsCount} color="error">
        <ReviewMessageIcon />
      </Badge>
    </Box>
  );

  if (loading) {
    return <Progress />;
  }

  return (
    <Paper>
      <Card>
        <CardHeader
          title={TitleBar}
          action={ActionsCard}
          className={cardHeader}
        />
        <CardContent className={cardBody}>
          {!error ? (
            <>
              <Box className={content} onClick={handleOpenAnalyzer}>
                <StarsIcon />
                <Typography variant="button">Generate new analyze</Typography>
              </Box>
              <img src={StarsBg} alt="" />
            </>
          ) : (
            <InfoBox
              message="No configurations were found for this application"
              url={PLUGIN_DOCS}
            />
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};
