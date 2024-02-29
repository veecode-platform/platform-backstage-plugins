/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */

import React, { useEffect, useState } from 'react';
import { Content } from '@backstage/core-components';
import { AssociatedPluginsResponse } from '../../../utils/types';
import PluginsInfoData from '../../../data/plugins.json';
import { KongPluginsCategoriesEnum } from '../../../utils/enums/KongPluginCategories';
import { AllPlugins } from './AllPlugins';
import { useStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';

export interface PluginsCardsProps {
  allEnabledPlugins: string[] | null | [],
  allAssociatedPlugins: AssociatedPluginsResponse[] | null | [],
  filterByAssociated?: boolean
}

export interface PluginCard {
  name: string,
  slug: string,
  associated?: boolean,
  image: string,
  tags: string[],
  description: string,
}

export interface PluginsPerCategoryType  {
  ai: { 
    plugins: PluginCard[] | [] 
  };
  auth: { 
    plugins: PluginCard[] | [] 
  };
  security: { 
    plugins: PluginCard[] | [] 
  };
  trafficControl: { 
    plugins: PluginCard[] | [] 
  };
  serverless: { 
    plugins: PluginCard[] | [] 
  };
  analitics: {
    plugins: PluginCard[] | [];
  };
  transformations: {
    plugins: PluginCard[] | [];
  };
  logging: {
    plugins: PluginCard[] | [];
  };
};

export const PluginsCards = ({allEnabledPlugins,allAssociatedPlugins,filterByAssociated}:PluginsCardsProps) => {

  const { content } = useStyles();
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const [pluginsPerCategory, setPluginsPerCategory] = useState<PluginsPerCategoryType>({
    ai: { plugins: [] },
    auth: { plugins: [] },
    security: { plugins: [] },
    trafficControl: { plugins: [] },
    serverless: { plugins: [] },
    analitics: { plugins: [] },
    transformations: { plugins: [] },
    logging: { plugins: [] },
  });  

  const getAssociatedPuginsName = ( pluginsParams : AssociatedPluginsResponse[] ) => {
      const newData : string[] = []
      pluginsParams.map(p => {
        newData.push(p.name)
      })
      setAssociatedPluginsName(newData)
  };

  const updatePluginsState = (pluginsData: string[]) => {
    const updatePlugins: PluginsPerCategoryType = { 
      ai: { plugins: [] },
      auth: { plugins: [] },
      security: { plugins: [] },
      trafficControl: { plugins: [] },
      serverless: { plugins: [] },
      analitics: { plugins: [] },
      transformations: { plugins: [] },
      logging: { plugins: [] },
    };

    pluginsData.forEach(pluginName => {
      PluginsInfoData.categories.forEach(c => {
        const foundPlugin = c.plugins.find(i => i.slug === pluginName);
        const isAssociated = (associatedPluginsName && associatedPluginsName.length >= 1) && associatedPluginsName.find( i => i === pluginName);

        if (foundPlugin) {
          const newPlugin = {
            name: foundPlugin.name,
            slug: foundPlugin.slug,
            associated: isAssociated ? true : false,
            image: foundPlugin.image,
            tags: foundPlugin.tags,
            description: foundPlugin.description,
          };

          switch (c.category) {
            case KongPluginsCategoriesEnum.ai:
              (updatePlugins.ai.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.analitics:
              (updatePlugins.analitics.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.auth:
              (updatePlugins.auth.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.logging:
              (updatePlugins.logging.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.security:
              (updatePlugins.security.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.serverless:
              (updatePlugins.serverless.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.trafficControl:
              (updatePlugins.trafficControl.plugins as PluginCard[]).push(newPlugin);
              return;
            case KongPluginsCategoriesEnum.transformations:
              (updatePlugins.transformations.plugins as PluginCard[]).push(newPlugin);
              return;
            default:
              return;
          }
        }
      });
    });
  
    setPluginsPerCategory(prev => ({ ...prev, ...updatePlugins }));
  };
  

  useEffect(()=>{
    if(allAssociatedPlugins){
      getAssociatedPuginsName(allAssociatedPlugins);
    }
  },[allAssociatedPlugins]);

  useEffect(() => {
    if (allEnabledPlugins && allEnabledPlugins.length >= 1) {
      updatePluginsState(allEnabledPlugins)
    }
  }, [allEnabledPlugins]);

  return (
    <Content className={content}>
        <>
          {!filterByAssociated
            ? <AllPlugins plugins={pluginsPerCategory}/>
            : <AssociatedPlugins plugins={pluginsPerCategory}/>
          }
        </>
    </Content>
  );
};