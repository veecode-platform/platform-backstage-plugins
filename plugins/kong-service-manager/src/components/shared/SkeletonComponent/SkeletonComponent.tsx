import React from 'react';
import { Box, ListItem } from '@material-ui/core';
import { LabelField } from '../Fields';
import { Skeleton } from '@material-ui/lab';
import { useSkeletonStyles } from './styles';
import { SkeletonComponentProps } from './types';



export const SkeletonComponent : React.FC<SkeletonComponentProps> = (props) => {
  
  const { options } = props;
  const {listItemWrapper, listItem,id,normal,tags} = useSkeletonStyles();


  if(options.length <= 0) return null;

  return (
    <>
    {options.map(option => (
        <ListItem className={listItemWrapper}>
            <Box className={listItem}>
                <LabelField title={option}/>
                <Skeleton animation="pulse" className={`${option.toLowerCase() === "id" && id} ${option.toLowerCase() === "tags" ? tags : normal}`} />
            </Box>
    </ListItem>))}
  </>
  )
}

