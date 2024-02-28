/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { LinkButton, ItemCardGrid,ItemCardHeader, Content } from '@backstage/core-components';
import { AssociatedPluginsResponse } from '../../../utils/types';

interface PluginsCardsProps {
  allEnabledPlugins: string[] | null | [],
  allAssociatedPlugins: AssociatedPluginsResponse[] | null | [],
  filterByAssociated?: boolean
}

const useStyles = makeStyles({
  content:{
    minHeight: '60vh'
   }
});

export const PluginsCards = ({allEnabledPlugins,allAssociatedPlugins,filterByAssociated}:PluginsCardsProps) => {

  const { content } = useStyles();
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const getAssociatedPuginsName = ( pluginsParams : AssociatedPluginsResponse[] ) => {
      const newData : string[] = []
      pluginsParams.map(p => {
        newData.push(p.name)
      })
      setAssociatedPluginsName(newData)
  };

  useEffect(()=>{
    if(allAssociatedPlugins) getAssociatedPuginsName(allAssociatedPlugins)
  },[allAssociatedPlugins])

  return (
    <Content className={content}>
      <ItemCardGrid>
        <>
          {!filterByAssociated ? (
            allEnabledPlugins?.map(t => (
              <Card key={t}>
                <CardMedia>
                  <ItemCardHeader title={t} subtitle="" />
                </CardMedia>
                <CardContent>{t}</CardContent>
                <CardActions>
                  <LinkButton color="primary" to="/catalog">
                    Go There!
                  </LinkButton>
                </CardActions>
              </Card>
            ))
          ) : (
            associatedPluginsName?.map(t => (
              <Card key={t}>
                <CardMedia>
                  <ItemCardHeader title={t} subtitle="" />
                </CardMedia>
                <CardContent>{t}</CardContent>
                <CardActions>
                  <LinkButton color="primary" to="/catalog">
                    Go There!
                  </LinkButton>
                </CardActions>
              </Card>
            ))
          )}
        </>
      </ItemCardGrid>
    </Content>
  );
};