import React from 'react'
import { CodeSnippet, InfoCard } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { Entity } from '@backstage/catalog-model';

const useStyles = makeStyles({
  boxInfo: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#60a5fa40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '.5rem',
  },
});

export const ClusterInstructionsCard = () => {

  const { entity } = useEntity();
  const { instructions } = useEntityAnnotations(entity as Entity);
  const { boxInfo } = useStyles();

  if(!instructions) return (
    <InfoCard title="Cluster Instructions">
      <Typography variant="body1">
        <Box className={boxInfo}>
          ⚠️ No instruction available
          <Button
            href="https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/cluster-explorer"
            target="_blank"
            style={{ margin: '16px' }}
            size="large"
            variant="outlined"
          >
            See Docs
          </Button>
        </Box>
      </Typography>
    </InfoCard>
  );

  return (
    <InfoCard title="Cluster Instructions">
      <Typography variant="body1">
        <CodeSnippet text={instructions} language='bash' showCopyCodeButton/>
      </Typography>
    </InfoCard>
  );
}