import React from 'react';
import { PluginCard, PluginsPerCategoryType } from '../PluginsCards';
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { ItemCardGrid } from '@backstage/core-components';
import { useStyles } from '../styles';
import Edit from '@material-ui/icons/Edit';


interface associatedPluginsProps {
  plugins: PluginsPerCategoryType;
}

const getPlugins = (data:PluginCard[]|[]) => {
  if(data.length >=1){
    const pluginsAvaliable : PluginCard[] = [];
    data.forEach(i => {
      if(i.associated) pluginsAvaliable.push(i)
    });
  return pluginsAvaliable;
  }
  return []
}

export const AssociatedPlugins = ({ plugins }: associatedPluginsProps) => { 

  const { card, cardHeader, cardTitle, description, cardIcon, button } = useStyles();

  const aiPlugins = getPlugins(plugins.ai.plugins);
  const analiticsPlugins = getPlugins(plugins.analitics.plugins);
  const authPlugins = getPlugins(plugins.auth.plugins);
  const loggingPlugins = getPlugins(plugins.logging.plugins);
  const securityPlugins = getPlugins(plugins.security.plugins);
  const serverlessPlugins = getPlugins(plugins.serverless.plugins);
  const trafficControlPlugins = getPlugins(plugins.trafficControl.plugins);
  const transformationsPlugins = (plugins.transformations.plugins);

  return (
    <>
      {(aiPlugins.some(c => c.associated) && aiPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">AI</Typography>
          <ItemCardGrid>
            {aiPlugins.map(c => (
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
      {(analiticsPlugins.some(c => c.associated) && analiticsPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Analitics</Typography>
          <ItemCardGrid>
            {analiticsPlugins.map(c => (
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
      {(authPlugins.some(c => c.associated) && authPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Authentication</Typography>
          <ItemCardGrid>
            {authPlugins.map(c => (
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
      {(loggingPlugins.some(c => c.associated) && loggingPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Logging</Typography>
          <ItemCardGrid>
            {loggingPlugins.map(c => (
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
      {(securityPlugins.some(c => c.associated) && securityPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Security</Typography>
          <ItemCardGrid>
            {securityPlugins.map(c => (
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
      {(serverlessPlugins.some(c => c.associated) && serverlessPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Serverless</Typography>
          <ItemCardGrid>
            {serverlessPlugins.map(c => (
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
      {(trafficControlPlugins.some(c => c.associated) && trafficControlPlugins.length >= 1) && (
        <Box>
          <Typography variant="h6">Traffic Control</Typography>
          <ItemCardGrid>
            {trafficControlPlugins.map(c => (
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
      { (transformationsPlugins.some(c => c.associated)  && transformationsPlugins.length >= 1 )&& (
        <Box>
          <Typography variant="h6">Transformations</Typography>
          <ItemCardGrid>
            {transformationsPlugins.map(c => (
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
