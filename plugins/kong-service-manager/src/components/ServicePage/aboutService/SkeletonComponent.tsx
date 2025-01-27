import React from 'react';
import { Box, ListItem, makeStyles } from '@material-ui/core';
import { LabelField } from '../Fields';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme=>({
  listComponent:{
    backgroundColor: '#1E1E1E05',
    height: '100%',
    minHeight: '65vh',
    margin:'.5rem',

  },
  listItemWrapper:{
    width: '100%',
    '&:nth-child(odd)':{
      background: theme.palette.background.default
    }
  },
  listItem:{
    width: '100%',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'flex-start',
  },
  itemValue: {
    width: '70%',
  },
  id:{
    width: '50%',
    height: '56px'
  },
  normal:{
    width: '50%',
    height: '32px',
  },
  tags:{
    width: '50%',
    height: '88px'
  }
}));

export const SkeletonComponent = () => {
  const {listItemWrapper, listItem,id,normal,tags} = useStyles();
  return (
    <>
    {/* ID */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="ID"/>
        <Skeleton animation="pulse" className={id} />
      </Box>
    </ListItem>
    {/* NAME */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Name"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* ENABLED */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Enabled"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* LAST UPDATE */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Last updated"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* CREATED */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Created"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* PROTOCOL */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Protocol"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* HOST */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Host"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* PATH */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Path"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* PORT */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Port"/>
        <Skeleton animation="pulse" className={normal} />
      </Box>
    </ListItem>
    {/* TAGS */}
    <ListItem className={listItemWrapper}>
      <Box className={listItem}>
       <LabelField title="Tags"/>
        <Skeleton animation="pulse" className={tags} />
      </Box>
    </ListItem>
  </>
  )
}
