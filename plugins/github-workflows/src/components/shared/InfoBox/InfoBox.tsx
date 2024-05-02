import { Box, Button, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

type InfoBoxPropType = {
    message: string,
    url?: string
}

const useStyles = makeStyles({
  content: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      borderRadius: '10px 0 10px 10px',
      background: '#60a5fa20',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '.5rem'
    },
  });

export const InfoBox = ({message,url}:InfoBoxPropType) => {

  const { content } = useStyles();

  return (
    <Box className={content}>
      <Typography variant="subtitle1"> {message} </Typography>
      {
        url && (
          <Button
              href={url}
              target="_blank"
              style={{ margin: '16px' }}
              size="large"
              variant="outlined"
            >
              See Docs
           </Button>
        )
      }
    </Box>
  );
}
