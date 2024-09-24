import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useLoadingComponentStyles } from './styles'

export const LoadingComponent = () => {

  const { root } = useLoadingComponentStyles();

  return (
    <Box className={root}>
      <CircularProgress size={80}/>
    </Box>
  )
}
