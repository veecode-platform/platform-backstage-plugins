import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core'
import React, { useContext }  from 'react'
import { PluginCard } from '../PluginsCards'
import Edit from '@material-ui/icons/Edit'
import { useStyles } from '../styles'
import { CreatePlugin, PluginFieldsResponse } from '../../../../utils/types'
import { KongServiceManagerContext } from '../../../context'

interface CardComponentProps {
    data: PluginCard,
    pluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>,
    enablePlugin?: (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => Promise<void>,
    disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<void>
}

export const CardComponent = ({data, pluginFields,enablePlugin,disablePlugin}:CardComponentProps) => {

  const {card, cardHeader, cardTitle, cardIcon,description, button} = useStyles();
  const { handleToggleModal } = useContext(KongServiceManagerContext);
  // começar as tratativas para abrir o modal


  return (
    <Card key={data.name} className={card}>
      <CardHeader
        className={cardHeader}
        action={
          <>
            {data.associated ? (
              <IconButton aria-label="settings" title="Edit Plugin">
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
              onClick={handleToggleModal}
            >
              Disable
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              className={button}
              onClick={handleToggleModal}
            >
              Enable
            </Button>
          )}
        </>
      </CardActions>
    </Card>
  );
}
