import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { usePluginsCardsStyles } from '../styles';
import { useKongServiceManagerContext } from '../../../../context';
import { CardComponentProps } from './types';
import useAsync from 'react-use/esm/useAsync';


export const CardComponent : React.FC<CardComponentProps> = (props) => { 
  
  const [processingData, setProcessingData] = React.useState<boolean>(false);
  const { handleToggleDrawer, setPluginState, disablePlugin } = useKongServiceManagerContext();
  const {card, cardHeader, cardTitle, cardIcon,description, button,spinner} = usePluginsCardsStyles();
  const {data} = props;

  const {value, loading, error} = useAsync(async () => {
    const response = await import(`../../../../assets/plugins/${data.image}`) 
    return response.default
  })
  if(loading) return <></>
  if(error) return <></>
  

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
        <img src={value} alt="picture" className={cardIcon} />
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
