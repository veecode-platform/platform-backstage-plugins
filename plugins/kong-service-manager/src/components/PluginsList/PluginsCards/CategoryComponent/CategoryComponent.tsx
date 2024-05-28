import { ItemCardGrid } from '@backstage/core-components'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { usePluginsCardsStyles } from '../styles';
import { CardComponent } from '../CardComponent';
import { PluginCard } from '../../../../utils/types';

interface CategoryComponentProps {
    label: string,
    plugins: PluginCard[]|[]
}

export const CategoryComponent = ({label, plugins}:CategoryComponentProps) => {

  const {categoryLabel} = usePluginsCardsStyles();

  return (
    <Box>
      <Typography variant="h6" className={categoryLabel}>
        {label}
      </Typography>
      <ItemCardGrid>
        {plugins.map(item => <CardComponent key={item.slug} data={item} />)}
      </ItemCardGrid>
    </Box>
  );
}
