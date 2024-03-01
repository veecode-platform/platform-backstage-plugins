import { ItemCardGrid } from '@backstage/core-components'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../styles';
import { PluginCard } from '../PluginsCards';
import { CardComponent } from '../CardComponent';
import { CreatePlugin, PluginFieldsResponse } from '../../../../utils/types';

interface CategoryComponentProps {
    label: string,
    plugins: PluginCard[]|[],
    pluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>,
    enablePlugin?: (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => Promise<void>,
    disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<void>
}

export const CategoryComponent = ({label, plugins, pluginFields,enablePlugin,disablePlugin}:CategoryComponentProps) => {

  const {categoryLabel} = useStyles();

  return (
    <Box>
      <Typography variant="h6" className={categoryLabel}>
        {label}
      </Typography>
      <ItemCardGrid>
        {plugins.map(item => (
          <>
            {item.associated ? (
              <CardComponent
                data={item}
                key={item.slug}
                pluginFields={pluginFields}
                disablePlugin={disablePlugin}
              />
            ) : (
              <CardComponent
                data={item}
                key={item.slug}
                pluginFields={pluginFields}
                enablePlugin={enablePlugin}
                disablePlugin={disablePlugin}
              />
            )}
          </>
        ))}
      </ItemCardGrid>
    </Box>
  );
}
