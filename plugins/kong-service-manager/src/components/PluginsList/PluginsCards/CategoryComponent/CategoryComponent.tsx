import React from 'react';
import { Content, ItemCardGrid } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import { usePluginsCardsStyles } from '../styles';
import { CardComponent } from '../CardComponent';
import { CategoryComponentProps } from './types';

export const CategoryComponent : React.FC<CategoryComponentProps> = (props) => {

  const {label, plugins} = props;
  const {categoryLabel} = usePluginsCardsStyles();

  return (
    <Content>
      <Typography variant="h6" className={categoryLabel}>
        {label}
      </Typography>
      <ItemCardGrid>
        {plugins.map(item => <CardComponent key={item.slug} data={item} />)}
      </ItemCardGrid>
    </Content>
  );
}
