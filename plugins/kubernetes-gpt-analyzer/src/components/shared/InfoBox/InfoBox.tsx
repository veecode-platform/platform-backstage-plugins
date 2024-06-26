import { Box, Button } from '@material-ui/core'
import React from 'react'
import { InfoBoxPropType } from './types';
import { useInfoBoxStyles } from './styles';

export const InfoBox  : React.FC<InfoBoxPropType> = (props) => {

  const { content } = useInfoBoxStyles();
  const {message,url} = props;

  return (
    <Box className={content}>
      ⚠️ {message}
      <Button
        href={url}
        target="_blank"
        style={{ margin: '16px' }}
        size="large"
        variant="outlined"
      >
        Docs
      </Button>
    </Box>
  );
}
