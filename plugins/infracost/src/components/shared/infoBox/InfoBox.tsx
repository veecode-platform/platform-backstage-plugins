import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useInfoboxStyles } from './styles'
import { InfoBoxPropType } from './types';

export const InfoBox : React.FC<InfoBoxPropType> = (props) => {

  const {message,url, noIcon = false} = props;
  const { root, withoutButton } = useInfoboxStyles();

  return (
    <Box className={url ? root : withoutButton}>
     {!noIcon && "⚠️" } {message}
     {url && (
       <Button
         href={url}
         target="_blank"
         style={{ margin: '16px' }}
         size="large"
         variant="outlined"
       >
        Docs
       </Button>
     )}
    </Box>
  );
}
