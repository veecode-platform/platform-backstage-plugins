/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ErrorBoundary, MissingAnnotationEmptyState, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Card, CardContent, CardHeader, CircularProgress, IconButton, Typography, makeStyles } from '@material-ui/core';
import useAsync from 'react-use/lib/useAsync';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../../SelectBranch';
import CachedIcon from '@material-ui/icons/Cached';
import { GitlabPipelinesContext } from '../../context/GitlabPipelinesContext';
import { JobAnnotationProps } from '../../../utils/types';
import { GITLAB_JOBS_ANNOTATION, useEntityAnnotations } from '../../../hooks';
import { JobItem } from '../JobItem';
import GitlabIcon from '../../assets/gitlabIcon';

const useStyles = makeStyles(theme => ({
  wrapper:{
    margin: 'auto' ,
    width:'100%',
    [theme.breakpoints.up('md')]: {    
      maxWidth: '57vw', 
     },
     [theme.breakpoints.down('md')]: {
      maxWidth: '75vw',
     },
     [theme.breakpoints.down('xs')]: {
      maxWidth: '90vw',
     }
  },
  title: {
    paddingLeft: '1.5rem',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center'
  },
  options:{
    padding: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  buttonRefresh:{
    marginTop: '10%'
  },
  loadingComponent:{
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem 0'
  },
  item:{
    maxWidth: '100% !important',
    overflow: 'hidden',
    background: 'red'
  },
  workflowsGroup: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2rem 1rem',
    gap: '1.5rem',
    overflow: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '50px',
      background: theme.palette.grey[600],

    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
      height: '2px'
    }
  },

}));


type JobItemProps = {
  items: JobAnnotationProps[] | [],
  updateData: ()=> void
}

export const Cards = ({ items, updateData }: JobItemProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const { branch } = useContext(GitlabPipelinesContext);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      updateData()
      setLoading(false);
    }, 1500);
  }


  const TitleBar = (
    <>
      <Typography className={classes.title}>
        <GitlabIcon/>
        Gitlab Jobs
        </Typography>
    </>
  );

  const ActionsCard = (
    <Box className={classes.options}>
      <SelectBranch />

      <IconButton
        aria-label="Refresh"
        title="Refresh"
        onClick={() => refresh()}
        className={classes.buttonRefresh}
      >
        <CachedIcon />
      </IconButton>
    </Box>
  )


  return (
       <Card className={classes.wrapper}>
        <CardHeader
          title={TitleBar}
          action={ActionsCard}
        />
        <CardContent className={classes.workflowsGroup}>
          {loading ?
            (<Box className={classes.loadingComponent}> <CircularProgress />  </Box>) :
            ( 
              <>
                  { branch === "" ? (<Box className={classes.loadingComponent}><CircularProgress/></Box>):
                      items.map(item =>
                        (<JobItem
                          id={item.id}
                          key={item.id}
                          name={item.label}
                          variable={item.var}
                          status={item.status}
                        />)
                      )
                  }
                </>
            )
          }
        </CardContent>
      </Card>
  )
}

export const AllJobsComponent = () => {

  const { entity } = useEntity();
  const { jobsAnnotations } = useEntityAnnotations(entity as Entity);
  const { branch, setJobsByAnnotation, jobsByAnnotation } = useContext(GitlabPipelinesContext);

  const updateData = () => {
    if(jobsByAnnotation) setJobsByAnnotation(jobsByAnnotation);
    else setJobsByAnnotation(jobsAnnotations);
  }

  useEffect(() => {
    updateData()
  }, [branch]);

  const { loading, error } = useAsync(async (): Promise<void> => {
    updateData();
  }, []);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (!jobsAnnotations) {
    return (
      <MissingAnnotationEmptyState annotation={GITLAB_JOBS_ANNOTATION} />
    )
  }

  return (
      <ErrorBoundary>
        <Cards items={jobsByAnnotation || []} updateData={updateData}/>
      </ErrorBoundary>
  );
};