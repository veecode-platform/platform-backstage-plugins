import React from 'react';
import { useSummaryStyles } from './styles';
import { CircleInfoIcon, InfoBox, Wrapper } from '../../../shared';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import { SummaryProps } from './types';

export const Summary: React.FC<SummaryProps> = props => {
  const {
    resourcesCount,
    totalSupportedResources,
    totalUnsupportedResources,
    noPriceResources,
  } = props;
  const { infoStyle, listStyle } = useSummaryStyles();

  return (
    <Wrapper>
      <InfoBox
        noIcon
        message={
          <div className={infoStyle}>
            <CircleInfoIcon />{' '}
            <Typography variant="caption">
              {resourcesCount} cloud resources detected
            </Typography>
          </div>
        }
      />
      <Wrapper styles={{ height: '80%' }}>
        <List className={listStyle} dense>
          {totalSupportedResources > 0 && (
            <ListItem>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${totalSupportedResources} Were estimated`}
              />
            </ListItem>
          )}

          {totalUnsupportedResources > 0 && (
            <ListItem>
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${totalUnsupportedResources} Unsupported resources`}
              />
            </ListItem>
          )}

          {noPriceResources > 0 && (
            <ListItem>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary={`${noPriceResources} Were free`} />
            </ListItem>
          )}
        </List>
      </Wrapper>
    </Wrapper>
  );
};
