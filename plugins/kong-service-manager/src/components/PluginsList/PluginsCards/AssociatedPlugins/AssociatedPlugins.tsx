import React from 'react';
import { PluginsPerCategoryType } from '../PluginsCards';
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { ItemCardGrid } from '@backstage/core-components';
import { useStyles } from '../styles';
import Edit from '@material-ui/icons/Edit';


interface associatedPluginsProps {
  plugins: PluginsPerCategoryType;
}

export const AssociatedPlugins = ({ plugins }: associatedPluginsProps) => { 

  const { card, cardHeader, cardTitle, description, cardIcon, button } = useStyles();

  return (
    <>
      {plugins.ai.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">AI</Typography>
          <ItemCardGrid>
            {plugins.ai.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.analitics.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Analitics</Typography>
          <ItemCardGrid>
            {plugins.analitics.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.auth.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Authentication</Typography>
          <ItemCardGrid>
            {plugins.auth.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.logging.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Logging</Typography>
          <ItemCardGrid>
            {plugins.logging.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.security.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Security</Typography>
          <ItemCardGrid>
            {plugins.security.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.serverless.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Serverless</Typography>
          <ItemCardGrid>
            {plugins.serverless.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.trafficControl.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Traffic Control</Typography>
          <ItemCardGrid>
            {plugins.trafficControl.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
      {plugins.transformations.plugins.length >= 1 && (
        <Box>
          <Typography variant="h6">Transformations</Typography>
          <ItemCardGrid>
            {plugins.transformations.plugins.map(c => (
              <Card key={c.name} className={card}>
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
                      {c.name}
                    </Typography>
                  }
                />
                <CardMedia>
                  <img src={`${c.image}`} alt="" className={cardIcon} />
                </CardMedia>
                <CardContent className={description}>
                  {c.description}
                </CardContent>
                <CardActions>
                  <Button color="primary" className={button}>
                    Enable
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ItemCardGrid>
        </Box>
      )}
    </>
  );
};
