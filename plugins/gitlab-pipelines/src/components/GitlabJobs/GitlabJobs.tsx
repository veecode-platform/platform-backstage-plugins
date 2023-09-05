import React, { useContext, useEffect, useState } from 'react';
import { EmptyState, ErrorBoundary, MissingAnnotationEmptyState,
   Progress, ResponseErrorPanel 
  } from '@backstage/core-components';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, IconButton, Paper, Typography, makeStyles } from '@material-ui/core';
import useAsync from 'react-use/lib/useAsync';
// import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../SelectBranch';
import CachedIcon from '@material-ui/icons/Cached';
import { GitlabPipelinesContext } from '../context/GitlabPipelinesContext';
import { Job } from '../../utils/types';
import { GITLAB_ANNOTATION, isGitlabAvailable, useEntityAnnotations } from '../../hooks';
import { entityMock } from '../../mocks/component';
import { JobItem } from './JobItem';
import GitlabIcon from '../assets/gitlabIcon';

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
  options: {
    padding: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  buttonRefresh: {
    marginTop: '10%'
  },
  loadingComponent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem 0'
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
  items: Job[] | []
}

export const Cards = ({ items }: JobItemProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  // const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entityMock as Entity);
  const { allJobs, setJobsListState, latestPipelineState } = useContext(GitlabPipelinesContext);

  const updateData = async () => {
    setLoading(true)
    const data = await allJobs(projectName, latestPipelineState?.id!);
    setJobsListState(data as Job[]);
    setTimeout(() => setLoading(false), 1500);
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
        onClick={() => updateData()}
        className={classes.buttonRefresh}
      >
        <CachedIcon />
      </IconButton>
    </Box>
  )


  return (
    <Paper>
      <Card>
        <CardHeader
          title={TitleBar}
          action={ActionsCard}
        />
        <CardContent className={classes.workflowsGroup}>
          {loading ?
            (<Box className={classes.loadingComponent}> <CircularProgress />  </Box>) :
            (
              <>
                {items.map(item =>
                  <JobItem
                    id={item.id!}
                    key={item.id}
                    status={item.status}
                    name={item.name}
                  />
                )
                }
              </>
            )
          }
        </CardContent>
      </Card>
    </Paper>
  )
}

export const GitlabJobs = () => {

  // const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entityMock as Entity)
  const { branch, allJobs, latestPipeline, setJobsListState, jobsListState } = useContext(GitlabPipelinesContext);

  useEffect(() => {
    updateData()
  }, [branch])

  const updateData = async () => {
    const pipelineData = await latestPipeline(projectName);
    const data = await allJobs(projectName, pipelineData?.id!);
    setJobsListState(data as Job[])
  }

  const { loading, error } = useAsync(async (): Promise<void> => {
    updateData();
  }, []);

  if (loading) {
    return <Progress />;
  }

  if(!error && !jobsListState) {
    return (
      <>
      { loading ? (<Progress />):(<EmptyState
      missing="data"
      title="No Pipeline Data"
      description="This component has Gittab.ci enabled, but no data was found. Have you created any Pipeline? Click the button below to create a new pipeline in CI-CD Tab."
      action={
        <Button
          variant="contained"
          color="primary"
          href={`https://gitlab.com/${projectName}`}
        >
          Visit your repository
        </Button>
      }
    />)}
    </>
    )
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (!isGitlabAvailable(entityMock)) {
    return (
      <MissingAnnotationEmptyState annotation={GITLAB_ANNOTATION} />
    )
  }

  return (
    <ErrorBoundary>
      <Cards items={jobsListState || []} />
    </ErrorBoundary>
  );
};