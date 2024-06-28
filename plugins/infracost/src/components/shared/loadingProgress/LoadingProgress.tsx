import React from 'react'
import { useLoadingProgressStyles } from './styles'
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


export const LoadingProgress = () => {

  const {root,baseSkeleton, titlebar,chartbar, detailsbar} = useLoadingProgressStyles();
  return (
    <Box className={root}>
      <Skeleton variant="rect" animation="wave" className={`${baseSkeleton} ${titlebar}`} />
      <Skeleton variant="rect" animation="wave" className={`${baseSkeleton} ${chartbar}`} />
      <Skeleton variant="rect" animation="wave" className={`${baseSkeleton} ${detailsbar}`} />
    </Box>
  )
}
