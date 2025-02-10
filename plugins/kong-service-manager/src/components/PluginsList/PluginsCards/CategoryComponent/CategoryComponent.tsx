import React from 'react';
import { Content, ItemCardGrid } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import { usePluginsCardsStyles } from '../styles';
import { CardComponent } from '../CardComponent';
import { CategoryComponentProps, PluginsCategoryProps } from './types';
import { usePermission } from '@backstage/plugin-permission-react';
import { 
  kongAIPluginsPermission,
  kongAuthPluginsPermission,
  kongSecurityPluginsPermission,
  kongTrafficPluginsPermission,
  kongServerlessPluginsPermission,
  kongTransformPluginsPermission,
  kongLoggingPluginsPermission,
  kongAnalyticsPluginsPermission
 } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { CategoryPluginsEnum } from './enum';


const PluginsCategory : React.FC<PluginsCategoryProps> = (props) => {

  const {label, plugins, allowed} = props;
  const {categoryLabel} = usePluginsCardsStyles();
  return (
    <Content>
      <Typography variant="h6" className={categoryLabel}>
        {label}
      </Typography>
      <ItemCardGrid>
        {plugins.map(item => <CardComponent key={item.slug} data={item} allowed={allowed} />)}
      </ItemCardGrid>
    </Content>
  );
}

export const CategoryComponent : React.FC<CategoryComponentProps> = (props) => {

  const {label, plugins} = props;
  const { allowed: canHandleAIPlugins } = usePermission({ permission: kongAIPluginsPermission });
  const { allowed: canHandleAnalyticsPlugins } = usePermission({ permission: kongAnalyticsPluginsPermission });
  const { allowed: canHandleAuthPlugins } = usePermission({ permission: kongAuthPluginsPermission });
  const { allowed: canHandleLogginPlugins } = usePermission({ permission: kongLoggingPluginsPermission });
  const { allowed: canHandleSecurityPlugins } = usePermission({ permission: kongSecurityPluginsPermission });
  const { allowed: canHandleServerlessPlugins } = usePermission({ permission: kongServerlessPluginsPermission });
  const { allowed: canHandleTrafficPlugins } = usePermission({ permission: kongTrafficPluginsPermission });
  const { allowed: canHandleTransformPlugins } = usePermission({ permission: kongTransformPluginsPermission });


  switch (label) {
    case CategoryPluginsEnum.AI:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleAIPlugins}/>;
    case CategoryPluginsEnum.Analytics:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleAnalyticsPlugins}/>;
    case CategoryPluginsEnum.Auth:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleAuthPlugins}/>;
    case CategoryPluginsEnum.Logging:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleLogginPlugins}/>;
    case CategoryPluginsEnum.Security:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleSecurityPlugins}/>;
    case CategoryPluginsEnum.Serverless:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleServerlessPlugins}/>;
    case CategoryPluginsEnum.Traffic:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleTrafficPlugins}/>;
    case CategoryPluginsEnum.Transform:
      return <PluginsCategory label={label} plugins={plugins} allowed={canHandleTransformPlugins}/>;
    default:
      return <PluginsCategory label={label} plugins={plugins} allowed />;
  }
}
