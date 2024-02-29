import { ItemCardGrid } from '@backstage/core-components'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../styles';
import { PluginCard } from '../PluginsCards';
import { CardComponent } from '../CardComponent';

interface CategoryComponentProps {
    label: string,
    plugins: PluginCard[]|[]
}

export const CategoryComponent = ({label, plugins}:CategoryComponentProps) => {

  const {categoryLabel} = useStyles();

  return (
    <Box>
    <Typography variant="h6" className={categoryLabel}>{label}</Typography>
    <ItemCardGrid>
      {plugins.map(c => (
        <CardComponent data={c}/>
      ))}
    </ItemCardGrid>
  </Box>
  )
}
