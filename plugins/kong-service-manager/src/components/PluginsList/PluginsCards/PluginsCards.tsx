/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import React, { useEffect, useState } from 'react';
import { ItemCardGrid, Content } from '@backstage/core-components';
import { AssociatedPluginsResponse } from '../../../utils/types';
import { Button, CardHeader, IconButton, Typography } from '@material-ui/core';
import ImageDefault  from '../../../assets/default.png'
import Edit from '@material-ui/icons/Edit';
import PluginsInfoData from '../../../data/plugins.json';

interface PluginsCardsProps {
  allEnabledPlugins: string[] | null | [],
  allAssociatedPlugins: AssociatedPluginsResponse[] | null | [],
  filterByAssociated?: boolean
}

interface PluginCard {
  name: string,
  slug: string,
  associated?: boolean,
  image: string,
  tags: string[],
  description: string,
  category: string
}

const useStyles = makeStyles( theme => ({
  content:{
    minHeight: '60vh'
   },
   card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(4),
    borderRadius: '8px',
    border: `1px solid ${theme.palette.action.focus}`,
   },
   cardHeader:{
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
   },
   cardTitle:{
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   },
   description:{
    textAlign: 'center', 
   },
   cardEdit:{
    
   },
   cardIcon:{
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '5px'
   },
   button:{
    border: `1px solid ${theme.palette.primary.main}`,
    width: '380px',
    padding: theme.spacing(1)
   }
}));

export const PluginsCards = ({allEnabledPlugins,allAssociatedPlugins,filterByAssociated}:PluginsCardsProps) => {

  const { content, card, cardHeader, cardTitle, description, cardEdit, cardIcon, button } = useStyles();
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const [cards, setCards] = useState<PluginCard[]|[]> ([]);

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

  useEffect(()=>{
    if(allEnabledPlugins && allEnabledPlugins.length >= 1){
      const newCards : PluginCard[] = [];
      allEnabledPlugins.forEach(pluginName => {
        const plugin = pluginName;
        PluginsInfoData.filter(i =>{
          if(i.slug === plugin){
            newCards.push({
              name: i.name,
              slug: i.slug,
              associated: false,
              image: i.image,
              tags: i.tags,
              description: i.description,
              category: i.category
            })
          }
        })
      })
      setCards(newCards)
    }
  },[allEnabledPlugins])

  return (
    <Content className={content}>
      <ItemCardGrid>
        <>
          {!filterByAssociated
            ? cards?.map(c => (
                <Card key={c.name} className={card}>
                  <CardHeader
                   className={cardHeader}
                    action={
                      filterByAssociated ? (
                        <IconButton aria-label="settings">
                          {' '}
                          <Edit />{' '}
                        </IconButton>
                      ) : (
                        <></>
                      )
                    }
                    title={
                    <Typography variant="h6" className={cardTitle}>
                      {c.name}
                    </Typography>
                    }
                  />
                  <CardMedia>
                    <img src={`${c.image}`} alt="" className={cardIcon} />
                  </CardMedia>
                  <CardContent className={description}>{c.description}</CardContent>
                  <CardActions>
                    <Button color="primary" className={button}>
                      Enable
                    </Button>
                  </CardActions>
                </Card>
              ))
            : associatedPluginsName?.map(t => (
                <Card key={t} className={card}>
                  <CardHeader
                   className={cardHeader}
                    action={
                      filterByAssociated ? (
                        <IconButton aria-label="settings" className={cardEdit}>
                          {' '}
                          <Edit />{' '}
                        </IconButton>
                      ) : (
                        <></>
                      )
                    }
                    title={
                      <Typography variant="h6" className={cardTitle}>
                        {t}
                      </Typography>
                    }
                  />
                  <CardMedia>
                    <img src={ImageDefault} alt="" className={cardIcon} />
                  </CardMedia>
                  <CardContent>{t}</CardContent>
                  <CardActions>
                    <Button color="primary" className={button}>
                      Enable
                    </Button>
                  </CardActions>
                </Card>
              ))}
        </>
      </ItemCardGrid>
    </Content>
  );
};