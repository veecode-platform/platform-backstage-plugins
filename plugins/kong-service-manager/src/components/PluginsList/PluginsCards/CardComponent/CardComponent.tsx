/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { usePluginsCardsStyles } from '../styles';
import { useKongServiceManagerContext } from '../../../../context';
import { CardComponentProps } from './types';
import { usePermission } from '@backstage/plugin-permission-react';
import {
  kongApplyPluginToServicePermission,
  kongDisableServicePluginPermission,
  kongUpdateServicePluginPermission,
} from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { PluginImage } from '@veecode-platform/plugin-kong-service-manager-react';

export const CardComponent: React.FC<CardComponentProps> = props => {
  const [processingData, setProcessingData] = React.useState<boolean>(false);
  const {
    handleToggleDrawer,
    setPluginState,
    disablePlugin,
    isRoute,
    disabledPluginFromRoute,
  } = useKongServiceManagerContext();
  const {
    card,
    cardHeader,
    cardTitle,
    disabledTitle,
    cardIcon,
    disabledImg,
    description,
    button,
    spinner,
  } = usePluginsCardsStyles();
  const { data, allowed } = props;

  // permissions
  const { loading: loadingApplyPluginPermission, allowed: canApplyPlugin } =
    usePermission({
      permission: kongApplyPluginToServicePermission,
    });
  const { loading: loadingUpdatePluginPermission, allowed: canUpdatePlugin } =
    usePermission({
      permission: kongUpdateServicePluginPermission,
    });
  const { loading: loadingDeletePluginPermission, allowed: canDeletePlugin } =
    usePermission({
      permission: kongDisableServicePluginPermission,
    });

  const handlePluginEnable = async () => {
    if (data) {
      setPluginState(data);
      handleToggleDrawer();
      return;
    }
  };

  const handlePluginRemove = async () => {
    if (data.id) {
      setProcessingData(true);
      const id = data.id;
      if (isRoute) await disabledPluginFromRoute(id);
      else await disablePlugin(id);
      setProcessingData(false);
    }
  };

  const handleEditAction = () => {
    setPluginState(data);
    handleToggleDrawer();
    return;
  };

  return (
    <Card key={data.name} className={card}>
      <CardHeader
        className={cardHeader}
        action={
          <>
            {data.associated ? (
              <>
                {!loadingUpdatePluginPermission && (
                  <IconButton
                    aria-label="settings"
                    title="Edit Plugin"
                    disabled={!canUpdatePlugin || !allowed}
                    onClick={handleEditAction}
                  >
                    <Edit />
                  </IconButton>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        }
        title={
          <Typography
            variant="h6"
            className={`${cardTitle} ${!allowed ? disabledTitle : ''}`}
          >
            {data.name}
          </Typography>
        }
      />
      <CardMedia>
        <PluginImage
          pluginSlug={data.slug}
          alt="picture"
          className={`${cardIcon} ${!allowed ? disabledImg : ''}`}
        />
      </CardMedia>
      <CardContent className={description}>{data.description}</CardContent>
      <CardActions>
        <>
          {data.associated ? (
            <>
              {!loadingDeletePluginPermission && (
                <Button
                  color="primary"
                  variant="contained"
                  className={button}
                  onClick={handlePluginRemove}
                  disabled={processingData || !canDeletePlugin || !allowed}
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
              )}
            </>
          ) : (
            <>
              {!loadingApplyPluginPermission && (
                <Button
                  color="primary"
                  variant="outlined"
                  className={button}
                  onClick={handlePluginEnable}
                  disabled={!canApplyPlugin || !allowed}
                >
                  Enable
                </Button>
              )}
            </>
          )}
        </>
      </CardActions>
    </Card>
  );
};
