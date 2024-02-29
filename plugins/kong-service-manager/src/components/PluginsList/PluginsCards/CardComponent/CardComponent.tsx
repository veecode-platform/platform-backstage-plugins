import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { PluginCard } from '../PluginsCards'
import Edit from '@material-ui/icons/Edit'
import { useStyles } from '../styles'

interface CardComponentProps {
    data: PluginCard
}

export const CardComponent = ({data}:CardComponentProps) => {

  const {card, cardHeader, cardTitle, cardIcon,description, button} = useStyles()

  return (
    <Card key={data.name} className={card}>
      <CardHeader
        className={cardHeader}
        action={
          <IconButton aria-label="settings">
            {' '}
            <Edit />{' '}
          </IconButton>
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
        <Button color="primary" className={button}>
          Enable
        </Button>
      </CardActions>
    </Card>
  );
}
