/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */

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