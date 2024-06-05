import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { Skeleton } from '@material-ui/lab';

type SkeletonComponentProps = {
    title: string,
    description: string
}


export const SkeletonComponent : React.FC<SkeletonComponentProps> = ({title,description}) => {

 const { descriptionContent,skeletonContent } = useStyles();

  return (
    <>
    <Box my={1}>
      <Typography variant="h5">
        {title}
      </Typography>
      <Divider />
    </Box>
    <Box className={descriptionContent}>
      <Typography variant="body1">
        {description}
      </Typography>
    </Box>
    <Skeleton className={skeletonContent} animation="wave" />
  </>
  )
}