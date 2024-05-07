import React from 'react';
import { CodeSnippet, InfoCard } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Typography } from '@material-ui/core';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { Entity } from '@backstage/catalog-model';
import { InfoBox } from '../shared';

export const ClusterInstructionsCard = () => {

  const { entity } = useEntity();
  const { instructions } = useEntityAnnotations(entity as Entity);

  if(!instructions) return (
    <InfoCard title="Cluster Instructions">
      <Typography variant="body1">
        <InfoBox
          message="No instruction available"
          url="https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/cluster-explorer"
         />
      </Typography>
    </InfoCard>
  );

  return (
    <InfoCard title="Cluster Instructions">
      <CodeSnippet text={instructions} language="bash" showCopyCodeButton />
    </InfoCard>
  );
}