/* eslint-disable @backstage/no-undeclared-imports */
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core'
import React, { useState }  from 'react'
import Edit from '@material-ui/icons/Edit'
import { usePluginsCardsStyles } from '../styles'
import { PluginCard } from '../../../../utils/types'
import { useKongServiceManagerContext } from '../../../../context'

interface CardComponentProps {
    data: PluginCard
}

export const CardComponent = ({data}:CardComponentProps) => {
  
  const [processingData, setProcessingData] = useState<boolean>(false);
  const { handleToggleDrawer, setPluginState, disablePlugin } = useKongServiceManagerContext();
  const {card, cardHeader, cardTitle, cardIcon,description, button,spinner} = usePluginsCardsStyles();

  const handlePluginEnable = async () => {
    if(data){
      setPluginState(data);
      handleToggleDrawer();
      return;
    }
  }

  const handlePluginRemove = async () =>{
     if(data.id){
      setProcessingData(true)
        const id = data.id;
        await disablePlugin(id);
        setProcessingData(false)
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
              <IconButton aria-label="settings" title="Edit Plugin" onClick={handleEditAction}>
                <Edit />
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
              onClick={handlePluginRemove}
              disabled={processingData}
            >
              {processingData ? (
                <>
                  Disabling...
                  <CircularProgress className={spinner} size={20} />
                </>
              ) : (
                <>Disable</>
              )}
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              className={button}
              onClick={handlePluginEnable}
            >
              Enable
            </Button>
          )}
        </>
      </CardActions>
    </Card>
  );
}
