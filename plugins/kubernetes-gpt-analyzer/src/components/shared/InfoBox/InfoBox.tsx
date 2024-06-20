import { Box, Button, makeStyles } from '@material-ui/core'
import React from 'react'

type InfoBoxPropType = {
    message: string,
    url: string
}

const useStyles = makeStyles({
  content: {
      width: '100%',
      padding: '0 1rem',
      fontSize: '1rem',
      borderRadius: '8px',
      background: '#60a5fa40',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '.5rem',
      marginBottom: '1rem',
    },
  });

export const InfoBox = ({message,url}:InfoBoxPropType) => {

  const { content } = useStyles();

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
        See Docs
      </Button>
    </Box>
  );
}
