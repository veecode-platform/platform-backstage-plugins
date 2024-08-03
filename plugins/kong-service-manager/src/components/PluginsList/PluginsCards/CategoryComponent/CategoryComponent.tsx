import React from 'react';
import { ItemCardGrid } from '@backstage/core-components';
import { Box, Typography } from '@material-ui/core';
import { usePluginsCardsStyles } from '../styles';
import { CardComponent } from '../CardComponent';
import { CategoryComponentProps } from './types';

export const CategoryComponent : React.FC<CategoryComponentProps> = (props) => {

  const {label, plugins} = props;
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
