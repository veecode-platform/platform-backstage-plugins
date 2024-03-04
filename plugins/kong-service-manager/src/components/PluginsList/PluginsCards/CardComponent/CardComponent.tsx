/* eslint-disable @backstage/no-undeclared-imports */
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core'
import React, { useContext }  from 'react'
import Edit from '@material-ui/icons/Edit'
import { useStyles } from '../styles'
import { KongServiceManagerContext } from '../../../context'
import { PluginCard } from '../../../../utils/types'
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../../hooks'

interface CardComponentProps {
    data: PluginCard
}

export const CardComponent = ({data}:CardComponentProps) => {

  const {card, cardHeader, cardTitle, cardIcon,description, button} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, setPluginState, disablePlugin } = useContext(KongServiceManagerContext);

  const handleActionClick = async () => {
    if(data){
      if(data.associated){
        await disablePlugin(serviceName as string, data.slug, kongInstance as string);
        return;
      } 
      setPluginState(data);
      handleToggleDrawer();
      return;
    }
  }

  const handleEditAction = () => {
    setPluginState(data);
    handleToggleDrawer();
  }

  return (
    <Card key={data.name} className={card}>
      <CardHeader
        className={cardHeader}
        action={
          <>
            {data.associated ? (
              <IconButton aria-label="settings" title="Edit Plugin">
                <Edit onClick={handleEditAction} />
              </IconButton>
            ) : (
              <></>
            )}
          </>
        }
        title={
          <Typography variant="h6" className={cardTitle}>
            {data.name}
          </Typography>
        }
      />
      <CardMedia>
        <img src={`${data.image}`} alt="" className={cardIcon} />
      </CardMedia>
      <CardContent className={description}>{data.description}</CardContent>
      <CardActions>
        <>
          {data.associated ? (
            <Button
              color="primary"
              variant="contained"
              className={button}
              onClick={handleActionClick}
            >
              Disable
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              className={button}
              onClick={handleActionClick}
            >
              Enable
            </Button>
          )}
        </>
      </CardActions>
    </Card>
  );
}
