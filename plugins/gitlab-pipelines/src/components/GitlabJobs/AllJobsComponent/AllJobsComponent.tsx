import React from 'react';
import { ErrorBoundary, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Card, CardContent, CardHeader, CircularProgress, IconButton, Typography } from '@material-ui/core';
import useAsync from 'react-use/lib/useAsync';
import { MissingAnnotationEmptyState, useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../../SelectBranch';
import CachedIcon from '@material-ui/icons/Cached';
import { useEntityAnnotations } from '../../../hooks';
import { JobItem } from '../JobItem';
import GitlabIcon from '../../../assets/gitlabIcon';
import { useAllJobsComponentStyles } from './styles';
import { JobItemProps } from './types';
import { useGitlabPipelinesContext } from '../../../context';
import { GITLAB_JOBS_ANNOTATION } from '../../../utils/constants';


export const Cards : React.FC<JobItemProps> = (props) => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const classes = useAllJobsComponentStyles();
  const { branch } = useGitlabPipelinesContext();
  const { items, updateData } = props;

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
  const { branch, setJobsByAnnotation, jobsByAnnotation } = useGitlabPipelinesContext();

  const updateData = () => {
    if(jobsByAnnotation) setJobsByAnnotation(jobsByAnnotation);
    else setJobsByAnnotation(jobsAnnotations);
  }

  React.useEffect(() => {
    updateData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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