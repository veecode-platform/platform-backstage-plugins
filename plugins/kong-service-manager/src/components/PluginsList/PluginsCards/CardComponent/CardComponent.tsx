/* eslint-disable @backstage/no-undeclared-imports */
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core'
import React, { useContext, useState }  from 'react'
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

  const {card, cardHeader, cardTitle, cardIcon,description, button,spinner} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, setPluginState, disablePlugin, allAssociatedPlugins } = useContext(KongServiceManagerContext);
  const [processingData, setProcessingData] = useState<boolean>(false);

  const handlePluginEnable = async () => {
    if(data){
      setPluginState(data);
      handleToggleDrawer();
      return;
    }
  }

  const handlePluginRemove = async () =>{
     if(allAssociatedPlugins){
      setProcessingData(true)
        let id = ""
        allAssociatedPlugins.forEach(p => {
          if(p.name === data.slug){
            id = p.id
          }
        });
        await disablePlugin(serviceName as string, id, kongInstance as string);
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
