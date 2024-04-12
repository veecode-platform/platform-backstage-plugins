import { Box, Button, makeStyles } from '@material-ui/core'
import React from 'react'

type BoxInfoPropType = {
    message: string,
    url: string
}

const useStyles = makeStyles({
    boxInfo: {
      width: '100%',
      padding: '.7rem 1rem',
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

export const BoxInfo = ({message,url}:BoxInfoPropType) => {

  const { boxInfo } = useStyles();

  return (
    <Box className={boxInfo}>
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
